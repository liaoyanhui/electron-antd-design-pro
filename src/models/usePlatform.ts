/*
 * @Description: 平台信息
 * @Author: 尚夏
 * @Date: 2021-09-14 17:13:11
 * @LastEditTime: 2021-11-05 15:20:27
 * @FilePath: /mining-admin-desktop/src/models/usePlatform.ts
 */

import { useState } from 'react';

export default function usePlatform() {
  const [platform, setPlatform] = useState<any>(null);

  return {
    platform,
    setPlatform,
  };
}
