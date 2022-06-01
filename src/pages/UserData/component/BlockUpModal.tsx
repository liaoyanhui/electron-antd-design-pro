/*
 * @Description: 停用
 * @Author: 尚夏
 * @Date: 2022-05-26 09:47:00
 * @LastEditTime: 2022-05-26 17:42:31
 * @FilePath: /mining-admin-desktop/src/pages/UserData/component/BlockUpModal.tsx
 */

import React, { useState } from 'react';
import { Modal, Form, Button, Input, DatePicker } from 'antd';
import styles from '../index.less';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const BlockUpModal: React.FC<{
  visible?: boolean;
  customer: any;
  onCancel: () => void;
  onOk: any;
}> = (props) => {
  const [form] = Form.useForm();
  const { visible, onCancel, onOk, customer } = props;

  const handleOk = async () => {
    form.validateFields().then(() => {
      onOk(customer.Id);
      form.resetFields();
    });
  };

  return (
    <>
      <Modal
        title={null}
        width={500}
        centered
        visible={visible}
        footer={[
          <Button key="submit" type="primary" danger onClick={handleOk}>
            我已了解后果,确认停用
          </Button>,
        ]}
        wrapClassName={styles.modal}
        onOk={handleOk}
        onCancel={onCancel}
      >
        <Form {...formLayout} name="paid" layout={'vertical'} form={form}>
          <div style={{ marginBottom: 15 }}>
            输入用户手机号 <i style={{ color: 'red' }}>{customer?.mobile}</i>{' '}
            ,即刻停止用户所有订单及收益
          </div>
          <Form.Item
            // label="用户手机号"
            name="mobile"
            rules={[
              {
                required: true,
                // message: '用户手机号不能为空',
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('用户手机号不能为空!'));
                  }
                  if (value !== customer?.mobile) {
                    return Promise.reject(new Error('手机号输入错误!'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BlockUpModal;
