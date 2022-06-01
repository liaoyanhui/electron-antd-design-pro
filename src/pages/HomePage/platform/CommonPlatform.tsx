/*
 * @Description: 普通平台
 * @Author: 尚夏
 * @Date: 2021-10-19 14:26:22
 * @LastEditTime: 2021-11-25 10:22:28
 * @FilePath: /mining-admin-desktop/src/pages/HomePage/platform/CommonPlatform.tsx
 */

import React, { useEffect } from 'react';
// import { history, useModel } from 'umi';
// import { Dropdown, Menu, Tooltip } from 'antd';
// import { StarOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import styles from '../index.less';
// import { setStore } from '@/utils/utils';

import CommonCardList from '../components/CommonCardList';
// import CommonBarChart from '../components/CommonBarChart';
// import CommonPieChart from '../components/CommonPieChart';

const CommonPlatform: React.FC<{
  // platformList: any[]
}> = (props) => {
  return (
    <div className={styles.home_page}>
      <CommonCardList />
      {/* <div className={styles.home_page_line}>
        <div>
          <CommonBarChart />
        </div>
        <div>3</div>
      </div> */}
    </div>
  );
};

export default CommonPlatform;
