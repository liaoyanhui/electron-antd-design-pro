/*
 * @Description:充值
 * @Author: 尚夏
 * @Date: 2021-08-02 15:35:41
 * @LastEditTime: 2021-08-02 15:49:02
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserTable/Recharge.tsx
 */

import React, { useRef, useState } from 'react';
import { history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, Tooltip } from 'antd';
import styles from '../index.less';
import { formatAddress } from '@/utils/utils';

const Recharge: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '流水号',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '充值地址',
      search: false,
      dataIndex: 'rechargeAddress',
    },
    {
      title: '到账地址',
      search: false,
      dataIndex: 'intoAddress',
    },
    {
      title: '数量(FIL)',
      search: false,
      dataIndex: 'number',
    },
    {
      title: '时间',
      search: false,
      dataIndex: 'time',
      valueType: 'dateTime',
    },
    {
      title: 'MassageID',
      search: false,
      dataIndex: 'MassageID',
      // width: 160,
      renderText: (text) => {
        return (
          <Tooltip title={text}>
            <span className={styles.tool_color}>{formatAddress(text)}</span>
          </Tooltip>
        );
      },
    },
  ];

  const headerTitle = () => {
    return (
      <>
        <ul className={styles.header_title}>
          <li>
            <span>累计充值FIL)</span>
            <span className={styles.table_field}>19382</span>
          </li>
        </ul>
      </>
    );
  };

  return (
    <>
      <ProTable<Banner.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        headerTitle={headerTitle()}
        request={async (params = {}, sort, filter) => {
          // console.log(params, 'parmas');
          return Promise.resolve({
            data: [
              {
                id: 1,
                user: '国庆大抽奖',
                UID: '123456',
                placeTime: '',
                agency: '商务',
                intoAddress: 'mmnsjjljsslncndjjddddssdasdf',
                rechargeAddress: 'mmnsjjljsslncndjjddddssdasdf',
                MassageID: '82838jdnjxjsjsk2wi23jksxmjjiangkxlljsgbxcc',
                status: '0',
              },
            ],
            success: true,
            total: 11,
          });
        }}
        options={{
          density: false,
        }}
        rowKey="id"
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

export default Recharge;
