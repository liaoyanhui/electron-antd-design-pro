/*
 * @Description: 待质押
 * @Author: 尚夏
 * @Date: 2021-07-27 11:11:30
 * @LastEditTime: 2021-10-12 14:12:39
 * @FilePath: /mining-admin-desktop/src/pages/Order/OrderComponents/StayPledge.tsx
 */

import React, { useRef, useState } from 'react';
import { history } from 'umi';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { message, Tooltip } from 'antd';
import { OrderService } from '@/services';
import PledgeModal from '../components/PledgeModal';
import ModalInfo from '@/components/ModalInfo';
import SetPledgeModal from '../components/SetPledgeModal';
import { formatAddress, transformFIL } from '@/utils/utils';

const StayPledge: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [activeOrder, setActiveOrder] = useState<any>({});
  const [visible, setVisible] = useState<boolean>(false);

  // 获取订单封装成本 estimatePledgeAmount estimateGasAmount
  const [estimate, setEstimate] = useState<any>({});

  // 弹窗关闭后执行方法
  const afterClose = () => {
    setActiveOrder({});
    setEstimate({});
  };

  // 取消订单
  const handleCancelorder = (id: number) => {
    ModalInfo({
      title: '取消订单',
      handleOk: () => {
        OrderService.cancelOrder({
          id,
        }).then((res: any) => {
          if (res) {
            message.success('操作成功');
            actionRef.current?.reload();
          }
        });
      },
    });
  };

  const getSealCostForOrder = (id: string) => {
    OrderService.getSealCostForOrder({
      orderId: id,
    }).then((res: any) => {
      setActiveOrder(res);
      setVisible(true);
    });
  };

  const getSealCost = (data: any) => {
    setEstimate({
      estimatePledgeAmount: data.estimatePledgeAmount || '',
      estimateGasAmount: data.estimateGasAmount || '',
    });
    getSealCostForOrder(data.Id);
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
    //   title: '需质押(FIL)',
    //   search: false,
    //   dataIndex: 'estimatePledgeAmount',
    //   renderText: (text) => {
    //     return transformFIL(text);
    //   },
    // },
    // {
    //   title: '需封装gas(FIL)',
    //   search: false,
    //   dataIndex: 'estimateGasAmount',
    //   renderText: (text) => {
    //     return transformFIL(text);
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
        <a
          key="gathering"
          onClick={() => {
            getSealCost(text);
          }}
        >
          质押
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
          return OrderService.getOrderList({
            filterBy: 'orderState',
            filter: 'waitingForPledge',
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
        <PledgeModal
          activeOrder={activeOrder}
          visible={visible}
          setVisible={setVisible}
          afterClose={afterClose}
          tableRef={actionRef}
          estimate={estimate}
          getSealCostForOrder={getSealCostForOrder}
        />
      )}
      {pledgeVisible && (
        <SetPledgeModal
          visible={pledgeVisible}
          onOk={onOk}
          onCancel={onCancel}
          estimate={estimate}
          orderId={activeId}
        />
      )}
    </>
  );
};

export default StayPledge;
