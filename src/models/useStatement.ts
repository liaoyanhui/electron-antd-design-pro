/*
 * @Description: 单条结算单数据
 * @Author: 尚夏
 * @Date: 2021-08-31 16:17:48
 * @LastEditTime: 2021-08-31 16:36:41
 * @FilePath: /mining-admin-desktop/src/models/useStatement.ts
 */

import { useState } from 'react';

export default function useStatement() {
  const [statement, setStatement] = useState<any>({});

  return {
    statement,
    setStatement,
  };
}
