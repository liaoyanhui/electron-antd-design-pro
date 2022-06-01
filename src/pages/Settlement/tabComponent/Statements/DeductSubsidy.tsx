/*
 * @Description: 扣补
 * @Author: 尚夏
 * @Date: 2021-08-27 18:08:32
 * @LastEditTime: 2021-08-28 16:21:49
 * @FilePath: /mining-admin-desktop/src/pages/Settlement/tabComponent/Statements/DeductSubsidy.tsx
 */

import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import styles from './index.less';

// 弹窗
import ComDeduct from './Modal/ComDeduct';
import ComSubsidy from './Modal/ComSubsidy';
import UserDeduct from './Modal/UserDeduct';
// import UserSubsidy from './Modal/UserSubsidy';

const DeductSubsidy: React.FC = () => {
  // 弹窗
  const [comDeductVisible, setComDeductVisible] = useState<boolean>(false); // 商品扣除
  const handleComDeductCancel = () => {
    setComDeductVisible(false);
  };
  const handleComDeductOk = () => {
    setComDeductVisible(false);
  };

  const [comSubsidyVisible, setComSubsidyVisible] = useState<boolean>(false); // 商品补贴
  const handleComSubsidyCancel = () => {
    setComSubsidyVisible(false);
  };
  const handleComSubsidyOk = () => {
    setComSubsidyVisible(false);
  };
  const [userDeductVisible, setUserDeductVisible] = useState<boolean>(false); // 用户扣除
  const handleUserDeductCancel = () => {
    setUserDeductVisible(false);
  };
  const handleUserDeductOk = () => {
    setUserDeductVisible(false);
  };
  const [userSubsidyVisible, setUserSubsidyVisible] = useState<boolean>(false); // 用户补贴
  const handlleUserSubsidyCancel = () => {
    setUserSubsidyVisible(false);
  };
  const handlleUserSubsidyOk = () => {
    setUserSubsidyVisible(false);
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
      <div className={styles.deductRepair}>
        <div className={styles.dedect}>
          <div className={styles.main_title}>扣除费用</div>
          <div className={styles.table}>
            <div className={styles.title}>商品</div>
            <ul>
              <li>商品</li>
              <li>合约周期</li>
              <li>技术服务费</li>
              <li>总扣除(FIL)</li>
            </ul>
            <ul className={styles.content}>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
            </ul>
            <div
              className={styles.add}
              onClick={() => {
                setComDeductVisible(true);
              }}
            >
              添加
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.title}>用户</div>
            <ul>
              <li>用户</li>
              <li>昵称</li>
              <li>邀请人</li>
              <li>余额(FIL)</li>
              <li>扣除</li>
            </ul>
            <ul className={styles.content}>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
            </ul>
            <div className={styles.bottom}>
              <span
                className={styles.bottom_add}
                onClick={() => {
                  setUserDeductVisible(true);
                }}
              >
                添加
              </span>
              <span></span>
              <span></span>
              <span className={styles.bottom_total}>总计</span>
              <span>100</span>
            </div>
          </div>
        </div>
        <div className={styles.repair}>
          <div className={styles.main_title}>补贴费用</div>
          <div className={styles.table}>
            <div className={styles.title}>商品</div>
            <ul>
              <li>商品</li>
              <li>合约周期</li>
              <li>技术服务费</li>
              <li>总补贴(FIL)</li>
            </ul>
            <ul className={styles.content}>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
            </ul>
            <div
              className={styles.add}
              onClick={() => {
                setComSubsidyVisible(true);
              }}
            >
              添加
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.title}>用户</div>
            <ul>
              <li>用户</li>
              <li>昵称</li>
              <li>邀请人</li>
              <li>余额(FIL)</li>
              <li>补贴</li>
            </ul>
            <ul className={styles.content}>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
            </ul>
            <div className={styles.bottom}>
              <span
                className={styles.bottom_add}
                onClick={() => {
                  setUserSubsidyVisible(true);
                }}
              >
                添加
              </span>
              <span></span>
              <span></span>
              <span className={styles.bottom_total}>总计</span>
              <span>100</span>
            </div>
          </div>
        </div>
        <div className={styles.btn}>
          <Button type="primary" className={styles.sure}>
            确认
          </Button>
        </div>
      </div>

      <ComDeduct
        visible={comDeductVisible}
        onCancel={handleComDeductCancel}
        onOk={handleComDeductOk}
      />
      <ComSubsidy
        visible={comSubsidyVisible}
        onCancel={handleComSubsidyCancel}
        onOk={handleComSubsidyOk}
      />
      <UserDeduct
        visible={userDeductVisible}
        onCancel={handleUserDeductCancel}
        onOk={handleUserDeductOk}
      />
      {/* <UserSubsidy
        visible={userSubsidyVisible}
        onCancel={handlleUserSubsidyCancel}
        onOk={handlleUserSubsidyOk}
      /> */}
    </PageContainer>
  );
};

export default DeductSubsidy;
