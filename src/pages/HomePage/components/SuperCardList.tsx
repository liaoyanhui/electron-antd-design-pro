/*
 * @Description: 超级平台卡片数据
 * @Author: 尚夏
 * @Date: 2021-11-25 10:23:09
 * @LastEditTime: 2022-04-07 16:17:10
 * @FilePath: /mining-admin-desktop/src/pages/HomePage/components/SuperCardList.tsx
 */

import React, { useEffect, useState } from 'react';
import Card from './Card';
import styles from './index.less';
import { OwnerService } from '@/services';
import { transformFIL, tToP } from '@/utils/utils';
import { getStore } from '@/utils/utils';
import BigNumber from 'bignumber.js';

const SuperCardList: React.FC = () => {
  const [data, setData] = useState<any>({
    customerStatitics: {},
    platformStatitics: {},
    referrerStatitics: {},
    ownerStatitics: {},
  });

  const changePlatformInfo = () => {
    OwnerService.getOwnerPlatformFileCoinStatitics().then((res: any) => {
      if (res) {
        setData({
          customerStatitics: res.customerStatitics,
          platformStatitics: res.platformStatitics,
          referrerStatitics: res.referrerStatitics,
          ownerStatitics: res.ownerStatitics,
        });
      }
    });
  };

  useEffect(() => {
    // 平台数据
    changePlatformInfo();
  }, []);

  //  平台地址
  // const [address, setAddress] = useState<string | null>(null);
  // 获取平台更多信息 设置地址
  // const getPlatformInfo = (id: string | number) => {
  //   PlatformService.getPlatformById({
  //     id,
  //   }).then((res: any) => {
  //     if (res) {
  //       setAddress(res.filecoinWithdrawAddress);
  //     }
  //   });
  // };

  // // 获取绑定地址
  // useEffect(() => {
  //   const platformId = getStore('platformId');
  //   if (platformId) {
  //     getPlatformInfo(platformId);
  //   } else {
  //     const userInfo = JSON.parse(getStore('userInfo') || '{}');
  //     const user: any = userInfo;
  //     if (user.userRole === 'PlatformAdmin') {
  //       getPlatformInfo(user.platformIds[0]);
  //     }
  //   }
  // }, []);

  return (
    <>
      <div className={styles.header}>
        <Card
          data={{
            title1: '存储(TiB)',
            number1: data.platformStatitics.sealedStorage,
            // percent1: '10%',
            title2: '总收益(有效存储)',
            number2: transformFIL(
              data.customerStatitics.settledAmount +
                data.referrerStatitics.settledAmount +
                data.platformStatitics.settledAmount +
                data.platformStatitics.vestingAmount +
                data.referrerStatitics.vestingAmount +
                data.customerStatitics.vestingAmount,
              4,
            ),
            sealedStorage:
              data.platformStatitics.storage &&
              data.platformStatitics.storage - data.platformStatitics.sealedStorage,
            // percent2: '',
            // leftTitle: '',
            // leftNumber: '',
            // rightTitle: '日均',
            // rightNumber: '1,234.0000',
          }}
        />
        {/* 'productFeeAmount', 0,
        'platformFeeAmount', 0,
        'referrerFeeAmount',0)); */}
        <Card
          data={{
            title1: '技术费',
            number1: transformFIL(
              data.ownerStatitics.productFeeAmount -
                data.ownerStatitics.platformFeeAmount -
                data.ownerStatitics.referrerFeeAmount,
              4,
            ),
            // percent1: '10%',
            title2: '用户',
            number2: data.customerStatitics.customerCount,
            // percent2: '',
            // leftTitle: '',
            // leftNumber: '',
            // rightTitle: '',
            // rightNumber: '',
          }}
        />
        <Card
          data={{
            title1: '订单',
            // number1: '1037',
            // percent1: '10%',
            title2: '总销售额(¥)',
            // number2: '7000000',
            // percent2: '20%',
            // leftTitle: '',
            // leftNumber: '',
            // rightTitle: '上周',
            // rightNumber: '1,234,2000',
          }}
        />
        <Card
          data={{
            title1: '总质押(FIL)',
            number1: transformFIL(data.platformStatitics.sealPledgeAmount, '0'),
            // percent1: '10%',
            title2: '封装Gas消耗(FIL)',
            number2: transformFIL(data.platformStatitics.sealGasFeeAmount, '0'),
            // percent2: '20%',
            // leftTitle: '',
            // leftNumber: '',
            // rightTitle: '',
            // rightNumber: '',
          }}
        />
      </div>
      <div className={styles.header}>
        <Card
          data={{
            title1: '已发放(总)',
            number1: transformFIL(
              data.customerStatitics.settledAmount +
                data.referrerStatitics.settledAmount +
                data.platformStatitics.settledAmount,
              4,
            ),
            // percent1: '',
            title2: '锁仓(总)',
            number2: transformFIL(
              data.customerStatitics.vestingAmount +
                data.referrerStatitics.vestingAmount +
                data.platformStatitics.vestingAmount,
              4,
            ),
            // percent2: '',
            // leftTitle: '昨日发放',
            // leftNumber: '1234000',
            // rightTitle: '',
            // rightNumber: '',
          }}
        />
        <Card
          data={{
            title1: '用户收益(FIL)',
            number1: transformFIL(
              data.customerStatitics.settledAmount -
                data.customerStatitics.deductAmount +
                data.customerStatitics.subsidyAmount,
              4,
            ),
            // percent1: '10%',
            title2: '锁仓(FIL)',
            number2: transformFIL(data.customerStatitics.vestingAmount, 4),
            availableAmount: transformFIL(data.customerStatitics.availableAmount, 4),
            // percent2: '',
            // leftTitle: '昨日发放',
            // leftNumber: '1234000',
            // rightTitle: '',
            // rightNumber: '',
          }}
        />
        <Card
          data={{
            title1: '商务收益(FIL)',
            number1: transformFIL(data.referrerStatitics.settledAmount, 4),
            // percent1: '10%',
            title2: '锁仓(FIL)',
            number2: transformFIL(data.referrerStatitics.vestingAmount, 4),
            // percent2: '',
            // leftTitle: '昨日发放',
            // leftNumber: '1234000',
            // rightTitle: '',
            // rightNumber: '',
          }}
        />
        <Card
          data={{
            title1: '平台收益(FIL)',
            number1: transformFIL(data.platformStatitics.settledAmount, 4),
            // percent1: '10%',
            title2: '锁仓(FIL)',
            number2: transformFIL(data.platformStatitics.vestingAmount, 4),
            // percent2: '',
            other: '补扣',
            other_amount: transformFIL(
              data.customerStatitics.deductAmount - data.customerStatitics.subsidyAmount,
              4,
            ),
            // leftNumber: '1234000',
            // rightTitle: '',
            // rightNumber: '',
          }}
          // address={address}
          // changePlatformInfo={changePlatformInfo}
        />
      </div>
    </>
  );
};

export default SuperCardList;
