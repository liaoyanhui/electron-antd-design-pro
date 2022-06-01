/*
 * @Description: 卡片
 * @Author: 尚夏
 * @Date: 2021-10-20 09:23:00
 * @LastEditTime: 2022-02-17 14:25:49
 * @FilePath: /mining-admin-desktop/src/pages/HomePage/components/Card.tsx
 */
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { useAccess } from 'umi';
import WithdrawnAmount from '@/components/WithdrawnAmount';
import { message } from 'antd';
import { PlatformService } from '@/services';
import { fileToEnd } from '@/utils/utils';

const Card: React.FC<{
  data?: any;
  address?: any;
  changePlatformInfo?: any;
}> = (props) => {
  const { isCenterAdmin } = useAccess();

  const { data, address, changePlatformInfo } = props;
  const [visible, setVisible] = useState<boolean>(false);

  const onCancel = () => {
    setVisible(false);
  };

  const onOk = (a: string, b: string, c: string) => {
    PlatformService.widthdrawApply({
      data: {
        amount: fileToEnd(a),
        verificationChallengeMethod: b,
        verificationChallengeResponse: c,
      },
    }).then((res) => {
      if (res) {
        onCancel();
        if (changePlatformInfo) {
          changePlatformInfo();
        }
        message.success('操作成功！');
      }
    });
  };

  // 提现检查
  const withdrawnCheck = () => {
    if (address) {
      setVisible(true);
    } else {
      message.warning('请先去平台设置地址！');
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.card_context}>
          <div>
            <div className={styles.title}>{data.title1}</div>
            <div className={styles.number}>{data.number1}</div>
            <div className={styles.amount}>
              <div className={styles.sealed}>
                {data.sealedStorage >= 0 && <span>待封装 {data.sealedStorage}</span>}
              </div>
              <div className={styles.sealed}>
                {data.other_amount >= 0 && (
                  <span>
                    {data.other} {data.other_amount}
                  </span>
                )}
              </div>
              <div className={styles.available}>
                {data.availableAmount && <span>余额 {data.availableAmount}</span>}
                {!isCenterAdmin() && data.availableAmount && (
                  <span className={styles.withdraw} onClick={() => withdrawnCheck()}>
                    提现
                  </span>
                )}
              </div>
              <div className={styles.percent}>{data.percent1 && `周同比 ${data.percent1}`}</div>
            </div>
          </div>
          <div>
            <div className={styles.title}>{data.title2}</div>
            <div className={styles.number}>{data.number2}</div>
            <div className={styles.percent}>{data.percent2 && `周同比 ${data.percent2}`}</div>
          </div>
        </div>
        <div className={styles.card_bottom}>
          <div className={styles.left}>
            <div>
              <span className={styles.left_title}>{data.leftTitle}</span>
              <span>{data.leftNumber}</span>
            </div>
          </div>
          <div className={styles.right}>
            <div>
              <span className={styles.right_title}>{data.rightTitle}</span>
              <span>{data.rightNumber}</span>
            </div>
          </div>
        </div>
      </div>
      {data.availableAmount && (
        <WithdrawnAmount
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          address={address}
          availableAmount={data.availableAmount}
        />
      )}
    </>
  );
};

export default Card;
