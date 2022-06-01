/*
 * @Description: 商务点 订单
 * @Author: 尚夏
 * @Date: 2021-07-20 13:50:12
 * @LastEditTime: 2022-01-13 10:17:23
 * @FilePath: /mining-admin-desktop/src/pages/AgencyOrder/index.tsx
 */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
// import styles from './index.less';

import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const AgencyOrder: React.FC = () => {
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
        <div>AgencyOrder</div>
      </Card>
    </PageContainer>
  );
};

export default AgencyOrder;
