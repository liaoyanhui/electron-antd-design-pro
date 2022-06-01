/*
 * @Description: 主页是否展示平台列表
 * @Author: 尚夏
 * @Date: 2021-08-13 14:01:44
 * @LastEditTime: 2022-01-13 10:44:45
 * @FilePath: /mining-admin-desktop/src/models/useCenterModal.ts
 */

import { useState } from 'react';

export default function useAuthModel() {
  const [centerBool, setCenterBool] = useState<boolean>(false);

  return {
    centerBool,
    setCenterBool,
  };
}
