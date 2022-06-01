/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-10-09 15:17:16
 * @LastEditTime: 2021-10-09 15:17:16
 * @FilePath: /mining-admin-desktop/src/models/usePageInsideDrop.ts
 */
import { useState } from 'react';

export default function usePageInsideDrop() {
  const [pageInside, setPageInside] = useState<any>({});

  return {
    pageInside,
    setPageInside,
  };
}
