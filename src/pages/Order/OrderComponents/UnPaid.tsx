/*
 * @Description: 待支付
 * @Author: 尚夏
 * @Date: 2021-07-20 13:39:40
 * @LastEditTime: 2022-02-17 14:51:44
 * @FilePath: /mining-admin-desktop/src/pages/Order/OrderComponents/UnPaid.tsx
 */
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { message, Tooltip } from 'antd';
import { OrderService, PaymentService } from '@/services';
import GatheringModal from '../components/GatheringModal';
import { fenToCny, formatAddress, transformFIL } from '@/utils/utils';
import ModalInfo from '@/components/ModalInfo';
import SetPledgeModal from '../components/SetPledgeModal';

const UnPaid: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);

  // 当前选择的订单对象数据详情
  const [activeOrder, setActiveOrder] = useState<any>();

  // 弹窗关闭后执行方法
  const afterClose = () => {
    setActiveOrder({});
  };

  // 取消订单 消单
  const handleCancelorder = (id: number) => {
    ModalInfo({
      title: '取消订单',
      handleOk: () => {
        OrderService.cancelOrder({
          id,
        }).then((res) => {
          if (res) {
            message.success('操作成功');
            actionRef.current?.reload();
          }
        });
      },
    });
  };

  // 应质押订单Id
  const [activeId, setActiveId] = useState<any>(null);
  const [pledgeVisible, setPledgeVisible] = useState<boolean>(false);

  // 取消
  const onCancel = () => {
    setPledgeVisible(false);
    setActiveId(null);
  };

  // 确定
  const onOk = () => {
    onCancel();
    actionRef.current?.reload();
  };

  // 设置应质押 包括gas消耗
  const handleSetPledge = (Id: number) => {
    setActiveId(Id);
    setPledgeVisible(true);
  };

  const [estimate, setEstimate] = useState<any>({});

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
    // {
    //   title: '开挖方式',
    //   search: false,
    //   dataIndex: 'way'
    // },
    // {
    //   title: '单价(¥)',
    //   search: false,
    //   dataIndex: 'price'
    // },
    {
      title: '数量',
      search: false,
      dataIndex: 'qty',
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
    //   title: '转账人',
    //   search: false,
    //   dataIndex: 'transferName'
    // },
    // {
    //   title: '应收(¥)',
    //   search: false,
    //   renderText: (text) => {
    //     return fenToCny(text.price * text.qty);
    //   },
    // },
    {
      title: '应质押(FIL)',
      search: false,
      dataIndex: 'pledgeAmount',
      renderText: (text) => {
        if (text) {
          return transformFIL(text);
        }
        return '-';
      },
    },
    {
      title: '应封装gas(FIL)',
      search: false,
      dataIndex: 'gasAmount',
      renderText: (text) => {
        if (text) {
          return transformFIL(text);
        }
        return '-';
      },
    },
    {
      title: '应收(¥)',
      search: false,
      renderText: (text) => {
        return fenToCny(text.paidAmount);
      },
    },

    {
      title: '下单时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      // sorter: true,
    },
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
        <a
          key="gathering"
          onClick={() => {
            setActiveOrder(text);
            setVisible(true);
          }}
        >
          收款
        </a>,
        <a key="clean" onClick={() => handleCancelorder(text.Id)}>
          消单
        </a>,
        <a
          key="set"
          onClick={() => {
            setEstimate({
              estimatePledgeAmount: text.estimatePledgeAmount || '',
              estimateGasAmount: text.estimateGasAmount || '',
            });
            handleSetPledge(text.Id);
          }}
        >
          设置应质押
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
          // console.log(params, sort, filter);
          return OrderService.getOrderList({
            filterBy: 'orderState',
            filter: 'pending',
          }).then((res: any) => {
            return {
              data: res || [],
            };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="orderNo"
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
      {visible && (
        <GatheringModal
          activeOrder={activeOrder}
          visible={visible}
          setVisible={setVisible}
          afterClose={afterClose}
          tableRef={actionRef}
        />
      )}
      {pledgeVisible && (
        <SetPledgeModal
          visible={pledgeVisible}
          onOk={onOk}
          estimate={estimate}
          onCancel={onCancel}
          orderId={activeId}
        />
      )}
    </>
  );
};

export default UnPaid;
