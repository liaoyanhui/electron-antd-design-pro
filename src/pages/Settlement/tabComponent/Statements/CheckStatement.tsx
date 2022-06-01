/*
 * @Description: 查看结算单
 * @Author: 尚夏
 * @Date: 2021-08-27 14:55:13
 * @LastEditTime: 2021-09-10 15:21:15
 * @FilePath: /mining-admin-desktop/src/pages/Settlement/tabComponent/Statements/CheckStatement.tsx
 */

import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { useModel } from 'umi';
import ProTable from '@ant-design/pro-table';
import { transformFIL, convertUTCTimeToLocalTime } from '@/utils/utils';
import styles from './index.less';
import ReactToPrint from 'react-to-print';

const CheckStatement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 单个结算单数据
  const { statement, setStatement } = useModel('useStatement');

  const printRef = useRef<any>(null);
  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '用户',
      dataIndex: 'customerName',
      align: 'center',
      width: '14%',
    },
    {
      title: '算力',
      search: false,
      dataIndex: 'storage',
      align: 'center',
      width: '14%',
    },
    {
      title: '昨日收益',
      align: 'center',
      children: [
        {
          title: '立即释放',
          // dataIndex: 'vestingUnlockAmount',
          key: 'unlock',
          align: 'center',
          width: '14%',
          renderText: (text) => {
            const number =
              Number(transformFIL(text.settledAmount)) -
              Number(transformFIL(text.vestingUnlockAmount));
            return number;
          },
        },
        {
          title: '锁仓',
          dataIndex: 'vestingAmount',
          key: 'lock',
          align: 'center',
          width: '14%',
          renderText: (text) => {
            return transformFIL(text);
          },
        },
      ],
    },
    {
      title: '历史释放',
      search: false,
      dataIndex: 'vestingUnlockAmount',
      align: 'center',
      width: '14%',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '服务费',
      search: false,
      dataIndex: 'serviceFeeAmount',
      align: 'center',
      width: '14%',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '本次结算',
      search: false,
      dataIndex: 'settledAmount',
      align: 'center',
      width: '14%',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
  ];

  return (
    <PageContainer
      header={{
        breadcrumbRender: (params) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      <ReactToPrint
        trigger={() => <a href="#">Print this out!</a>}
        content={() => printRef.current}
      />
      <div className={styles.checkStatement} ref={printRef}>
        <h1>结算单</h1>
        <div className={styles.total_box}>
          <div className={styles.total_title}>
            <span>{statement && statement?.settlementNo}</span>
            <span>日期 {convertUTCTimeToLocalTime(statement.confirmedAt)}</span>
          </div>
          <div className={styles.total_line}></div>
          <ProTable<Banner.FormProps, Global.PageParams>
            columns={columns}
            actionRef={actionRef}
            headerTitle={null}
            request={async (params = {}, sort, filter) => {
              return Promise.resolve({
                data: statement.customers || [],
              });
            }}
            options={false}
            rowKey="customerName"
            search={false}
            pagination={false}
            dateFormatter="number"
            tableClassName={styles.table_class}
          />
        </div>
        <ul className={styles.data_amount}>
          <li>{statement.customers?.length || 0}</li>
          <li>{statement.storage}</li>
          <li>
            {transformFIL(
              `${
                transformFIL(statement.settledAmount) - transformFIL(statement.vestingUnlockAmount)
              }`,
            )}
          </li>
          <li>{transformFIL(statement.vestingAmount)}</li>
          <li>{transformFIL(statement.vestingUnlockAmount)}</li>
          <li>{transformFIL(statement.serviceFeeAmount)}</li>
          <li>{transformFIL(statement.settledAmount)}</li>
        </ul>
        <div className={styles.statement_bottom}>
          <div className={styles.bold_line}></div>
          <div className={styles.small_line}></div>
          <div className={styles.total_total}>
            <span className={styles.bottom_title}>总计</span>
            <span>{transformFIL(statement.settledAmount)}</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CheckStatement;
