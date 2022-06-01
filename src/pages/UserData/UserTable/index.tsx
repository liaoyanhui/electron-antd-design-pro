/*
 * @Description: 用户列表
 * @Author: 尚夏
 * @Date: 2021-08-02 14:23:05
 * @LastEditTime: 2022-02-16 15:53:20
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserTable/index.tsx
 */

import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import styles from './index.less';
import { useModel } from 'umi';
// import EarningsRecord from './EarningsRecord';
import Withdraw from './Withdraw';
import HashRateStorage from './HashRateStorage';
import InviteRelation from './InviteRelation';
import ExpensesRecord from './ExpensesRecord';

// import LockedDetail from './LockedDetail';
// import PledgeDetail from './PledgeDetail';
// import Ended from './OrderComponents/Ended';

const { TabPane } = Tabs;

const UserTable: React.FC<{
  userId: any;
  mobile: any;
}> = (props) => {
  const { userId, mobile } = props;
  useEffect(() => {}, []);

  const { pageInside, setPageInside } = useModel('usePageInsideDrop');

  const [tabKey, setTabKey] = useState<string>(pageInside.userTable || '2');

  const callback = (value: string) => {
    setPageInside({
      ...pageInside,
      userTable: value,
    });
    setTabKey(value);
  };

  return (
    <Tabs
      defaultActiveKey="2"
      activeKey={tabKey}
      destroyInactiveTabPane={true}
      onChange={callback}
      className={styles.tab_style}
      tabBarStyle={{ border: 'none' }}
    >
      {/* <TabPane tab="收益记录" key="1">
        <EarningsRecord userId={userId} />
      </TabPane> */}
      <TabPane tab="提现记录" key="2">
        <Withdraw userId={userId} />
      </TabPane>
      <TabPane tab="算力存储" key="3">
        <HashRateStorage userId={userId} />
      </TabPane>
      {/* <TabPane tab="锁仓明细" key="4">
        <LockedDetail />
      </TabPane> */}
      {/* <TabPane tab="质押明细" key="5">
        <PledgeDetail />
      </TabPane> */}
      {/* 
        <TabPane tab="KYC" key="7">
        </TabPane> */}
      <TabPane tab="邀请关系" key="7">
        <InviteRelation userId={userId} />
      </TabPane>
      <TabPane tab="补扣记录" key="4">
        <ExpensesRecord userId={userId} mobile={mobile} />
      </TabPane>
    </Tabs>
  );
};

export default UserTable;
