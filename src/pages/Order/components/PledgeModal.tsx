/*
 * @Description: 质押明细
 * @Author: 尚夏
 * @Date: 2021-08-12 13:55:27
 * @LastEditTime: 2021-12-03 15:27:50
 * @FilePath: /mining-admin-desktop/src/pages/Order/components/PledgeModal.tsx
 */
import React, { useState, useEffect } from 'react';
import { Modal, Tooltip, Button, message } from 'antd';
import styles from '../index.less';
import { PaymentService, OrderService } from '@/services';
import AddPledgeModal from './AddPledgeModal';
import EditPledgeModal from './EditPledgeModal';
import { transformFIL, formatAddress, convertUTCTimeToLocalTime } from '@/utils/utils';

const PledgeModal: React.FC<Order.PledgeModal> = (props) => {
  const { visible, setVisible, activeOrder, afterClose, tableRef, estimate, getSealCostForOrder } =
    props;

  // 支付类型 质押｜gas
  const [type, setType] = useState<string>('');
  const [pledgeVisible, setPledgeVisible] = useState<boolean>(false);

  // 质押明细列表
  const [pledgeList, setPledgeList] = useState<any>([]);
  // gas明细列表
  const [gasList, setGasList] = useState<any>([]);

  // 质押明细
  const getPledgeList = () => {
    getSealCostForOrder(activeOrder.orderId);
    PaymentService.getFilecoinSealCostPaymentList({
      filterBy: 'orderId',
      filter: activeOrder.orderId,
    }).then((res: any) => {
      // setPledgeList([...res]);
      if (res) {
        const pledgeArr: any = [];
        const gasArr: any = [];
        res.forEach((item: any) => {
          if (item.type === 'pledge') {
            pledgeArr.push(item);
          }
          if (item.type === 'gas') {
            gasArr.push(item);
          }
        });
        setPledgeList([...pledgeArr]);
        setGasList([...gasArr]);
      }
    });
  };

  useEffect(() => {
    getPledgeList();
  }, []);

  // 等待余款 关闭弹窗
  const handleCancel = () => {
    setVisible(false);
    afterClose();
  };

  /**
   * @description: 确认质押完成
   * @param {*}
   * @return {*}
   */
  const handleOk = () => {
    OrderService.completeOrderSealCostPayment({
      id: activeOrder.orderId,
    }).then((res: any) => {
      if (res) {
        handleCancel();
        tableRef.current?.reload();
      }
    });
  };

  /**
   * @description:
   * @param {number} id
   * @return {*}
   */
  const [editPledgeVisible, setEditPledgeVisible] = useState<boolean>(false);
  const [editPledgeId, setEditPledgeId] = useState<any>();
  const handleChangeAmount = (id: number) => {
    setEditPledgeId(id);
    setEditPledgeVisible(true);
  };

  return (
    <>
      <Modal
        title={<div style={{ textAlign: 'center' }}>质押明细</div>}
        width={900}
        centered
        visible={visible}
        footer={[
          <Button key="back" type="primary" onClick={handleCancel}>
            等待余款
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            确认质押
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
          <div>质押(FIL)</div>
          <ul>
            <li className={styles.estimate}>
              <div>预估值</div>
              <div className={styles.label}>{transformFIL(estimate.estimatePledgeAmount, 4)}</div>
            </li>
            <li className={styles.need}>
              <div>应质押</div>
              <div className={styles.label}>
                {activeOrder.pledgeAmount ? transformFIL(activeOrder.pledgeAmount, 4) : 'N/A'}
              </div>
            </li>
            <li className={styles.reality}>
              <div>已质押</div>
              <div className={styles.label}>{transformFIL(activeOrder.paidPledgeAmount, 4)}</div>
            </li>
          </ul>
        </div>
        <ul className={`${styles.body_padding} ${styles.detail_ul}`}>
          <li>
            <span>数量</span>
          </li>
          <li>
            <span>MessageId</span>
          </li>
          <li>
            <span>支付地址</span>
          </li>
          <li>
            <span>备注</span>
          </li>
          <li>
            <span>操作</span>
          </li>
        </ul>
        {pledgeList.map((item: any, index: number) => {
          return (
            <ul key={index} className={`${styles.body_padding} ${styles.pledge_ul}`}>
              <li>
                <span>{transformFIL(item.amount)}</span>
              </li>
              <li className={styles.tx_message}>
                <span>{formatAddress(item.messageId)}</span>
              </li>
              <li>
                <span>{formatAddress(item.toAddress)}</span>
              </li>
              {/* <li>
                <span>支付时间</span>
                <span>{convertUTCTimeToLocalTime(item.paidAt)}</span>
              </li> */}
              <li>
                <span>
                  <Tooltip title={item.comment}>
                    <span className={styles.dot}>{item.comment}</span>
                  </Tooltip>
                </span>
              </li>
              <li className={styles.tx_message} onClick={() => handleChangeAmount(item.Id)}>
                <span>修改质押数量</span>
              </li>
            </ul>
          );
        })}
        <div
          className={`${styles.body_padding} ${styles.add} ${styles.margin_bottom}`}
          onClick={() => {
            setType('pledge');
            setPledgeVisible(true);
          }}
        >
          添加
        </div>
        {/* <p className={`${styles.label} ${styles.body_padding}`}>封装Gas消耗(FIL)</p> */}
        <div className={`${styles.body_padding}`}>
          <div>封装Gas消耗(FIL)</div>
          <ul>
            <li className={styles.estimate}>
              <div>预估值</div>
              <div className={styles.label}>{transformFIL(estimate.estimateGasAmount, 4)}</div>
            </li>
            <li className={styles.need}>
              <div>应质押</div>
              <div className={styles.label}>
                {activeOrder.pledgeAmount ? transformFIL(activeOrder.gasAmount, 4) : 'N/A'}
              </div>
            </li>
            <li className={styles.reality}>
              <div>已质押</div>
              <div className={styles.label}>{transformFIL(activeOrder.paidGasAmount, 4)}</div>
            </li>
          </ul>
        </div>
        <ul className={`${styles.body_padding} ${styles.detail_ul}`}>
          <li>
            <span>数量</span>
          </li>
          <li>
            <span>MessageID</span>
          </li>
          <li>
            <span>支付地址</span>
          </li>
          <li>
            <span>备注</span>
          </li>
          <li>
            <span>操作</span>
          </li>
        </ul>
        {gasList.map((item: any, index: number) => {
          return (
            <ul key={index} className={`${styles.body_padding} ${styles.pledge_ul}`}>
              <li>
                <span>{transformFIL(item.amount)}</span>
              </li>
              <li className={styles.tx_message}>
                <span>{formatAddress(item.messageId)}</span>
              </li>
              <li>
                <span>{formatAddress(item.toAddress)}</span>
              </li>
              <li>
                <span>
                  <Tooltip title={item.comment}>
                    <span className={styles.dot}>{item.comment}</span>
                  </Tooltip>
                </span>
              </li>
              <li className={styles.tx_message} onClick={() => handleChangeAmount(item.Id)}>
                <span>修改gas数量</span>
              </li>
            </ul>
          );
        })}
        <div
          className={`${styles.body_padding} ${styles.add}`}
          onClick={() => {
            setType('gas');
            setPledgeVisible(true);
          }}
        >
          添加
        </div>
      </Modal>
      {pledgeVisible && (
        <AddPledgeModal
          visible={pledgeVisible}
          setVisible={setPledgeVisible}
          orderId={activeOrder.orderId}
          fetchList={getPledgeList}
          type={type}
        />
      )}
      {editPledgeVisible && (
        <EditPledgeModal
          id={editPledgeId}
          setVisible={setEditPledgeVisible}
          visible={editPledgeVisible}
          fetchList={getPledgeList}
        />
      )}
    </>
  );
};

export default PledgeModal;
