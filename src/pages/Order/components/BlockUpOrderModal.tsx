/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2022-05-27 09:41:48
 * @LastEditTime: 2022-05-27 10:11:01
 * @FilePath: /mining-admin-desktop/src/pages/Order/components/BlockUpOrderModal.tsx
 */

import React, { useState } from 'react';
import { Modal, Form, Button, Input } from 'antd';
import styles from '../index.less';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const BlockUpOrderModal: React.FC<{
  visible?: boolean;
  order: any;
  onCancel: () => void;
  onOk: any;
}> = (props) => {
  const [form] = Form.useForm();
  const { visible, onCancel, onOk, order } = props;
  // console.log(order.hostingDays - order.runningDays, 'xxxx');
  const handleOk = async () => {
    form.validateFields().then(() => {
      onOk(order.Id, form.getFieldValue('days'));
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
        wrapClassName={styles.modal_block}
        onOk={handleOk}
        onCancel={onCancel}
      >
        <Form {...formLayout} name="paid" layout={'vertical'} form={form}>
          <div style={{ marginBottom: 15 }}>
            输入订单号 <i style={{ color: 'red' }}>{order?.orderNo}</i> ,即刻停止该订单收益
          </div>
          <Form.Item
            name="orderNo"
            rules={[
              {
                required: true,
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('订单号不能为空!'));
                  }
                  if (value !== order?.orderNo) {
                    return Promise.reject(new Error('订单号输入错误!'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="请输入订单号" />
          </Form.Item>
          <Form.Item
            // {order.hostingDays - order.runningDays}
            label={<span>再运行几天后结束(还可运行{order.hostingDays - order.runningDays}天)</span>}
            name="days"
            rules={[
              {
                required: true,
                transform: (value: string) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
              {
                validator(_, value) {
                  // if (!value) {
                  //   return Promise.reject(new Error('订单号不能为空!'));
                  // }
                  if (value > order.hostingDays - order.runningDays) {
                    return Promise.reject(new Error('运行天数必须小于可运行天数!'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input suffix="天" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BlockUpOrderModal;
