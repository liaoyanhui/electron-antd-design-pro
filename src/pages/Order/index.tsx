/*
 * @Description: 订单
 * @Author: 尚夏
 * @Date: 2021-07-20 13:39:40
 * @LastEditTime: 2021-10-09 17:52:45
 * @FilePath: /mining-admin-desktop/src/pages/Order/index.tsx
 */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import { Tabs } from 'antd';
import styles from './index.less';

import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import UnPaid from './OrderComponents/UnPaid';
import StayPledge from './OrderComponents/StayPledge';
import StayPackage from './OrderComponents/StayPackage';
import Sealing from './OrderComponents/Sealing';
import Mining from './OrderComponents/Mining';
import Canceled from './OrderComponents/Canceled';
import Ended from './OrderComponents/Ended';

const { TabPane } = Tabs;

const Order: React.FC = () => {
  const { pageInside, setPageInside } = useModel('usePageInsideDrop');
  const [tabKey, setTabKey] = useState<string>(pageInside.orderState || '1');

  const callback = (value: string) => {
    setPageInside({
      ...pageInside,
      orderState: value,
    });
    setTabKey(value);
  };

  return (
    <PageContainer
      header={{
        breadcrumbRender: (params: any) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      <Tabs
        defaultActiveKey={'1'}
        activeKey={tabKey}
        destroyInactiveTabPane={true}
        onChange={callback}
        className={styles.tab_style}
        tabBarStyle={{ border: 'none' }}
      >
        <TabPane tab="待支付" key="1">
          <UnPaid />
        </TabPane>
        <TabPane tab="待质押" key="2">
          <StayPledge />
        </TabPane>
        <TabPane tab="待封装" key="3">
          <StayPackage />
        </TabPane>
        <TabPane tab="封装中" key="4">
          <Sealing />
        </TabPane>
        <TabPane tab="挖矿中" key="5">
          <Mining />
        </TabPane>
        <TabPane tab="已取消" key="6">
          <Canceled />
        </TabPane>
        <TabPane tab="已结束" key="7">
          <Ended />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default Order;
