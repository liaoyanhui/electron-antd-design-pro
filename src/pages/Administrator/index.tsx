/*
 * @Description: 管理员
 * @Author: 尚夏
 * @Date: 2021-07-20 13:50:12
 * @LastEditTime: 2021-07-26 11:17:23
 * @FilePath: /mining-admin-desktop/src/pages/Administrator/index.tsx
 */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
// import styles from './index.less';

import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const Administrator: React.FC = () => {
  
  return (
      <PageContainer
        header={{
          breadcrumbRender: params => {
            return <CustomBreadcrumb params={params}/>
          },
          title: false
        }}>
          <Card>
              <div>Administrator</div>
          </Card>
      </PageContainer>
  )
}

export default Administrator;