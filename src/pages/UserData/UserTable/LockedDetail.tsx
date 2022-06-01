/*
 * @Description: 锁仓明细
 * @Author: 尚夏
 * @Date: 2021-08-02 15:18:47
 * @LastEditTime: 2021-08-13 15:02:24
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserTable/LockedDetail.tsx
 */

import React, { useRef } from 'react';
import styles from './index.less';
import ProTable from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';

const LockedDetail: React.FC<{
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
      title: '数量(FIL)',
      search: false,
      dataIndex: 'customerId',
    },
    {
      title: '已释放',
      search: false,
      dataIndex: 'customerId',
    },
  ];

  const headerTitle = () => {
    return (
      <>
        <ul className={styles.header_title}>
          <li>
            <span>累计锁仓(FIL)</span>
            <span className={styles.table_field}>19382</span>
          </li>
          <li>
            <span>累计已解锁(FIL)</span>
            <span className={styles.table_field}>11770</span>
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
        // search={{
        //   labelWidth: 'auto',
        // }}
        search={false}
        // pagination={false}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="number"
        toolBarRender={() => []}
      />
    </>
  );
};

export default LockedDetail;
