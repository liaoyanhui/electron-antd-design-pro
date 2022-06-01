/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-09-01 10:48:33
 * @LastEditTime: 2021-09-01 10:53:38
 * @FilePath: /mining-admin-desktop/src/components/Copy/index.tsx
 */

import React from 'react';
import { message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Copy: React.FC<{
  text?: any;
}> = (props) => {
  const { text } = props;
  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        message.success('复制成功');
      }}
    >
      <CopyOutlined style={{ color: '#1890ff', marginLeft: 5 }} />
    </CopyToClipboard>
  );
};

export default Copy;
