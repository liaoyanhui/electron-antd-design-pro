/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2022-05-26 11:36:48
 * @LastEditTime: 2022-05-26 17:42:21
 * @FilePath: /mining-admin-desktop/src/pages/UserData/component/ClearingFeeModal.tsx
 */

import React, { useState } from 'react';
import { Modal, Form, Button, Input } from 'antd';
import styles from '../index.less';
import { CustomerService } from '@/services';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const ClearingFeeModal: React.FC<{
  visible?: boolean;
  customer: any;
  onCancel: () => void;
  onOk: any;
}> = (props) => {
  const [form] = Form.useForm();
  const { visible, onCancel, onOk, customer } = props;

  const handleOk = async () => {
    form.validateFields().then(() => {
      onOk(customer.Id, form.getFieldValue('clearingFee'));
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
          <Button key="submit" type="primary" onClick={handleOk}>
            确认
          </Button>,
        ]}
        wrapClassName={styles.modal}
        onOk={handleOk}
        onCancel={onCancel}
      >
        <Form {...formLayout} name="paid" layout={'vertical'} form={form}>
          <Form.Item
            label="结算费用"
            name="clearingFee"
            rules={[
              {
                required: true,
                message: '结算费用不能为空',
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ClearingFeeModal;
