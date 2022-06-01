/*
 * @Description: 订单详情
 * @Author: 尚夏
 * @Date: 2021-07-27 14:53:28
 * @LastEditTime: 2021-10-09 18:41:22
 * @FilePath: /mining-admin-desktop/src/pages/Order/CheckOrder/OrderDetail.tsx
 */

import React, { useState, useEffect } from 'react';
import styles from './index.less';
import type { OrderDetailProps } from './data';
import { convertUTCTimeToLocalTime } from '@/utils/utils';
import { PaymentService, OrderService } from '@/services';
import { fenToCny, transformFIL } from '@/utils/utils';

const OrderDetail = (props: OrderDetailProps) => {
  const { title, orderInfo } = props;

  // 订单质押成本数据
  const [orderSeal, setOrderSeal] = useState<any>({});

  // 获取质押成本
  const getSealCostForOrder = (Id: number) => {
    OrderService.getSealCostForOrder({
      orderId: Id,
    }).then((res: any) => {
      if (res) {
        setOrderSeal(res);
      }
    });
  };

  // // 获取法币支付明细 筛选出单号
  // const [bankStatementNo, setBankStatementNo] = useState<string>();
  // const getOrderFiatPaymentList = (Id: number) => {
  //   PaymentService.getOrderFiatPaymentList({
  //     filterBy: 'Order',
  //     filter: String(Id),
  //   }).then((res: any) => {
  //     setBankStatementNo(res[0].bankStatementNo);
  //   });
  // };

  useEffect(() => {
    if (orderInfo.Id) {
      getSealCostForOrder(orderInfo.Id);
      // getOrderFiatPaymentList(orderInfo.Id);
    }
  }, [orderInfo]);

  return (
    <>
      <div className={styles.order_header}>
        <span>订单号：</span>
        <span>{orderInfo.orderNo}</span>
      </div>
      <div className={styles.order_detail}>
        <div className={styles.order_left}>
          <div>
            <span>下单时间</span>
            <span>{convertUTCTimeToLocalTime(orderInfo.createdAt)}</span>
          </div>
          <div>
            <span>状态</span>
            <span className={styles.type_status}>{title}</span>
          </div>
          <div className={styles.order_product}>
            <span>商品</span>
            <span className={styles.other_font}>{orderInfo.productName}</span>
          </div>
          <div>
            <span>数量</span>
            <span>{orderInfo.qty}份</span>
          </div>
          <div className={styles.order_user}>
            <span>账号</span>
            <span>{orderInfo.customerMobile}</span>
          </div>
          <div>
            <span>内部备注名</span>
            <span>{orderInfo.customerRemarksName}</span>
          </div>
        </div>
        <div className={styles.order_content}>
          <div className={styles.order_content_right}>
            <div>
              <div className={styles.right_title}>订单金额(¥)</div>
              <div className={styles.right_info}>
                <div>
                  <span className={styles.content_title_cny}>应收</span>
                  <span className={styles.other_font}>
                    {fenToCny(orderInfo.price * orderInfo.qty)}
                  </span>
                </div>
                <div>
                  <span className={styles.content_title_cny}>实收</span>
                  <span className={styles.other_font}>{fenToCny(orderInfo.paidAmount)}</span>
                </div>
                <div>
                  <span className={styles.content_title_cny}>已收</span>
                  <span className={styles.other_font} style={{ color: '#000' }}>
                    -
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.right_title}>质押(FIL)</div>
              <div className={styles.right_info}>
                <div>
                  <span className={styles.content_title}>预估值</span>
                  <span className={styles.other_font}>
                    {transformFIL(orderInfo.estimatePledgeAmount, 4)}
                  </span>
                </div>
                <div>
                  <span className={styles.content_title}>需质押</span>
                  <span className={styles.other_font}>
                    {transformFIL(orderSeal.pledgeAmount, 4)}
                  </span>
                </div>
                <div>
                  <span className={styles.content_title}>已质押</span>
                  <span className={styles.other_font} style={{ color: '#000' }}>
                    {transformFIL(orderSeal.paidPledgeAmount, 4)}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.right_title}>封装Gas消耗(FIL)</div>
              <div className={styles.right_info}>
                <div>
                  <span className={styles.content_title}>预估值</span>
                  <span className={styles.other_font}>
                    {transformFIL(orderInfo.estimateGasAmount, 4)}
                  </span>
                </div>
                <div>
                  <span className={styles.content_title}>需质押</span>
                  <span className={styles.other_font}>{transformFIL(orderSeal.gasAmount, 4)}</span>
                </div>
                <div>
                  <span className={styles.content_title}>已质押</span>
                  <span className={styles.other_font} style={{ color: '#000' }}>
                    {transformFIL(orderSeal.paidGasAmount, 4)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
