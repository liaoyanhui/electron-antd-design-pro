/*
 * @Description: 
 * @Author: 尚夏
 * @Date: 2021-07-30 14:58:14
 * @LastEditTime: 2021-07-30 16:43:22
 * @FilePath: /mining-admin-desktop/src/pages/AgencySet/AgencyMenu/index.tsx
 */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import InsideLayout from '@/components/InsideLayout';
import { history } from 'umi';

const menuList = [
  {key: '/agencySet/agencyMenu/setting', title: '设置'},
  {key: '/agencySet/agencyMenu/inviteRelation', title: '邀请关系'},
]

const AgencyMenu: React.FC<{
  children: React.ReactNode
}> = (props) => {
  const { children } = props;

  // 返回默认路由
  const returnDefaultRoute = () => {
    const pathName = history.location.pathname;
    const index = menuList.findIndex(i => i.key === pathName );
    if(index > 0) {
      return pathName
    }
    return menuList[0].key
  }

  return (
      <PageContainer
          header={{
            breadcrumbRender: params => {
              return <CustomBreadcrumb params={params}/>
            },
            title: false
          }}>
          <InsideLayout 
            children={children}
            menuList={menuList}
            defaultRoute={returnDefaultRoute()}
          />
      </PageContainer>
  )
}

export default AgencyMenu;