/*
 * @Description: 日志
 * @Author: 尚夏
 * @Date: 2021-07-20 13:39:40
 * @LastEditTime: 2021-08-13 14:58:24
 * @FilePath: /mining-admin-desktop/src/pages/Log/index.tsx
 */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
// import styles from './index.less';

import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const Log: React.FC = () => {
  return (
    <PageContainer
      header={{
        breadcrumbRender: (params) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      <Card>
        <div>Log</div>
      </Card>
    </PageContainer>
  );
};

export default Log;
