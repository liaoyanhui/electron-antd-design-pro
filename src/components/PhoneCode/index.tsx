/*
 * @Description: 验证码
 * @Author: 尚夏
 * @Date: 2021-10-21 14:32:28
 * @LastEditTime: 2021-11-09 13:47:38
 * @FilePath: /mining-admin-desktop/src/components/PhoneCode/index.tsx
 */
import React, { useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import styles from './index.less';
import { phoneEncryption } from '@/utils/utils';

const PhoneCode: React.FC<{
  visible: boolean;
  onOk: (c: string) => void;
  onCancel: () => void;
  mobile: string;
}> = (props) => {
  const [form] = Form.useForm();

  const { visible, onOk, onCancel, mobile } = props;

  const onCheck = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  const handleOk = async () => {
    const bool = await onCheck();
    if (bool) {
      onOk(form.getFieldValue('code'));
    }
  };

  return (
    <>
      <Modal
        title=""
        width={400}
        centered
        visible={visible}
        footer={[
          <Button key="sure" type="primary" onClick={handleOk}>
            确认
          </Button>,
        ]}
        wrapClassName={styles.modal}
        onOk={handleOk}
        onCancel={onCancel}
      >
        <div className={styles.code}>
          <span className={styles.label}>短信已发送到{phoneEncryption(mobile)}</span>
        </div>
        <Form name="phoneCodeForm" layout={'vertical'} form={form} initialValues={{}}>
          <Form.Item
            label="验证码"
            name="code"
            rules={[
              {
                required: true,
                transform: (value: string) => Number(value),
                type: 'number',
                message: '验证码不能为空',
              },
            ]}
          >
            <Input placeholder="验证码" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PhoneCode;
