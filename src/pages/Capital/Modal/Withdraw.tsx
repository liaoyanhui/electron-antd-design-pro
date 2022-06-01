/*
 * @Description: 提现
 * @Author: 尚夏
 * @Date: 2021-09-09 15:39:57
 * @LastEditTime: 2021-09-09 15:55:20
 * @FilePath: /mining-admin-desktop/src/pages/Capital/Modal/withdraw.tsx
 */

import React, { useState } from 'react';
import { Modal, Form, Button, Input, message } from 'antd';
import styles from '../index.less';
// import {  } from '@/services';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const { TextArea } = Input;

const Withdraw: React.FC<{
  visible: boolean;
  setVisible: any;
}> = (props) => {
  const [form] = Form.useForm();
  const { visible, setVisible } = props;

  // 检验表单
  const onCheck = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  // 确定
  const handleOk = async () => {
    const bool = await onCheck();
    // if (bool) {
    // }
  };

  return (
    <Modal
      title={'提现'}
      width={500}
      centered
      visible={visible}
      // footer={[
      //   <Button key="submit" type="primary" onClick={handleOk}>
      //     确认
      //   </Button>,
      // ]}
      wrapClassName={styles.modal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...formLayout} name="paid" layout={'vertical'} form={form}>
        <Form.Item
          label="数量"
          name="amount"
          rules={[
            {
              required: true,
              message: '数量不能为空',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="地址"
          name="address"
          rules={[
            {
              required: true,
              message: '请输入地址',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="备注" name="internalComment">
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Withdraw;
