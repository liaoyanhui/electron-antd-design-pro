/*
 * @Description: 扣补记录
 * @Author: 尚夏
 * @Date: 2022-02-16 15:50:13
 * @LastEditTime: 2022-02-17 14:42:46
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserTable/ExpensesRecord.tsx
 */

import React, { useRef } from 'react';
import { history } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { OwnerService } from '@/services';
import { transformFIL } from '@/utils/utils';

const ExpensesRecord: React.FC<{
  userId: any;
  mobile: any;
}> = (props) => {
  const { mobile } = props;
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '流水号',
      search: false,
      dataIndex: 'expensesNo',
    },
    {
      title: '类型',
      search: false,
      dataIndex: 'expensesType',
      valueEnum: {
        deduct: {
          text: '扣费',
        },
        subsidy: {
          text: '补贴',
        },
      },
    },
    {
      title: '数量(FIL)',
      search: false,
      dataIndex: 'expensesAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '时间',
      search: false,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '原因',
      search: false,
      dataIndex: 'reason',
    },
    {
      title: '备注',
      search: false,
      dataIndex: 'comment',
    },
    {
      title: '状态',
      search: false,
      dataIndex: 'state',
      valueEnum: {
        deducted: {
          text: '已扣除',
        },
        subsidied: {
          text: '已补贴',
        },
      },
    },
  ];

  return (
    <>
      <ProTable<Banner.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return OwnerService.getCustomerExpensesList({
            filterBy: 'mobile',
            filter: mobile,
          }).then((res: any) => {
            return { data: res };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="expensesNo"
        // headerTitle={headerTitle()}
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

export default ExpensesRecord;
