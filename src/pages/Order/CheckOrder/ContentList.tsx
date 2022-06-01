/*
 * @Description: 明细
 * @Author: 尚夏
 * @Date: 2021-08-12 15:59:08
 * @LastEditTime: 2022-01-11 09:55:34
 * @FilePath: /mining-admin-desktop/src/pages/Order/CheckOrder/ContentList.tsx
 */

import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { PaymentService } from '@/services';
import { formatAddress, fenToCny, transformFIL, dropThirdBrowser } from '@/utils/utils';
import { message, Tooltip } from 'antd';
import Copy from '@/components/Copy';

const ContentList: React.FC<{ orderId: any }> = (props) => {
  const { orderId } = props;

  const [copied, setCopied] = useState<boolean>(false);

  // 法币明细列表
  const [fiatList, setFiatList] = useState<any>([]);
  // 数字货币明细列表
  const [cryptoList, setCryptoList] = useState<any>([]);

  // 法币支付明细
  const getFiatList = () => {
    PaymentService.getOrderFiatPaymentList({
      filterBy: 'orderId',
      filter: orderId,
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
      filter: orderId,
    }).then((res: any) => {
      if (res) {
        setCryptoList([...res]);
      }
    });
  };

  // 质押明细列表
  const [pledgeList, setPledgeList] = useState<any>([]);
  // gas明细列表
  const [gasList, setGasList] = useState<any>([]);

  // 质押明细
  const getPledgeList = () => {
    PaymentService.getFilecoinSealCostPaymentList({
      filterBy: 'orderId',
      filter: orderId,
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
    getFiatList();
    getCryptoList();
    getPledgeList();
  }, []);

  return (
    <>
      <div className={styles.box}>
        <div className={styles.content_title} style={{ marginRight: 20 }}>
          购买
        </div>
        <div className={styles.list_box}>
          <p className={styles.small_title}>法币</p>
          <div className={styles.list}>
            <ul>
              <li>汇款金额(¥)</li>
              <li>汇款银行</li>
              <li>汇款单号</li>
              <li>备注</li>
            </ul>
            {fiatList &&
              fiatList.map((item: any, index: number) => {
                return (
                  <ul key={index} className={styles.ul_list}>
                    <li>{fenToCny(item.amount)}</li>
                    <li>{item.bankName}</li>
                    <li>{item.bankStatementNo}</li>
                    <li>
                      <Tooltip title={item.comment}>
                        <span className={styles.dot}>{item.comment}</span>
                      </Tooltip>
                    </li>
                  </ul>
                );
              })}
          </div>
          <p className={styles.small_title}>数字货币</p>
          <div className={styles.list}>
            <ul>
              <li>币种</li>
              <li>数量</li>
              <li>交易ID</li>
              <li>备注</li>
            </ul>
            {cryptoList &&
              cryptoList.map((item: any, index: number) => {
                return (
                  <ul key={index} className={styles.ul_list}>
                    <li>{item.currency}</li>
                    <li>{transformFIL(item.amount)}</li>
                    <li>
                      {formatAddress(item.txOrMessageId)}
                      <Copy text={item.txOrMessageId} />
                    </li>
                    <li>
                      <Tooltip title={item.comment}>
                        <span className={styles.dot}>{item.comment}</span>
                      </Tooltip>
                    </li>
                  </ul>
                );
              })}
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.content_title} style={{ marginRight: 20 }}>
          质押(FIL)
        </div>
        <div className={styles.list}>
          <ul>
            <li>数量(FIL)</li>
            <li>MessageID</li>
            <li>支付地址</li>
            <li>备注</li>
          </ul>
          {pledgeList &&
            pledgeList.map((item: any, index: number) => {
              return (
                <ul key={index} className={styles.ul_list}>
                  <li>{transformFIL(item.amount)}</li>
                  <li
                    className={styles.tx_message}
                    onClick={() => dropThirdBrowser(item.messageId)}
                  >
                    {formatAddress(item.messageId)}
                  </li>
                  <li>{formatAddress(item.toAddress)}</li>
                  <li>
                    <Tooltip title={item.comment}>
                      <span className={styles.dot}>{item.comment}</span>
                    </Tooltip>
                  </li>
                </ul>
              );
            })}
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.content_title} style={{ marginRight: 20 }}>
          封装Gas消耗(FIL)
        </div>
        <div className={styles.list}>
          <ul>
            <li>数量(FIL)</li>
            <li>MessageID</li>
            <li>支付地址</li>
            {/* <li>支付时间</li> */}
            <li>备注</li>
          </ul>
          {gasList &&
            gasList.map((item: any, index: number) => {
              return (
                <ul key={index} className={styles.ul_list}>
                  <li>{transformFIL(item.amount)}</li>
                  <li
                    className={styles.tx_message}
                    onClick={() => dropThirdBrowser(item.messageId)}
                  >
                    {formatAddress(item.messageId)}
                  </li>
                  <li>{formatAddress(item.toAddress)}</li>
                  <li>
                    <Tooltip title={item.comment}>
                      <span className={styles.dot}>{item.comment}</span>
                    </Tooltip>
                  </li>
                </ul>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ContentList;
