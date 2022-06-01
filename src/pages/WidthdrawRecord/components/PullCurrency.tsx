/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-11-05 14:22:22
 * @LastEditTime: 2021-11-09 15:30:31
 * @FilePath: /mining-admin-desktop/src/pages/WidthdrawRecord/components/PullCurrency.tsx
 */

import React, { useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Tooltip } from 'antd';
import styles from '../index.less';
import { formatAddress, transformFIL, dropThirdBrowser } from '@/utils/utils';
import { WithdrawRecord } from '@/services';

const PullCurrency: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '流水号',
      dataIndex: 'withdrawNo',
      // render: (_) => <a>{_}</a>,
    },
    {
      title: '平台',
      dataIndex: 'platformName',
    },
    // {
    //   title: '商务',
    //   search: false,
    //   dataIndex: 'agency',
    // },
    {
      title: '收币地址',
      search: false,
      // width: 200,
      dataIndex: 'toAddress',
      renderText: (text) => {
        return (
          <Tooltip title={text}>
            <span>{formatAddress(text)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '数量(FIL)',
      search: false,
      dataIndex: 'amount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    // {
    //   title: '手续费(FIL)',
    //   search: false,
    //   dataIndex: 'serviceCharge',
    // },
    {
      title: '发起时间',
      search: false,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },

    {
      title: 'MassageID',
      search: false,
      dataIndex: 'messageId',
      // width: 160,
      renderText: (text) => {
        return (
          <Tooltip title={text}>
            <span className={styles.tool_color} onClick={() => dropThirdBrowser(text)}>
              {formatAddress(text)}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: '备注',
      search: false,
      dataIndex: 'internalComment',
      renderText: (text) => {
        return (
          <Tooltip title={text}>
            <span>{formatAddress(text)}</span>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      <ProTable<Banner.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          // console.log(params, 'parmas');
          return WithdrawRecord.getFilecoinWithdrawList({
            state: 'processing',
            // filter: 'pending',
          }).then((res: any) => {
            return {
              data: res,
            };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="withdrawNo"
        // search={{
        //   labelWidth: 'auto',
        // }}
        search={false}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="number"
        // headerTitle="高级表格"
        toolBarRender={() => []}
      />
    </>
  );
};

export default PullCurrency;
