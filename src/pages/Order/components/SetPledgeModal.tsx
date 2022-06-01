/*
 * @Description: 设置质押FIL 包括Gas消耗
 * @Author: 尚夏
 * @Date: 2021-09-17 10:11:28
 * @LastEditTime: 2021-09-26 14:02:52
 * @FilePath: /mining-admin-desktop/src/pages/Order/components/SetPledgeModal.tsx
 */

import React, { useState } from 'react';
import { Modal, Form, Button, Input, DatePicker, message } from 'antd';
import styles from '../index.less';
// import moment from 'moment';
// import { bankList } from '@/utils/bank';
import { OrderService } from '@/services';
import { fileToEnd, transformFIL } from '@/utils/utils';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const SetPledgeModal: React.FC<Order.SetPledgeModal> = (props) => {
  const [form] = Form.useForm();
  const { visible, orderId, onOk, onCancel, estimate } = props;

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
    form.resetFields();
    onCancel();
  };

  // 确定
  const handleOk = async () => {
    const bool = await onCheck();
    if (bool) {
      OrderService.editOrderSealCostRequired(orderId, {
        pledgeAmount: fileToEnd(form.getFieldValue('pledgeAmount')),
        gasAmount: fileToEnd(form.getFieldValue('gasAmount')),
      }).then((res: any) => {
        if (res) {
          message.success('操作成功');
          form.resetFields();
          onOk();
        }
      });
    }
  };

  return (
    <Modal
      title={'设置质押'}
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
      onCancel={handleCancel}
    >
      <Form {...formLayout} name="paid" layout={'vertical'} form={form}>
        <div className={styles.body_padding}>
          <ul>
            <li className={styles.estimate}>
              <div>预估值</div>
              <div className={styles.label}>{transformFIL(estimate.estimatePledgeAmount, 4)}</div>
            </li>
          </ul>
        </div>
        <Form.Item
          label="实际需要的质押(FIL)"
          name="pledgeAmount"
          rules={[
            {
              required: true,
              message: '不能为空',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <div className={styles.body_padding}>
          <ul>
            <li className={styles.estimate}>
              <div>预估值</div>
              <div className={styles.label}>{transformFIL(estimate.estimateGasAmount, 4)}</div>
            </li>
          </ul>
        </div>
        <Form.Item
          label="实际需要的Gas消耗(FIL)"
          name="gasAmount"
          rules={[
            {
              required: true,
              message: '不能为空',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SetPledgeModal;
