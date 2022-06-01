/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-05 15:22:24
 * @LastEditTime: 2021-08-13 14:41:15
 * @FilePath: /mining-admin-desktop/src/pages/404.tsx
 */
import React from 'react';
import { Button, Result } from 'antd';
import { history } from 'umi';

const NoFoundPage: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          回到主页
        </Button>
      }
    />
  );
};

export default NoFoundPage;
