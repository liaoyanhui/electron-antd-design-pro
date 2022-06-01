/*
 * @Description: 待封装
 * @Author: 尚夏
 * @Date: 2021-07-27 11:16:16
 * @LastEditTime: 2021-10-11 10:56:17
 * @FilePath: /mining-admin-desktop/src/pages/Order/OrderComponents/StayPackage.tsx
 */
import React, { useRef } from 'react';
import { history } from 'umi';
import { Modal, message, Tooltip } from 'antd';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from '../index.less';
import { OrderService } from '@/services';
import ModalInfo from '@/components/ModalInfo';
import { formatAddress } from '@/utils/utils';

const StayPackage: React.FC<{}> = (props) => {
  const actionRef = useRef<ActionType>();

  const warning = (text: any) => {
    Modal.warning({
      title: '确认开始封装？',
      icon: <ExclamationCircleOutlined />,
      className: styles.modal,
      closable: true,
      centered: true,
      // content: '封装完成，立刻开挖！',
      okText: '开始封装',
      onOk: (close) => {
        OrderService.startOrderSealing({
          id: text.Id,
        }).then((res: any) => {
          if (res) {
            message.success('操作成功');
            actionRef.current?.reload();
            close();
          }
        });
      },
    });
  };

  // 取消订单
  const handleCancelorder = (id: number) => {
    ModalInfo({
      title: '取消订单',
      handleOk: () => {
        OrderService.cancelOrder({
          id,
        }).then(() => {
          message.success('操作成功');
          actionRef.current?.reload();
        });
      },
    });
  };

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
    //   title: '开挖方式',
    //   search: false,
    //   dataIndex: 'way'
    // },
    // {
    //   title: '已质押(FIL)',
    //   search: false,
    //   dataIndex: 'pledge',
    // },
    // {
    //   title: '账户余额(FIL)',
    //   search: false,
    //   dataIndex: 'balance'
    // },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      renderText: (text) => [
        <a
          key="check"
          onClick={() => {
            history.push(`/order/checkOrder?Id=${text.Id}`);
          }}
        >
          查看
        </a>,
        <a key="gathering" onClick={() => warning(text)}>
          封装
        </a>,
        <a key="clean" onClick={() => handleCancelorder(text.Id)}>
          消单
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
          return OrderService.getOrderList({
            filterBy: 'orderState',
            filter: 'waitingForSeal',
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

export default StayPackage;
