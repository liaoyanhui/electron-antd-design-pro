/*
 * @Description: 结算单
 * @Author: 尚夏
 * @Date: 2021-08-27 11:35:49
 * @LastEditTime: 2021-09-02 14:44:29
 * @FilePath: /mining-admin-desktop/src/pages/Settlement/tabComponent/Statements/index.tsx
 */

import React, { useRef, useState } from 'react';
import { history, useModel } from 'umi';
import { transformFIL } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FilecoinService } from '@/services';

const Statements: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { statement, setStatement } = useModel('useStatement');

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '结算单',
      dataIndex: 'settlementNo',
      // render: (_) => <a>{_}</a>,
    },
    {
      title: '用户数',
      search: false,
      dataIndex: 'customers',
      renderText: (text) => {
        return text.length;
      },
    },
    // {
    //   title: '商品数',
    //   search: false,
    //   dataIndex: 'amount',
    // },
    {
      title: '锁仓(FIL)',
      search: false,
      dataIndex: 'vestingAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '本次结算(FIL)',
      search: false,
      dataIndex: 'settledAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '时间',
      search: false,
      dataIndex: 'confirmedAt',
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'state',
      valueEnum: {
        created: {
          text: '未生效',
        },
        confirmed: {
          text: '已发放',
        },
        discarded: {
          text: '已废弃',
        },
      },
    },
    {
      title: '操作',
      width: 164,
      key: 'option',
      valueType: 'option',
      renderText: (text) => {
        return (
          <>
            <a
              key="check"
              onClick={() => {
                setStatement(text);
                history.push('/settlement/checkStatement');
              }}
            >
              查看
            </a>
          </>
        );
      },
    },
  ];

  return (
    <>
      <ProTable<Banner.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        headerTitle={null}
        // rowSelection={{}}
        request={async (params = {}, sort, filter) => {
          return FilecoinService.getFilecoinSettlementList({
            filterBy: 'state',
            filter: 'confirmed',
          }).then((res: any) => {
            return {
              data: res || [],
            };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="settlementNo"
        // search={{
        //   labelWidth: 'auto',
        // }}
        search={false}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="number"
      />
    </>
  );
};

export default Statements;
