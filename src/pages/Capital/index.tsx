/*
 * @Description: 资金
 * @Author: 尚夏
 * @Date: 2021-07-20 13:50:12
 * @LastEditTime: 2022-01-13 10:17:43
 * @FilePath: /mining-admin-desktop/src/pages/Capital/index.tsx
 */
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
import styles from './index.less';
import Withdraw from './Modal/Withdraw';

import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const Capital: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  // 提现
  const handleWithdraw = () => {
    setVisible(true);
  };

  return (
    <PageContainer
      header={{
        breadcrumbRender: (params) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      <div className={styles.capital}>
        <div className={styles.box}>
          <div className={styles.total_1}>
            <div className={styles.title}>销售</div>
            <div className={styles.content_center}>
              <p>
                <span className={styles.lable}>销售总额</span>
                <span className={styles.number}>2938.3939</span>
              </p>
            </div>
            <div>
              <p>
                <span className={styles.lable}>银行转账</span>
                <span className={styles.number}>2938.3939</span>
              </p>
              <p>
                <span className={styles.lable}>BTC</span>
                <span className={styles.number}>2938.3939</span>
              </p>
              <p>
                <span className={styles.lable}>USDT</span>
                <span className={styles.number}>2938.3939</span>
              </p>
            </div>
          </div>
          <div className={styles.total_2}>
            <div className={styles.title}></div>
            <div className={styles.content_center}>
              <p>
                <span className={styles.lable}>质押</span>
                <span className={styles.number}>2938.3939</span>
              </p>
              <p>
                <span className={styles.lable}>总存储</span>
                <span className={styles.number}>2938.3939</span>
              </p>
              <p>
                <span className={styles.lable}>累计发放</span>
                <span className={styles.number}>2938.3939</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.platform}>
            <div className={styles.title}>平台</div>
            <div className={styles.content_center}>
              <p>
                <span className={styles.lable}>平台收益</span>
                <span className={styles.number}>2938.3939</span>
              </p>
            </div>
            <div>
              <p>
                <span className={styles.lable}>锁仓</span>
                <span className={styles.number}>2938.3939</span>
              </p>
              <p>
                <span className={styles.lable}>可提现</span>
                <span className={styles.number}>2938.3939</span>
              </p>
              <p>
                <span className={styles.lable}>已提现</span>
                <span className={styles.number}>2938.3939</span>
              </p>
            </div>
            <div className={styles.btn} onClick={handleWithdraw}>
              提现
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.agency}>
            <div className={styles.title}>商务</div>
            <div className={styles.content_center}>
              <p>
                <span className={styles.lable}>返佣</span>
                <span className={styles.number}>2938.3939</span>
              </p>
            </div>
            <div>
              <p>
                <span className={styles.lable}>锁仓</span>
                <span className={styles.number}>2938.3939</span>
              </p>
              <p>
                <span className={styles.lable}>可提现</span>
                <span className={styles.number}>2938.3939</span>
              </p>
              <p>
                <span className={styles.lable}>已提现</span>
                <span className={styles.number}>2938.3939</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.box_bottom}>
          <div className={styles.agency}>
            <div className={styles.title}>用户</div>
            <div className={styles.content_center}>
              <p>
                <span className={styles.lable}>累计收益</span>
                <span className={styles.number}>2938.3939</span>
              </p>
              <p>
                <span className={styles.lable}>补贴</span>
                <span className={styles.number}>2938.3939</span>
              </p>
              <p>
                <span className={styles.lable}>扣除</span>
                <span className={styles.number}>2938.3939</span>
              </p>
            </div>
            <div>
              <p>
                <span className={styles.lable}>锁仓</span>
                <span className={styles.number}>2938.3939</span>
              </p>
              <p>
                <span className={styles.lable}>可提现</span>
                <span className={styles.number}>2938.3939</span>
              </p>
              <p>
                <span className={styles.lable}>已提现</span>
                <span className={styles.number}>2938.3939</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Withdraw visible={visible} setVisible={setVisible} />
    </PageContainer>
  );
};

export default Capital;
