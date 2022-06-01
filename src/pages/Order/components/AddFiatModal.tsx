/*
 * @Description: 添加法币记录
 * @Author: 尚夏
 * @Date: 2021-08-12 11:22:36
 * @LastEditTime: 2021-12-03 15:14:09
 * @FilePath: /mining-admin-desktop/src/pages/Order/components/AddFiatModal.tsx
 */

import React, { useState } from 'react';
import { Modal, Form, Button, Input, AutoComplete, message } from 'antd';
import styles from '../index.less';
import { bankList } from '@/utils/bank';
import { PaymentService } from '@/services';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const { TextArea } = Input;

const AddFiatModal: React.FC<Order.AddFiatModal> = (props) => {
  const [form] = Form.useForm();
  const { visible, setVisible, orderId, fetchList } = props;

  // 检验表单
  const onCheck = async () => {
    try {
      // const values =
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
    if (bool) {
      PaymentService.createOrderFiatPayment({
        data: {
          orderId,
          bankName: form.getFieldValue('bankName'),
          bankStatementNo: form.getFieldValue('bankStatementNo'),
          amount: Number(form.getFieldValue('amount') * 100),
          comment: form.getFieldValue('internalComment'),
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
      <Form {...formLayout} name="paid" layout={'vertical'} form={form}>
        <Form.Item
          label="汇款金额"
          name="amount"
          rules={[
            {
              required: true,
              message: '金额不能为空',
            },
          ]}
        >
          <Input suffix="CNY" type="number" />
        </Form.Item>
        <Form.Item
          label="汇款银行"
          name="bankName"
          rules={[
            {
              required: true,
              message: '输入银行名称',
            },
          ]}
        >
          <AutoComplete options={bankList} placeholder="选择或填写" />
        </Form.Item>
        <Form.Item
          label="汇款单号"
          name="bankStatementNo"
          rules={[
            {
              required: true,
              message: '输入银行汇款单号',
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

export default AddFiatModal;
