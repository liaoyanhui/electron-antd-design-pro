/*
 * @Description: 已取消
 * @Author: 尚夏
 * @Date: 2021-07-27 11:18:42
 * @LastEditTime: 2022-01-13 10:18:39
 * @FilePath: /mining-admin-desktop/src/pages/Order/OrderComponents/Canceled.tsx
 */

import React, { useRef } from 'react';
import { history } from 'umi';
import type { ActionType } from '@ant-design/pro-table';
import { Tooltip } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { OrderService } from '@/services';
import { formatAddress, fenToCny } from '@/utils/utils';

const Canceled: React.FC = () => {
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
    {
      title: '下单时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    // {
    //   title: '应收(¥)',
    //   search: false,
    //   dataIndex: 'totalAmount',
    // },
    {
      title: '应收(¥)',
      search: false,
      dataIndex: 'paidAmount',
      renderText: (text) => {
        return fenToCny(text);
      },
    },
    // {
    //   title: '需质押(FIL)',
    //   search: false,
    //   dataIndex: 'pledge',
    // },
    // {
    //   title: '已质押(FIL)',
    //   search: false,
    //   dataIndex: 'pledged',
    // },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      renderText: (text: any) => [
        <a
          key="check"
          onClick={() => {
            history.push(`/order/checkOrder?Id=${text.Id}`);
          }}
        >
          查看
        </a>,
      ],
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
            filter: 'canceled',
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

export default Canceled;
