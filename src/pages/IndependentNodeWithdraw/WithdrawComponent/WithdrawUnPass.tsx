/*
 * @Description: 未通过
 * @Author: 尚夏
 * @Date: 2021-08-31 20:23:11
 * @LastEditTime: 2022-01-07 14:19:11
 * @FilePath: /mining-admin-desktop/src/pages/IndependentNodeWithdraw/WithdrawComponent/WithdrawUnPass.tsx
 */

import React, { useRef, useState } from 'react';
import { history } from 'umi';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Tooltip } from 'antd';
import styles from '../index.less';
import { formatAddress, dropThirdBrowser, transformFIL } from '@/utils/utils';
import { OwnerService } from '@/services';

const { shell } = window.require('electron');

const WithdrawUnPass: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '流水号',
      dataIndex: 'withdrawNo',
    },
    {
      title: '节点号',
      dataIndex: 'nodeNo',
    },
    {
      title: '用户',
      dataIndex: 'mobile',
    },
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
      title: '拒绝时间',
      search: false,
      dataIndex: 'refusedAt',
      valueType: 'dateTime',
    },
    // {
    //   title: 'MassageID',
    //   search: false,
    //   dataIndex: 'messageId',
    //   // width: 160,
    //   renderText: (text) => {
    //     return (
    //       <Tooltip title={text}>
    //         <span className={styles.tool_color} onClick={() => dropThirdBrowser(text)}>
    //           {formatAddress(text)}
    //         </span>
    //       </Tooltip>
    //     );
    //   },
    // },
    {
      title: '备注',
      search: false,
      dataIndex: 'refuseComment',
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
          return OwnerService.customerNodeWithdrawList({
            filterBy: 'state',
            filter: 'refused',
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

export default WithdrawUnPass;
