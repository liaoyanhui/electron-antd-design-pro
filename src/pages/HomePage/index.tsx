/*
 * @Description: 主页 通过access 来区分 是主平台CenterAdmin 还是分平台 PlatformAdmin
 * 如果center 并且 没有 platformid 展示 否则展示 分平台 样式
 * @Author: 尚夏
 * @Date: 2021-07-08 16:53:34
 * @LastEditTime: 2022-03-01 11:07:24
 * @FilePath: /mining-admin-desktop/src/pages/HomePage/index.tsx
 */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { history, useAccess, useModel } from 'umi';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';

import { OwnerService } from '@/services';
import SuperPlatform from './platform/SuperPlatform';
import CommonPlatform from './platform/CommonPlatform';

const HomePage: React.FC = () => {
  const { canOwnHomePage } = useAccess();
  const { centerBool, setCenterBool } = useModel('useCenterModal');

  const [platformList, setPlatformList] = useState<any>([]);
  useEffect(() => {
    // 展示主平台
    const show = canOwnHomePage();
    if (show) {
      OwnerService.getPlatformList().then((res: any) => {
        setCenterBool(true);
        setPlatformList(res);
      });
    } else {
      setCenterBool(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerBool]);

  return (
    <PageContainer
      header={{
        breadcrumbRender: (params) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      {centerBool ? <SuperPlatform platformList={platformList} /> : <CommonPlatform />}
    </PageContainer>
  );
};

export default HomePage;
