/*
 * @Description: 收益记录
 * @Author: 尚夏
 * @Date: 2021-08-02 14:27:05
 * @LastEditTime: 2021-08-31 17:07:29
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserTable/EarningsRecord.tsx
 */
import React, { useRef } from 'react';
import styles from './index.less';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import { FilecoinService } from '@/services';

const EarningsRecord: React.FC<{
  userId: any;
}> = (props) => {
  const { userId } = props;
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '结算单号',
      search: false,
      dataIndex: 'orderNo',
    },
    {
      title: '业务',
      search: false,
      dataIndex: 'customerRemarksName',
    },
    {
      title: '数量(FIL)',
      search: false,
      dataIndex: 'customerId',
    },
    {
      title: '扣除',
      search: false,
      dataIndex: 'productName',
    },
    {
      title: '发放日期',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '已发放(天)',
      search: false,
      dataIndex: 'pledge',
    },
    {
      title: '发放前余额(FIL)',
      search: false,
      dataIndex: 'expend',
    },
    {
      title: '补贴费用(FIL)',
      search: false,
      dataIndex: 'subsidy',
    },
    {
      title: '操作',
      width: '164px',
      key: 'option',
      valueType: 'option',
      renderText: (text) => [
        <a
          key="check"
          onClick={() => {
            // history.push('/order/checkOrder')
          }}
        >
          查看
        </a>,
      ],
    },
  ];

  const headerTitle = () => {
    return (
      <>
        <ul className={styles.header_title}>
          <li>
            <span>总收益(FIL)</span>
            <span className={styles.table_field}>19382</span>
          </li>
          <li>
            <span>累计锁仓收益(FIL)</span>
            <span className={styles.table_field}>11770</span>
          </li>
          <li>
            <span>累计解锁收益(FIL)</span>
            <span className={styles.table_field}>11770</span>
          </li>
          <li>
            <span>扣除费用(FIL)</span>
            <span className={styles.table_field}>0</span>
          </li>
          <li>
            <span>补贴费用(FIL)</span>
            <span className={styles.table_field}>0</span>
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
          // return FilecoinService.getFilecoinSettlementOrderList({
          //   filterBy: 'customer',
          //   filter: userId,
          // });
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
        toolBarRender={() => [
          // <Button
          //   key="button"
          //   icon={<PlusOutlined />}
          //   type="primary"
          //   onClick={() => history.push('/order/createOrder')}
          // >
          //   创建订单
          // </Button>
        ]}
      />
    </>
  );
};

export default EarningsRecord;
