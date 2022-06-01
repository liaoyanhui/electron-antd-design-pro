/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-08-12 10:47:40
 * @LastEditTime: 2021-10-09 18:29:35
 * @FilePath: /mining-admin-desktop/src/app.tsx
 */
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
// import Footer from '@/components/Footer';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
// import { BookOutlined, LinkOutlined } from '@ant-design/icons';
// import type { RequestOptionsInit } from 'umi-request/types';
import { createRef } from 'react';
import { getStore, removeStore } from '@/utils/utils';

export const layoutActionRef: any = createRef<{ reload: () => void }>();

// const isDev = process.env.NODE_ENV === 'development';

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: any;
  fetchUserInfo?: () => any;
  platformId?: any;
}> {
  const fetchUserInfo = () => {
    const userInfo = getStore('userInfo');
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return undefined;
  };

  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = fetchUserInfo();
    const platformId = getStore('platformId');
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
      platformId,
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

/**
 * 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    // headerTheme: 'light', // 顶部主题
    disableMobile: true, // 禁用移动端
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        removeStore('userInfo');
        removeStore('platformId');
        history.push(loginPath);
      }
    },
    actionRef: layoutActionRef,
    menu: {
      locale: false,
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
