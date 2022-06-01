/*
 * @Description: 
 * @Author: 尚夏
 * @Date: 2021-07-05 15:22:24
 * @LastEditTime: 2021-07-29 10:43:37
 * @FilePath: /mining-admin-desktop/src/services/ant-design-pro/login.ts
 */
// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
