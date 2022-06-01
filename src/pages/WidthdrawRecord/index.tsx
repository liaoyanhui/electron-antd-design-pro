/*
 * @Description: 平台提现记录
 * @Author: 尚夏
 * @Date: 2021-11-05 14:20:22
 * @LastEditTime: 2021-11-09 15:05:33
 * @FilePath: /mining-admin-desktop/src/pages/WidthdrawRecord/index.tsx
 */

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import styles from './index.less';
// import { PlatformService } from '@/services';
// import { getStore } from '@/utils/utils';

import OwnerStayCheck from './components/StayCheck';
import OwnerPullCurrency from './components/PullCurrency';
import OwnerPaied from './components/Paied';
import OwnerUnPass from './components/UnPass';

const { TabPane } = Tabs;

const WithdrawRecord: React.FC = () => {
  const callback = () => {};

  // //  平台地址
  // const [address, setAddress] = useState<string | null>(null);
  // // 获取平台更多信息 设置地址
  // const getPlatformInfo = (id: string | number) => {
  //   PlatformService.getPlatformById({
  //     id,
  //   }).then((res: any) => {
  //     if (res) {
  //       setAddress(res.filecoinWithdrawAddress);
  //     }
  //   });
  // };

  // // 获取绑定地址
  // useEffect(() => {
  //   const platformId = getStore('platformId');
  //   if (platformId) {
  //     getPlatformInfo(platformId);
  //   } else {
  //     const userInfo = JSON.parse(getStore('userInfo') || '{}');
  //     const user: any = userInfo;
  //     if (user.userRole === 'PlatformAdmin') {
  //       getPlatformInfo(user.platformIds[0]);
  //     }
  //   }
  // }, []);

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
        <TabPane tab="待收款" key="2">
          <OwnerPullCurrency />
        </TabPane>
        <TabPane tab="已收款" key="3">
          <OwnerPaied />
        </TabPane>
        <TabPane tab="未通过" key="4">
          <OwnerUnPass />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default WithdrawRecord;
