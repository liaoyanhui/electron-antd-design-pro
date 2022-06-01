/*
 * @Description: 空投
 * @Author: 尚夏
 * @Date: 2021-07-20 13:39:40
 * @LastEditTime: 2021-07-30 14:31:32
 * @FilePath: /mining-admin-desktop/src/pages/AirDrop/index.tsx
 */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
// import styles from './index.less';

import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const AirDrop: React.FC = () => {

  return (
      <PageContainer
          header={{
            breadcrumbRender: params => {
              return <CustomBreadcrumb params={params}/>
            },
            title: false
          }}>
          <Card>
              <div>AirDrop</div>
          </Card>
      </PageContainer>
  )
}

export default AirDrop;