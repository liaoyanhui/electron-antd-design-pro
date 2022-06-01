/* eslint-disable no-nested-ternary */
/*
 * @Description: 头部右侧
 * @Author: 尚夏
 * @Date: 2021-07-05 15:22:24
 * @LastEditTime: 2021-10-19 17:20:58
 * @FilePath: /mining-admin-desktop/src/components/RightContent/index.tsx
 */
import { Space } from 'antd';
import { QrcodeOutlined, StarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import QrCodeToImg from '@/components/QrCodeToImg';
import { getStore, setStore } from '@/utils/utils';
import { PlatformService } from '@/services';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  // 获取平台数据 如果没有platformId 隐藏二维码
  const [platform, setPlatform] = useState<any>({});
  // 是否在头部 展示更多平台信息
  const [showMore, setShowMore] = useState<boolean>(false);
  // 获取平台更多信息
  const getPlatformInfo = (id: string | number) => {
    PlatformService.getPlatformById({
      id,
    }).then((res: any) => {
      if (res) {
        setShowMore(true);
        setPlatform({ ...res });
        setStore('platformInfo', JSON.stringify(res));
      }
    });
  };

  useEffect(() => {
    const platformId = getStore('platformId');
    if (platformId) {
      getPlatformInfo(platformId);
    } else {
      const userInfo = JSON.parse(getStore('userInfo') || '{}');
      const user: any = userInfo;
      if (user.userRole === 'PlatformAdmin') {
        getPlatformInfo(user.platformIds[0]);
      } else {
        setShowMore(false);
      }
    }
  }, [getStore('platformId')]);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      {showMore && (
        <>
          <div className={styles.platform_name}>
            {platform.isDemoPlatform ? (
              <>
                {/* <Tooltip title="演示平台"> */}
                <StarOutlined style={{ color: '#fbae17', marginRight: 10 }} />
                {/* </Tooltip> */}
              </>
            ) : platform.isSelfOperated ? (
              <>
                {/* <Tooltip title="自营平台"> */}
                <StarOutlined style={{ color: '#1890ff', marginRight: 5 }} />
                <StarOutlined style={{ color: '#1890ff', marginRight: 5 }} />
                <StarOutlined style={{ color: '#1890ff', marginRight: 5 }} />
                <StarOutlined style={{ color: '#1890ff', marginRight: 5 }} />
                <StarOutlined style={{ color: '#1890ff', marginRight: 10 }} />
                {/* </Tooltip> */}
              </>
            ) : (
              <>
                {/* <Tooltip title="其他平台"> */}
                <StarOutlined style={{ color: '#ff0000', marginRight: 5 }} />
                <StarOutlined style={{ color: '#ff0000', marginRight: 5 }} />
                <StarOutlined style={{ color: '#ff0000', marginRight: 10 }} />
                {/* </Tooltip> */}
              </>
            )}
            {platform.name}
          </div>
          <div className={styles.code}>
            <QrcodeOutlined style={{ fontSize: 18 }} />
            <div className={styles.qrcode}>
              <div>
                {platform.appDownloadPageURL && (
                  <QrCodeToImg size={300} value={platform.appDownloadPageURL || ''} />
                )}
                <div className={styles.app_down}>{platform.name || ''}</div>
                <div className={styles.app_down}>APP 分享二维码</div>
              </div>
            </div>
          </div>
        </>
      )}
      <Avatar />
      {/* <SelectLang className={styles.action} /> */}
    </Space>
  );
};
export default GlobalHeaderRight;
