/*
 * @Description: 设置返佣比例
 * @Author: 尚夏
 * @Date: 2021-09-06 15:26:55
 * @LastEditTime: 2021-09-06 15:46:05
 * @FilePath: /mining-admin-desktop/src/pages/InviteCommission/Modal/SetCommissionRate.tsx
 */
import React, { useState } from 'react';
import { Modal, Form, Button, Input } from 'antd';
import styles from '../index.less';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const SetCommissionRate: React.FC<{
  visible?: boolean;
  onCancel: () => void;
  onOk: any;
  commissionRate: any;
}> = (props) => {
  const [form] = Form.useForm();
  const { visible, onCancel, onOk, commissionRate } = props;

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
    form.resetFields();
    onCancel();
  };

  const handleOk = async () => {
    const bool = await onCheck();
    if (bool) {
      onOk(form.getFieldValue('commissionRate'));
      handleCancel();
    }
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
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...formLayout} name="paid" layout={'vertical'} form={form}>
          <Form.Item
            label="返佣比例"
            name="commissionRate"
            rules={[
              {
                required: true,
                message: '返佣比例不能为空',
              },
            ]}
          >
            <Input placeholder={commissionRate && commissionRate / 10} type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SetCommissionRate;
