/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-08-26 19:47:20
 * @LastEditTime: 2021-08-26 19:59:25
 * @FilePath: /mining-admin-desktop/src/components/ModalInfo/index.ts
 */

import { Modal } from 'antd';

interface ModalInfoProps {
  title?: string;
  handleOk?: () => void;
}

export default function ModalInfo(props: ModalInfoProps) {
  const { title, handleOk } = props;
  Modal.info({
    title,
    centered: true,
    maskClosable: true,
    okText: '确定',
    onOk(close) {
      if (handleOk) {
        handleOk();
      }
      close();
    },
  });
}
