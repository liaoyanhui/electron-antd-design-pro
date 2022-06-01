/*
 * @Description: 添加质押记录弹窗 包括gas pledge
 * @Author: 尚夏
 * @Date: 2021-08-12 14:40:38
 * @LastEditTime: 2021-09-17 10:33:18
 * @FilePath: /mining-admin-desktop/src/pages/Order/components/AddPledgeModal.tsx
 */
import React, { useState } from 'react';
import { Modal, Form, Button, Input, DatePicker, message } from 'antd';
import styles from '../index.less';
// import moment from 'moment';
// import { bankList } from '@/utils/bank';
import { PaymentService, OrderService } from '@/services';
import { fileToEnd } from '@/utils/utils';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const { TextArea } = Input;

const AddPledgeModal: React.FC<Order.AddPledgeModal> = (props) => {
  const [form] = Form.useForm();
  const { visible, setVisible, orderId, fetchList, type } = props;

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

  // 关闭弹窗
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  // 确定
  const handleOk = async () => {
    const bool = await onCheck();
    if (bool) {
      OrderService.createFilecoinSealCostPayment({
        data: {
          orderId,
          type,
          amount: fileToEnd(form.getFieldValue('amount')),
          messageId: form.getFieldValue('messageId'),
          toAddress: form.getFieldValue('toAddress'),
          // paidAt: moment(form.getFieldValue('paidAt')).utc().format(),
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
          label="数量(FIL)"
          name="amount"
          rules={[
            {
              required: true,
              message: '金额不能为空',
            },
          ]}
        >
          <Input suffix="FIL" type="number" />
        </Form.Item>
        <Form.Item
          label="MessageID"
          name="messageId"
          rules={[
            {
              required: true,
              message: '输入messageId',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="支付地址"
          name="toAddress"
          rules={[
            {
              required: true,
              message: '输入支付地址',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="到账时间"
          name="paidAt"
          rules={[
            {
              required: true,
              message: '请选择到账时间',
            },
          ]}
        >
          <DatePicker showTime />
        </Form.Item> */}
        <Form.Item label="备注" name="internalComment">
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPledgeModal;
