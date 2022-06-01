/*
 * @Description: 平台支付审核
 * @Author: 尚夏
 * @Date: 2021-11-05 10:55:50
 * @LastEditTime: 2021-11-05 10:56:51
 * @FilePath: /mining-admin-desktop/src/pages/OwnerPay/index.tsx
 */

import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import styles from './index.less';

import OwnerStayCheck from './PayComponents/OwnerStayCheck';
import OwnerPullCurrency from './PayComponents/OwnerPullCurrency';
import OwnerPaied from './PayComponents/OwnerPaied';
import OwnerUnPass from './PayComponents/OwnerUnPass';

const { TabPane } = Tabs;

const OwnerPay: React.FC = () => {
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
          <OwnerStayCheck />
        </TabPane>
        <TabPane tab="打币" key="2">
          <OwnerPullCurrency />
        </TabPane>
        <TabPane tab="已支付" key="3">
          <OwnerPaied />
        </TabPane>
        <TabPane tab="未通过" key="4">
          <OwnerUnPass />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default OwnerPay;
