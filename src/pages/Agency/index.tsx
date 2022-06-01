/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-28 09:40:04
 * @LastEditTime: 2021-09-17 16:19:02
 * @FilePath: /mining-admin-desktop/src/pages/Agency/index.tsx
 */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { Card, Button } from 'antd';
// import styles from './index.less';
// import { history } from 'umi';

const Agency: React.FC = () => {
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
        <div>Agency</div>
      </Card>
    </PageContainer>
  );
};

export default Agency;
