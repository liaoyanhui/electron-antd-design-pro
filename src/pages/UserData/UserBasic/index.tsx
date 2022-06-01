/*
 * @Description: 用户基本信息
 * @Author: 尚夏
 * @Date: 2021-08-02 13:43:39
 * @LastEditTime: 2021-09-06 14:43:26
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserBasic/index.tsx
 */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import InsideLayout from '@/components/InsideLayout';

const menuList = [
  { key: '/userData/userDetail/userBasic/basicSet', title: '基本设置' },
  // { key: '/userData/userDetail/userBasic/safetySet', title: '安全设置' },
];

const UserBasic: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const { children } = props;

  // 返回默认路由
  const returnDefaultRoute = () => {
    const pathName = history.location.pathname;
    const index = menuList.findIndex((i) => i.key === pathName);
    if (index >= 0) {
      return pathName;
    }
    return menuList[0].key;
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
      <InsideLayout children={children} menuList={menuList} defaultRoute={returnDefaultRoute()} />
    </PageContainer>
  );
};

export default UserBasic;
