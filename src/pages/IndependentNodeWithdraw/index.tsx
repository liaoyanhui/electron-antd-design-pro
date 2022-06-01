/*
 * @Description: 平台提现
 * @Author: 尚夏
 * @Date: 2022-01-07 10:09:26
 * @LastEditTime: 2022-01-07 10:40:08
 * @FilePath: /mining-admin-desktop/src/pages/IndependentNodeWithdraw/index.tsx
 */

import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import styles from './index.less';

import WithdrawStayCheck from './WithdrawComponent/WithdrawStayCheck';
import WithdrawPaied from './WithdrawComponent/WithdrawPaied';
import WithdrawPullCurrency from './WithdrawComponent/WithdrawPullCurrency';
import WithdrawUnPass from './WithdrawComponent/WithdrawUnPass';

const { TabPane } = Tabs;

const IndependentNodeWithdraw: React.FC = () => {
  const callback = () => {};

  return (
    <PageContainer
      header={{
        breadcrumbRender: (params) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      <Tabs
        defaultActiveKey="1"
        destroyInactiveTabPane={true}
        onChange={callback}
        className={styles.tab_style}
        tabBarStyle={{ border: 'none' }}
      >
        <TabPane tab="待审核" key="1">
          <WithdrawStayCheck />
        </TabPane>
        <TabPane tab="打币" key="2">
          <WithdrawPullCurrency />
        </TabPane>
        <TabPane tab="已支付" key="3">
          <WithdrawPaied />
        </TabPane>
        <TabPane tab="未通过" key="4">
          <WithdrawUnPass />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default IndependentNodeWithdraw;
