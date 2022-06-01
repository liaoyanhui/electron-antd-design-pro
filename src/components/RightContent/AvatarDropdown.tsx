import React, { useCallback } from 'react';
import { Avatar, Menu, Spin, Modal } from 'antd';
import { history, useModel } from 'umi';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import { AuthService } from '@/services';
import { removeStore } from '@/utils/utils';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  // await outLogin();
  const { query = {}, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { centerBool, setCenterBool } = useModel('useCenterModal');

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      if (key === 'logout' && initialState) {
        Modal.confirm({
          title: '确定退出？',
          onOk: (close) => {
            setInitialState({ ...initialState, currentUser: undefined, platformId: undefined });
            loginOut();
            AuthService.signout().then((res: any) => {
              removeStore('userInfo');
              removeStore('platformId');
              removeStore('platformInfo');
            });
            close();
          },
        });
      }
      // 回到主平台
      if (key === 'homePage') {
        // 设置用户数据 access 可以监听
        setInitialState({
          ...initialState,
          platformId: undefined,
        });
        removeStore('platformId');
        setCenterBool(true);
        history.push(`/${key}`);
      }
    },
    [initialState, setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;
  if (!currentUser || !currentUser.userRole) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {currentUser.userRole === 'CenterAdmin' && (
        <Menu.Item key="homePage">
          <UserOutlined />
          超级账号
        </Menu.Item>
      )}
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> */}
        <span className={`${styles.name} anticon`}>{currentUser.mobile}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
