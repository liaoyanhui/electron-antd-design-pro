/*
 * @Description: 页面内部路由
 * @Author: 尚夏
 * @Date: 2021-07-30 15:41:59
 * @LastEditTime: 2021-08-13 15:28:16
 * @FilePath: /mining-admin-desktop/src/components/InsideLayout/index.tsx
 */

import React from 'react';
import { history } from 'umi';
import { Menu } from 'antd';
import styles from './index.less';

const InsideLayout: React.FC<{
  children: React.ReactNode;
  menuList: any[];
  defaultRoute: string;
}> = (props) => {
  const { children, menuList, defaultRoute } = props;
  const handleClick = (e: any) => {
    history.push(e.key);
  };
  return (
    <>
      <div className={styles.menu_box}>
        <Menu
          onClick={handleClick}
          style={{ width: 256, height: '100%' }}
          defaultSelectedKeys={[defaultRoute]}
          mode="inline"
        >
          {menuList.map((item: any) => {
            return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
          })}
        </Menu>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default InsideLayout;
