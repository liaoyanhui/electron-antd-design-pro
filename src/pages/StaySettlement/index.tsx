/*
 * @Description: 结算
 * @Author: 尚夏
 * @Date: 2021-07-20 13:50:12
 * @LastEditTime: 2022-01-13 10:19:36
 * @FilePath: /mining-admin-desktop/src/pages/StaySettlement/index.tsx
 */
import React, { useState } from 'react';
import { Tabs } from 'antd';
import styles from './index.less';
import { useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import UserStay from './tabComponent/UserStay';
import PlatformStay from './tabComponent/PlatformStay';
import AgencyStay from './tabComponent/AgencyStay';

const { TabPane } = Tabs;
const StaySettlement: React.FC = () => {
  const { pageInside, setPageInside } = useModel('usePageInsideDrop');

  const [tabKey, setTabKey] = useState<string>(pageInside.staySettlement || '1');

  const callback = (value: string) => {
    setPageInside({
      ...pageInside,
      staySettlement: value,
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
          <UserStay />
        </TabPane>
        <TabPane tab="商务" key="2">
          <AgencyStay />
        </TabPane>
        <TabPane tab="平台" key="3">
          <PlatformStay />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default StaySettlement;
