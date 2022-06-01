/*
 * @Description: 质押明细
 * @Author: 尚夏
 * @Date: 2021-08-02 15:22:16
 * @LastEditTime: 2021-08-02 15:23:19
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserTable/PledgeDetail.tsx
 */
import React, { useRef, useState, useEffect } from 'react';
import { history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import styles from './index.less';

const PledgeDetail: React.FC<{
  // defaultData: any;
}> = (props) => {
  // const { defaultData } = props;
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '日期',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '业务',
      search: false,
      dataIndex: 'customerId',
    },
    {
      title: '订单',
      search: false,
      dataIndex: 'customerId',
    },
    {
      title: '数量(FIL)',
      search: false,
      dataIndex: 'customerId',
    },
  ];

  const headerTitle = () => {
    return (
      <>
        <ul className={styles.header_title}>
          <li>
            <span>累计质押FIL)</span>
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
        request={async (params = {}, sort, filter) => {
          // console.log(params, 'parmas');
          return Promise.resolve({
            data: [{ orderNo: '123' }],
            // total: defaultData.length,
          });
        }}
        options={{
          density: false,
        }}
        rowKey="orderNo"
        headerTitle={headerTitle()}
        search={{
          labelWidth: 'auto',
        }}
        // search={false}
        pagination={false}
        // pagination={{
        //   pageSize: 10,
        // }}
        dateFormatter="number"
        toolBarRender={() => []}
      />
    </>
  );
};

export default PledgeDetail;
