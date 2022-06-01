/*
 * @Description: 支付
 * @Author: 尚夏
 * @Date: 2021-07-20 13:39:40
 * @LastEditTime: 2021-08-31 20:31:49
 * @FilePath: /mining-admin-desktop/src/pages/Pay/index.tsx
 */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import styles from './index.less';

import StayCheck from './PayComponents/StayCheck';
import PullCurrency from './PayComponents/PullCurrency';
import Paied from './PayComponents/Paied';
import UnPass from './PayComponents/UnPass';

const { TabPane } = Tabs;

const Pay: React.FC = () => {
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
          <StayCheck />
        </TabPane>
        <TabPane tab="打币" key="2">
          <PullCurrency />
        </TabPane>
        <TabPane tab="已支付" key="3">
          <Paied />
        </TabPane>
        <TabPane tab="未通过" key="4">
          <UnPass />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default Pay;
