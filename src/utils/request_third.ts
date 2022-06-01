/*
 * @Description: 第三方请求接口方法
 * @Author: 尚夏
 * @Date: 2022-02-08 11:09:37
 * @LastEditTime: 2022-02-08 11:27:21
 * @FilePath: /mining-admin-desktop/src/utils/request_third.ts
 */

// import { notification, message } from 'antd';
import axiosStatic from 'axios';
// import { getStore, removeStore } from '@/utils/utils';
// import { history } from 'umi';

const axiosData: {
  timeout: number;
  baseURL?: string;
} = {
  timeout: 30000 * 10 * 12,
};

export const request_third = axiosStatic.create({
  ...axiosData,
});

request_third.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
