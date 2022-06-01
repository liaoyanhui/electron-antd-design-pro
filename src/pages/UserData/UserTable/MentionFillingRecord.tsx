/*
 * @Description: 充提记录
 * @Author: 尚夏
 * @Date: 2021-08-02 15:29:50
 * @LastEditTime: 2021-08-13 14:47:20
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserTable/MentionFillingRecord.tsx
 */
import React from 'react';
import { Tabs } from 'antd';
import styles from './index.less';

import WithDraw from './Withdraw';
import Recharge from './Recharge';

const { TabPane } = Tabs;
const MentionFillingRecord: React.FC = () => {
  const callback = () => {};

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={callback}
      className={styles.tab_second_style}
      tabBarStyle={{ border: 'none' }}
    >
      <TabPane tab="提现" key="1">
        <WithDraw />
      </TabPane>
      <TabPane tab="充值" key="2">
        <Recharge />
      </TabPane>
    </Tabs>
  );
};

export default MentionFillingRecord;
