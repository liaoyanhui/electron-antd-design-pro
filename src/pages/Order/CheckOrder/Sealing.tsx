/*
 * @Description: 封装中数据
 * @Author: 尚夏
 * @Date: 2021-08-30 16:39:58
 * @LastEditTime: 2021-08-30 17:16:53
 * @FilePath: /mining-admin-desktop/src/pages/Order/CheckOrder/Sealing.tsx
 */

import React, { useEffect, useState } from 'react';
import { FilecoinService } from '@/services';
import styles from './index.less';

const Sealing: React.FC<{
  orderId: any;
}> = (props) => {
  const { orderId } = props;

  const [hashRate, setHashRate] = useState<any>({});

  useEffect(() => {
    if (orderId) {
      FilecoinService.getFilecoinStorageById({ orderId }).then((res: any) => {
        if (res) {
          setHashRate(res);
        }
      });
    }
  }, [orderId]);

  return (
    <>
      <ul>
        <li>
          <span>需封装</span>
          <span className={styles.hashRate_init}>{hashRate.storage}T</span>
        </li>
        <li>
          <span>未封装</span>
          <span className={styles.hashRate}>{hashRate.storage - hashRate.sealedStorage}T</span>
        </li>
        <li>
          <span>已封装</span>
          <span className={styles.hashRate}>{hashRate.sealedStorage}T</span>
        </li>
      </ul>
    </>
  );
};

export default Sealing;
