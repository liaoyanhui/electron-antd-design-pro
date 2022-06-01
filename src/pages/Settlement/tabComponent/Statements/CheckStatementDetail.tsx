/*
 * @Description: 结算单详情
 * @Author: 尚夏
 * @Date: 2021-09-10 13:45:58
 * @LastEditTime: 2021-09-10 15:38:27
 * @FilePath: /mining-admin-desktop/src/pages/Settlement/tabComponent/Statements/CheckStatementDetail.tsx
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

const CheckStatementDetail: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 单个结算单数据
  const { statement, setStatement } = useModel('useStatement');

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
      <div className={styles.checkStatement}>
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
            // search={{
            //   labelWidth: 'auto',
            // }}
            search={false}
            pagination={false}
            dateFormatter="number"
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

export default CheckStatementDetail;
