/*
 * @Description: 已结束
 * @Author: 尚夏
 * @Date: 2021-07-27 11:18:52
 * @LastEditTime: 2022-01-13 10:18:55
 * @FilePath: /mining-admin-desktop/src/pages/Order/OrderComponents/Ended.tsx
 */
import React, { useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { OrderService } from '@/services';
import { Tooltip } from 'antd';
import { formatAddress } from '@/utils/utils';

const Ended: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      renderText: (text) => {
        return (
          <Tooltip title={text}>
            <span>{formatAddress(text)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '用户',
      dataIndex: 'customerRemarksName',
    },
    // {
    //   title: '商务',
    //   search: false,
    //   dataIndex: 'agency'
    // },
    {
      title: '商品',
      search: false,
      dataIndex: 'productName',
    },
    {
      title: '技术服务费',
      search: false,
      dataIndex: 'serviceFeePercent',
      renderText: (text) => {
        return `${text / 10}%`;
      },
    },
    // {
    //   title: '合约周期(天)',
    //   search: false,
    //   dataIndex: 'cycle'
    // },
    // {
    //   title: '已质押(FIL)',
    //   search: false,
    //   dataIndex: 'pledge',
    // },
    // {
    //   title: '封装消耗Gas(FIL)',
    //   search: false,
    //   dataIndex: 'expend',
    // },
    {
      title: '下单时间',
      // search: false,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    // {
    //   title: '开始收益时间',
    //   search: false,
    //   dataIndex: 'startTime'
    // },
    {
      title: '已运行(天)',
      search: false,
      dataIndex: 'operationDay',
    },
    {
      title: '累计收益(FIL)',
      search: false,
      dataIndex: 'earnings',
    },
  ];

  return (
    <>
      <ProTable<Banner.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          // console.log(params, 'parmas');
          return OrderService.getOrderList({
            filterBy: 'orderState',
            filter: 'finished',
          }).then((res: any) => {
            return {
              data: res || [],
            };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="Id"
        // search={{
        //   labelWidth: 'auto',
        // }}
        search={false}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="number"
        // headerTitle="高级表格"
        toolBarRender={() => [
          // <Button
          //   key="button"
          //   icon={<PlusOutlined />}
          //   type="primary"
          //   onClick={() => history.push('/order/createOrder')}
          // >
          //   创建订单
          // </Button>,
        ]}
      />
    </>
  );
};

export default Ended;
