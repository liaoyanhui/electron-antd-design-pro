/*
 * @Description: 结算
 * @Author: 尚夏
 * @Date: 2021-07-20 13:50:12
 * @LastEditTime: 2022-01-13 10:19:15
 * @FilePath: /mining-admin-desktop/src/pages/Settlement/index.tsx
 */
import React, { useState } from 'react';
import { Tabs } from 'antd';
import styles from './index.less';
import { useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';

import UserStatement from './tabComponent/UserStatement';
import AgencyStatement from './tabComponent/AgencyStatement';
import PlatformStatement from './tabComponent/PlatformStatement';

const { TabPane } = Tabs;
const Settlement: React.FC = () => {
  const { pageInside, setPageInside } = useModel('usePageInsideDrop');
  const [tabKey, setTabKey] = useState<string>(pageInside.settlement || '1');

  const callback = (value: string) => {
    setPageInside({
      ...pageInside,
      settlement: value,
    });
    setTabKey(value);
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
      <Tabs
        defaultActiveKey="1"
        activeKey={tabKey}
        onChange={callback}
        destroyInactiveTabPane={true}
        className={styles.tab_style}
        tabBarStyle={{ border: 'none' }}
      >
        <TabPane tab="用户" key="1">
          <UserStatement />
        </TabPane>
        <TabPane tab="商务" key="2">
          <AgencyStatement />
        </TabPane>
        <TabPane tab="平台" key="3">
          <PlatformStatement />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default Settlement;
