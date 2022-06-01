/*
 * @Description: 
 * @Author: 尚夏
 * @Date: 2021-07-30 15:13:59
 * @LastEditTime: 2021-07-30 16:10:15
 * @FilePath: /mining-admin-desktop/src/pages/AgencySet/AgencyMenu/InviteRelation.tsx
 */
import React from 'react';
import { Card, Button } from 'antd';
import styles from './index.less';

const InviteRelation: React.FC = () => {

  return (
    <div className={styles.invite_relation}>
      <div className={styles.inviter}>邀请人</div>
      <ul>
        <li>2348774</li>
      </ul>
      <div className={styles.invited}>邀请了</div>
      <ul>
        <li>1987274</li>
        <li>1987274</li>
        <li>1987274</li>
        <li>1987274</li>
        <li>1987274</li>
        <li>1987274</li>
        <li>1987274</li>
        <li>1987274</li>
      </ul>
    </div>
  )
}

export default InviteRelation;