/*
 * @Description: 单个用户数据
 * @Author: 尚夏
 * @Date: 2021-09-01 09:55:16
 * @LastEditTime: 2021-09-22 10:33:00
 * @FilePath: /mining-admin-desktop/src/models/useUser.ts
 */

import { useState } from 'react';

export default function useUser() {
  const [activeUser, setActiveUser] = useState<any>({});

  return {
    activeUser,
    setActiveUser,
  };
}
