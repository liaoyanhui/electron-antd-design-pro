/*
 * @Description:提现弹窗
 * @Author: 尚夏
 * @Date: 2021-10-21 11:30:56
 * @LastEditTime: 2022-03-03 17:08:15
 * @FilePath: /mining-admin-desktop/src/components/WithdrawnAmount/index.tsx
 */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import styles from './index.less';
import PhoneCode from '@/components/PhoneCode';
import { getStore } from '@/utils/utils';
import { AuthService } from '@/services';

const { Option } = Select;

const WithdrawnAmount: React.FC<{
  visible: boolean;
  onOk: (a: string, b: string, c: string) => void;
  onCancel: () => void;
  address: any;
  availableAmount: any;
}> = (props) => {
  const [form] = Form.useForm();
  const { visible, onOk, onCancel, address, availableAmount } = props;

  const [mobile, setMobile] = useState<string>('');

  useEffect(() => {
    const userInfo = getStore('userInfo');
    if (userInfo) {
      setMobile(JSON.parse(userInfo).mobile || '');
    }
  }, []);

  useEffect(() => {
    if (address) {
      // 设置地址
      form.setFieldsValue({
        address,
      });
    }
  }, [address]);

  const [realityAmount, setRealityAmount] = useState<any>('0.0000');
  // 监听提现amount 更新本次提现
  const handleChangeNumber = (e: any) => {
    if (e.target.value >= 1) {
      setRealityAmount(e.target.value - 0.01);
    } else {
      setRealityAmount('0.0000');
    }
  };

  // 最大
  const getMax = () => {
    form.setFieldsValue({
      amount: availableAmount,
    });
    setRealityAmount(availableAmount - 0.01);
  };

  // 验证码弹窗
  const [codeVisible, setCodeVisible] = useState<boolean>(false);

  const handleCodeCancel = () => {
    setCodeVisible(false);
  };

  //  手机验证码确认
  const handleCodeOk = (c: string) => {
    onOk(form.getFieldValue('amount'), 'sms', c);
    handleCodeCancel();
  };

  const onCheck = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  // 提现确定
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
        <div className={styles.withdrawn}>
          <span>本次提现</span>
          <span className={styles.amount}>{realityAmount}</span>
        </div>
        <Form name="withdrawnForm" layout={'vertical'} form={form} initialValues={{}}>
          <Form.Item label={<span className={styles.label}>提现地址</span>} name="address">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label={
              <div className={styles.form_label}>
                <span className={styles.label}>数量</span>
                <span className={styles.can_use}>可用：{availableAmount}</span>
              </div>
            }
            name="amount"
            rules={[
              () => ({
                required: true,

                // message: '数量不能为空',
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('数量不能为空!'));
                  }
                  if (value < 1) {
                    return Promise.reject(new Error('最少提现1个FIL!'));
                  }

                  if (value - availableAmount > 0) {
                    return Promise.reject(new Error('余额不足!'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              placeholder="请输入数量"
              onChange={handleChangeNumber}
              min={1}
              type="number"
              addonAfter={
                <div className={styles.max} onClick={getMax}>
                  MAX
                </div>
              }
            />
          </Form.Item>
        </Form>
        <div className={styles.form_label}>
          <span className={styles.label}>手续费</span>
          <span className={styles.label}>0.01</span>
        </div>
      </Modal>
      <PhoneCode
        visible={codeVisible}
        onOk={handleCodeOk}
        onCancel={handleCodeCancel}
        mobile={mobile}
      />
    </>
  );
};

export default WithdrawnAmount;
