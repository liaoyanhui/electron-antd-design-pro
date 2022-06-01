/*
 * @Description: 收款弹窗
 * @Author: 尚夏
 * @Date: 2021-08-10 16:10:15
 * @LastEditTime: 2021-09-17 14:05:20
 * @FilePath: /mining-admin-desktop/src/pages/Order/components/GatheringModal.tsx
 */

import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import styles from '../index.less';
import { PaymentService, OrderService } from '@/services';
import { fenToCny, transformFIL } from '@/utils/utils';
import AddFiatModal from './AddFiatModal';
import AddCryptoModal from './AddCryptoModal';

const GatheringModal: React.FC<Order.GateringModalProps> = (props) => {
  const { visible, setVisible, activeOrder, afterClose, tableRef } = props;

  const [fiatVisible, setFiatVisible] = useState<boolean>(false);
  const [cryptoVisible, setCryptoVisible] = useState<boolean>(false);

  // 法币明细列表
  const [fiatList, setFiatList] = useState<any>([]);
  // 数字货币明细列表
  const [cryptoList, setCryptoList] = useState<any>([]);

  // 法币支付明细
  const getFiatList = () => {
    PaymentService.getOrderFiatPaymentList({
      filterBy: 'orderId',
      filter: activeOrder.Id,
    }).then((res: any) => {
      if (res) {
        setFiatList([...res]);
      }
    });
  };

  // 数字货币支付明细
  const getCryptoList = () => {
    PaymentService.getOrderCyrptoPaymentList({
      filterBy: 'orderId',
      filter: activeOrder.Id,
    }).then((res: any) => {
      if (res) {
        setCryptoList([...res]);
      }
    });
  };

  useEffect(() => {
    getFiatList();
    getCryptoList();
  }, []);

  // 等待余款 关闭弹窗
  const handleCancel = () => {
    setVisible(false);
    afterClose();
  };

  /**
   * @description: 确认支付完成
   * @param {*}
   * @return {*}
   */
  const handleOk = () => {
    OrderService.completeOrderPayment({
      id: activeOrder.Id,
    }).then((res: any) => {
      if (res) {
        handleCancel();
        tableRef.current?.reload();
      }
    });
  };

  return (
    <>
      <Modal
        title={<div style={{ textAlign: 'center' }}>收款明细</div>}
        width={900}
        centered
        visible={visible}
        footer={[
          <Button key="back" type="primary" onClick={handleCancel}>
            等待余款
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            确认收款
          </Button>,
        ]}
        wrapClassName={styles.modal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={`${styles.orderNumber} ${styles.body_padding}`}>
          {activeOrder && activeOrder.orderNo}
        </div>
        <div className={`${styles.body_padding}`}>
          <div className={styles.need_money}>
            <div>应收(¥)</div>
            <div className={styles.label}>{fenToCny(activeOrder.paidAmount)}</div>
          </div>
        </div>
        <p className={`${styles.label} ${styles.body_padding}`}>法币</p>
        <ul className={`${styles.body_padding} ${styles.detail_ul}`}>
          <li>
            <span>汇款金额(¥)</span>
          </li>
          <li>
            <span>汇款银行</span>
          </li>
          <li>
            <span>汇款单号</span>
          </li>
          <li>
            <span>备注</span>
          </li>
        </ul>
        {fiatList.map((item: any, index: number) => {
          return (
            <ul key={index} className={`${styles.body_padding} ${styles.detail_ul}`}>
              <li>
                {/* <span>汇款金额(¥)</span> */}
                <span>{fenToCny(item.amount)}</span>
              </li>
              <li>
                {/* <span>汇款银行</span> */}
                <span>{item.bankName}</span>
              </li>
              <li>
                {/* <span>汇款单号</span> */}
                <span>{item.bankStatementNo}</span>
              </li>
              <li>
                {/* <span>备注</span> */}
                <span>{item.comment}</span>
              </li>
            </ul>
          );
        })}
        <div
          className={`${styles.body_padding} ${styles.add} ${styles.margin_bottom}`}
          onClick={() => setFiatVisible(true)}
        >
          添加
        </div>
        <p className={`${styles.label} ${styles.body_padding}`}>数字货币</p>
        <ul className={`${styles.body_padding} ${styles.detail_ul}`}>
          <li>
            <span>币种</span>
          </li>
          <li>
            <span>数量</span>
          </li>
          <li>
            <span>交易Id</span>
          </li>
          <li>
            <span>备注</span>
          </li>
        </ul>
        {cryptoList.map((item: any, index: number) => {
          return (
            <ul key={index} className={`${styles.body_padding} ${styles.detail_ul}`}>
              <li>
                <span>{item.currency}</span>
              </li>
              <li>
                <span>{transformFIL(item.amount)}</span>
              </li>
              <li>
                <span>{item.txOrMessageId}</span>
              </li>
              <li>
                <span>{item.comment}</span>
              </li>
            </ul>
          );
        })}
        <div
          className={`${styles.body_padding} ${styles.add}`}
          onClick={() => setCryptoVisible(true)}
        >
          添加
        </div>
      </Modal>
      <AddFiatModal
        visible={fiatVisible}
        setVisible={setFiatVisible}
        orderId={activeOrder.Id}
        fetchList={getFiatList}
      />
      <AddCryptoModal
        visible={cryptoVisible}
        setVisible={setCryptoVisible}
        orderId={activeOrder.Id}
        fetchList={getCryptoList}
      />
    </>
  );
};

export default GatheringModal;
