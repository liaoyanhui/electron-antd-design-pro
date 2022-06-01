/*
 * @Description: 编辑质押 或者 gas消耗
 * @Author: 尚夏
 * @Date: 2021-12-03 15:09:06
 * @LastEditTime: 2021-12-03 15:24:19
 * @FilePath: /mining-admin-desktop/src/pages/Order/components/EditPledgeModal.tsx
 */

import React, { useState } from 'react';
import { Modal, Form, Button, Input, message } from 'antd';
import styles from '../index.less';
import { PaymentService } from '@/services';
import { fileToEnd } from '@/utils/utils';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const EditPledgeModal: React.FC<{
  id: number;
  visible: boolean;
  setVisible: any;
  fetchList: any;
}> = (props) => {
  const [form] = Form.useForm();
  const { id, visible, setVisible, fetchList } = props;

  // 检验表单
  const onCheck = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo: any) {
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
    if (bool) {
      PaymentService.editSealCostPayment({
        data: {
          id,
          amount: fileToEnd(form.getFieldValue('amount')),
        },
      }).then((res: any) => {
        if (res) {
          message.success('操作成功');
          handleCancel();
          fetchList();
        }
      });
    }
  };

  return (
    <Modal
      title={null}
      width={500}
      // centered
      visible={visible}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          确认
        </Button>,
      ]}
      wrapClassName={styles.modal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...formLayout} name="editAmount" layout={'vertical'} form={form}>
        <Form.Item
          label="数量(FIL)"
          name="amount"
          rules={[
            {
              required: true,
              message: '数量不能为空',
            },
          ]}
        >
          <Input suffix="FIL" type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPledgeModal;
