/* eslint-disable @typescript-eslint/no-unused-expressions */
/*
 * @Description: 封装中
 * @Author: 尚夏
 * @Date: 2021-07-27 11:17:36
 * @LastEditTime: 2021-10-25 09:38:57
 * @FilePath: /mining-admin-desktop/src/pages/Order/OrderComponents/Sealing.tsx
 */

import React, { useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { OrderService, FilecoinService } from '@/services';
import { history } from 'umi';
import { Modal, Input, message, Button, Tooltip } from 'antd';
import styles from '../index.less';
import { formatAddress } from '@/utils/utils';
import PledgeModal from '../components/PledgeModal';

const Sealing: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [orderId, setOrderId] = useState<any>(null);

  const [hashRate, setHashRate] = useState<any>({});
  const [visible, setVisible] = useState<boolean>(false);
  // 封装
  const handleSeal = (id: number, cb?: () => void) => {
    setOrderId(id);
    FilecoinService.getFilecoinStorageById({ orderId: id }).then((res: any) => {
      if (res) {
        setHashRate(res);
        cb && cb();
      }
    });
  };

  const [storage, setStorage] = useState<any>();
  const handleChangeStorage = (e: any) => {
    setStorage(e.target.value);
  };
  // 添加封装存储
  const handleAdd = (data: any) => {
    if (storage) {
      const s = data.storage - data.sealedStorage;
      if (storage > s) {
        message.warning('超过未封装存储');
        return;
      }
      FilecoinService.addFilecoinSealedStorage({
        orderId,
        storage,
      }).then((res: any) => {
        if (res) {
          setVisible(false);
          handleSeal(orderId);
          setStorage('');
          actionRef.current?.reload();
        }
      });
    } else {
      message.warning('请填写正确的封装');
    }
  };

  // 完成封装
  const handleOk = () => {
    OrderService.startOrderMining({
      id: orderId,
    }).then((res: any) => {
      if (res) {
        setOrderId(null);
        setVisible(false);
        message.success('操作成功');
        actionRef.current?.reload();
      }
    });
  };

  const handleCancel = () => {
    setVisible(false);
    setStorage('');
  };

  // 质押
  const [activeOrder, setActiveOrder] = useState<any>({});
  const [pledgeVisible, setPledgeVisible] = useState<boolean>(false);

  // 获取订单封装成本 estimatePledgeAmount estimateGasAmount
  const [estimate, setEstimate] = useState<any>({});

  // 弹窗关闭后执行方法
  const afterClose = () => {
    setActiveOrder({});
    setEstimate({});
  };

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
        <a
          key="clean"
          onClick={() =>
            handleSeal(text.Id, () => {
              setVisible(true);
            })
          }
        >
          封装
        </a>,
        <a
          key="gathering"
          onClick={() => {
            getSealCost(text);
          }}
        >
          增加质押
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
            filter: 'sealing',
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
        toolBarRender={() => []}
      />
      <Modal
        title={<div style={{ textAlign: 'center' }}>封装进度</div>}
        width={600}
        centered
        visible={visible}
        wrapClassName={styles.modal}
        footer={
          hashRate.storage === hashRate.sealedStorage && (
            <Button key="sure" type="primary" onClick={handleOk}>
              完成封装
            </Button>
          )
        }
        // onOk={handleOk}
        onCancel={handleCancel}
        okText={'封装完成'}
        cancelText={'确定'}
      >
        <div className={styles.sealing}>
          <ul>
            <li>
              <span>需封装</span>
              <span className={styles.hashRate_init}>{hashRate.storage}T</span>
            </li>
            <li>
              <span>未封装</span>
              <span className={styles.hashRate}>{hashRate.storage - hashRate.sealedStorage}T</span>
            </li>
            <li>
              <span>已封装</span>
              <span className={styles.hashRate}>{hashRate.sealedStorage}T</span>
            </li>
          </ul>
          {hashRate.storage > hashRate.sealedStorage && (
            <div className={styles.total_package}>
              <span>今日封装</span>
              <Input
                placeholder="输入封装存储"
                type="number"
                value={storage}
                onChange={handleChangeStorage}
              ></Input>
              <Button type="primary" onClick={() => handleAdd(hashRate)}>
                确定
              </Button>
            </div>
          )}
        </div>
      </Modal>
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
    </>
  );
};

export default Sealing;
