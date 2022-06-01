/*
 * @Description: 自定义请求
 * @Author: 尚夏
 * @Date: 2021-08-23 19:48:24
 * @LastEditTime: 2022-02-10 10:44:53
 * @FilePath: /mining-admin-desktop/src/utils/request.ts
 */

import { notification, message } from 'antd';
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getStore, removeStore } from '@/utils/utils';
import { history } from 'umi';

const { NODE_ENV } = process.env;

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

const axiosData: {
  timeout: number;
  baseURL?: string;
} = {
  timeout: 30000 * 10 * 12,
  // timeout: 30000,
};

// 接口
if (NODE_ENV !== 'development') {
  if (API_URL) {
    axiosData.baseURL = API_URL;
  }
}

export const request = axiosStatic.create({
  ...axiosData,
});

request.interceptors.request.use(
  (config) => {
    // console.log(config, 'config');

    let getToken = '';

    if (getStore('userInfo')) {
      const userInfo = getStore('userInfo');
      getToken = JSON.parse(userInfo || '{}')?.token;
    }
    let authHeader: any = {
      'Content-Type': 'application/json',
    };

    if (getToken) {
      authHeader = {
        ...authHeader,
        Authorization: `Bearer ${getToken}`,
      };
    }
    return {
      ...config,
      headers: { ...authHeader },
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response: any) => {
    if (!response.data) {
      notification.error({
        description: '未知错误',
        message: '',
      });
      return null;
    }
    if (response.data.code) {
      if (response.data.code === 401) {
        message.warn('登录失效');
        removeStore('platformInfo');
        removeStore('userInfo');
        removeStore('platformId');
        history.push('/user/login');
        return null;
      }
      notification.error({
        description: response.data.message,
        message: '',
      });
      return null;
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
