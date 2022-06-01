/*
 * @Description: 商务点 用户
 * @Author: 尚夏
 * @Date: 2021-07-20 13:50:12
 * @LastEditTime: 2022-01-13 10:17:58
 * @FilePath: /mining-admin-desktop/src/pages/AgencyUser/index.tsx
 */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
// import styles from './index.less';

import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const AgencyUser: React.FC = () => {
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
        <div>AgencyUser</div>
      </Card>
    </PageContainer>
  );
};

export default AgencyUser;
