/*
 * @Description: 提现地址
 * @Author: 尚夏
 * @Date: 2021-11-04 15:03:15
 * @LastEditTime: 2021-11-05 10:53:23
 * @FilePath: /mining-admin-desktop/src/pages/WithdrawAddress/index.tsx
 */

import React, { useState, useEffect, useRef } from 'react';
import { message } from 'antd';
import { useAccess } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import styles from './index.less';
import { PlatformService } from '@/services';
import { getStore } from '@/utils/utils';

import ChangeAddress from './components/ChangeAddress';

const PlatformSet: React.FC = () => {
  const { isCenterAdmin } = useAccess();
  //  平台地址
  const [address, setAddress] = useState<string | null>(null);
  // 获取平台更多信息
  const getPlatformInfo = (id: string | number) => {
    PlatformService.getPlatformById({
      id,
    }).then((res: any) => {
      if (res) {
        setAddress(res.filecoinWithdrawAddress);
      }
    });
  };

  // 获取绑定地址
  useEffect(() => {
    const platformId = getStore('platformId');
    if (platformId) {
      getPlatformInfo(platformId);
    } else {
      const userInfo = JSON.parse(getStore('userInfo') || '{}');
      const user: any = userInfo;
      if (user.userRole === 'PlatformAdmin') {
        getPlatformInfo(user.platformIds[0]);
      }
    }
  }, []);

  const [visible, setVisible] = useState<boolean>(false);

  const onCancel = () => {
    setVisible(false);
  };

  const onOk = (a: string, m: string, c: string) => {
    PlatformService.bindWithdrawAddress({
      data: {
        address: a,
        verificationChallengeMethod: m,
        verificationChallengeResponse: c,
      },
    }).then((res) => {
      if (res) {
        message.success('操作成功！');
        setAddress(a);
        onCancel();
      }
    });
  };

  const handleEdit = () => {
    setVisible(true);
  };

  return (
    <PageContainer
      header={{
        breadcrumbRender: (params) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      <div className={styles.content}>
        <div className={styles.tab}>
          <ul className={styles.title_ul}>
            <li>提现地址</li>
          </ul>
          {address && (
            <ul className={styles.address_ul}>
              <li>{address}</li>
            </ul>
          )}
        </div>
        {!isCenterAdmin() && (
          <div className={styles.btn} onClick={handleEdit}>
            {address ? '编辑' : '添加'}
          </div>
        )}
      </div>
      <ChangeAddress visible={visible} onOk={onOk} onCancel={onCancel} address={address} />
    </PageContainer>
  );
};

export default PlatformSet;
