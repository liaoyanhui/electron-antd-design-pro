/*
 * @Description: 修改地址
 * @Author: 尚夏
 * @Date: 2021-11-04 15:39:33
 * @LastEditTime: 2021-11-04 17:53:37
 * @FilePath: /mining-admin-desktop/src/pages/WithdrawAddress/components/changeAddress.tsx
 */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import styles from './index.less';

import PhoneCode from '@/components/PhoneCode';
import { AuthService, PlatformService } from '@/services';
import { getStore } from '@/utils/utils';

const ChangeAddress: React.FC<{
  visible: boolean;
  onOk: (address: string, method: string, code: string) => void;
  onCancel: () => void;
  address?: string | null;
}> = (props) => {
  const [form] = Form.useForm();

  const [mobile, setMobile] = useState<string>('');

  useEffect(() => {
    const userInfo = getStore('userInfo');
    if (userInfo) {
      setMobile(JSON.parse(userInfo).mobile || '');
    }
  }, []);

  // 手机验证码
  const [codeVisible, setCodeVisible] = useState<boolean>(false);

  const onCheck = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  const { visible, onOk, onCancel, address } = props;
  const handleOk = async () => {
    const bool = await onCheck();
    if (bool) {
      AuthService.sendVerificationCodeBySms({
        data: {
          mobile,
        },
      }).then((res) => {
        if (res) {
          setCodeVisible(true);
        }
      });
    }
  };

  const handleCodeCancel = () => {
    setCodeVisible(false);
  };

  /**
   * @description:  验证手机号码 确定 修改地址
   * @param {string} code
   * @return {*}
   */
  const handleCodeOk = (code: string) => {
    onOk(form.getFieldValue('address'), 'sms', code);
    handleCodeCancel();
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
        <Form
          name="addressForm"
          layout={'vertical'}
          form={form}
          initialValues={{
            address,
          }}
        >
          <Form.Item
            label="地址"
            name="address"
            rules={[
              {
                required: true,
                message: '地址不能为空',
              },
            ]}
          >
            <Input placeholder="地址" />
          </Form.Item>
        </Form>
        <PhoneCode
          visible={codeVisible}
          onOk={handleCodeOk}
          onCancel={handleCodeCancel}
          mobile={mobile}
        />
      </Modal>
    </>
  );
};

export default ChangeAddress;
