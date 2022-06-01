/*
 * @Description: 数字货币明细
 * @Author: 尚夏
 * @Date: 2021-08-12 13:43:28
 * @LastEditTime: 2021-09-01 10:19:18
 * @FilePath: /mining-admin-desktop/src/pages/Order/components/AddCryptoModal.tsx
 */
import React, { useState } from 'react';
import { Modal, Form, Button, Input, Select, message } from 'antd';
import styles from '../index.less';
import { PaymentService } from '@/services';
import { fileToEnd } from '@/utils/utils';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const { TextArea } = Input;
const { Option } = Select;

const AddCryptoModal: React.FC<Order.AddCryptoModal> = (props) => {
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
      PaymentService.createOrderCryptoPayment({
        data: {
          orderId: String(orderId),
          amount: fileToEnd(form.getFieldValue('amount')),
          txOrMessageId: form.getFieldValue('txOrMessageId'),
          currency: form.getFieldValue('currencyCode'),
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
          label="币种"
          name="currencyCode"
          rules={[
            {
              required: true,
              message: '请选择币种',
            },
          ]}
        >
          <Select>
            <Option value="USDT">USDT</Option>
            <Option value="BTC">BTC</Option>
          </Select>
        </Form.Item>
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
          label="交易ID"
          name="txOrMessageId"
          rules={[
            {
              required: true,
              message: '输入交易ID',
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

export default AddCryptoModal;
