/*
 * @Description: 挖矿中
 * @Author: 尚夏
 * @Date: 2021-07-27 11:18:11
 * @LastEditTime: 2022-05-27 11:13:55
 * @FilePath: /mining-admin-desktop/src/pages/Order/OrderComponents/Mining.tsx
 */
import React, { useRef, useState } from 'react';
import { history } from 'umi';
// import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Tooltip, message } from 'antd';
import styles from '../index.less';
import { OrderService } from '@/services';
// import ModalInfo from '@/components/ModalInfo';
import GatheringModal from '../components/GatheringModal';
import PledgeModal from '../components/PledgeModal';
import { formatAddress } from '@/utils/utils';
import BlockUpOrderModal from '../components/BlockUpOrderModal';

const Mining: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);

  // 当前选择的订单对象数据详情
  const [activeOrder, setActiveOrder] = useState<any>();

  // 操作用户
  const [order, setOrder] = useState<any>({});

  const [blockUpOrderVisible, setBlockUpOrderVisible] = useState<boolean>(false);

  const handleCancelBlockOrder = () => {
    setBlockUpOrderVisible(false);
    setOrder({});
  };
  const handleOkBlockOrder = (id: number, days: number) => {
    OrderService.stopOrder({
      data: {
        orderId: id,
        fewDays: days,
      },
    }).then((res) => {
      if (res) {
        message.success('操作成功!');
        handleCancelBlockOrder();
        actionRef.current?.reload();
      }
    });
  };

  // 弹窗关闭后执行方法
  const afterClose = () => {
    setActiveOrder({});
  };

  // 质押
  const [pledgeVisible, setPledgeVisible] = useState<boolean>(false);

  // 获取订单封装成本 estimatePledgeAmount estimateGasAmount
  const [estimate, setEstimate] = useState<any>({});

  const getSealCostForOrder = (id: string) => {
    OrderService.getSealCostForOrder({
      orderId: id,
    }).then((res: any) => {
      setActiveOrder(res);
      setPledgeVisible(true);
    });
  };

  const getSealCost = (data: any) => {
    setEstimate({
      estimatePledgeAmount: data.estimatePledgeAmount || '',
      estimateGasAmount: data.estimateGasAmount || '',
    });
    getSealCostForOrder(data.Id);
  };

  // 取消订单
  // const handleCancelorder = (id: number) => {
  //   ModalInfo({
  //     title: '取消订单',
  //     handleOk: () => {
  //       OrderService.cancelOrder({
  //         id,
  //       }).then(() => {
  //         message.success('操作成功');
  //         actionRef.current?.reload();
  //       });
  //     },
  //   });
  // };

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
    {
      title: '开始收益时间',
      search: false,
      dataIndex: 'startTime',
    },
    {
      title: '已运行(天)',
      search: false,
      dataIndex: 'runningDays',
    },
    {
      title: '周期(天)',
      search: false,
      dataIndex: 'hostingDays',
    },
    {
      title: '剩余天数',
      search: false,
      dataIndex: 'remainDays',
    },
    {
      title: '累计收益(FIL)',
      search: false,
      dataIndex: 'earnings',
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      renderText: (text: any) => [
        <a
          key="gathering"
          onClick={() => {
            setActiveOrder(text);
            setVisible(true);
          }}
        >
          收款
        </a>,
        <a
          key="gathering"
          onClick={() => {
            getSealCost(text);
          }}
        >
          质押
        </a>,
        <a
          key="check"
          onClick={() => {
            history.push(`/order/checkOrder?Id=${text.Id}`);
          }}
        >
          查看
        </a>,

        !text?.isManualStop && (
          <a
            onClick={() => {
              setOrder(text);
              setBlockUpOrderVisible(true);
            }}
          >
            停用
          </a>
        ),
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
            filter: 'mining',
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
        search={false}
        // search={{
        //   labelWidth: 'auto',
        // }}
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
        <PledgeModal
          activeOrder={activeOrder}
          visible={pledgeVisible}
          setVisible={setPledgeVisible}
          afterClose={afterClose}
          tableRef={actionRef}
          estimate={estimate}
          getSealCostForOrder={getSealCostForOrder}
        />
      )}
      {blockUpOrderVisible && (
        <BlockUpOrderModal
          order={order}
          visible={blockUpOrderVisible}
          onCancel={handleCancelBlockOrder}
          onOk={handleOkBlockOrder}
        />
      )}
    </>
  );
};

export default Mining;
