/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2022-02-16 13:58:11
 * @LastEditTime: 2022-02-17 10:50:43
 * @FilePath: /mining-admin-desktop/src/pages/ExpensesTransform/component/DeductModal.tsx
 */

import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import DebounceSelect from '@/components/DebounceSelect';
import styles from './index.less';
import { fileToEnd, transformFIL } from '@/utils/utils';

import { OwnerService } from '@/services';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const DeductModal: React.FC<{
  visible: boolean;
  handleOk: (data: any) => void;
  handleCancel: () => void;
}> = (props) => {
  const [form] = Form.useForm();
  const { visible, handleCancel, handleOk } = props;

  // 用户
  const [user, setUser] = useState<any>();
  const [userAvaiable, setUserAvaiable] = useState<any>(0);

  // 获取所有用户
  const getUser = (value: string) => {
    return OwnerService.getOwnerCustomerList({}).then((res: any) => {
      if (res) {
        const newArr = res.filter((i: any) => {
          return i.mobile.indexOf(value) > -1;
        });
        return newArr.map((item: any) => {
          return {
            label: item.mobile,
            value: item.Id,
          };
        });
      }
    });
  };

  const onCheck = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo: any) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  const onOk = async () => {
    const bool = await onCheck();
    if (bool) {
      if (form.getFieldValue('expensesAmount') - userAvaiable > 0) {
        message.warning('余额不足');
        return;
      }
      Modal.confirm({
        title: '确定扣费？',
        onOk: (close) => {
          handleOk({
            customerId: user.value,
            expensesType: 'deduct',
            expensesAmount: fileToEnd(form.getFieldValue('expensesAmount')),
            reason: form.getFieldValue('reason'),
            comment: form.getFieldValue('comment'),
          });
          close();
        },
      });
    }
  };

  const onCancel = () => {
    form.resetFields();
    handleCancel();
  };

  return (
    <div>
      <Modal
        title={'扣费'}
        width={500}
        centered
        visible={visible}
        footer={[
          <Button key="back" type="primary" onClick={onOk}>
            确认
          </Button>,
        ]}
        wrapClassName={styles.modal}
        // bodyStyle={{maxHeight: '600px', minHeight: '300px'}}
        onCancel={onCancel}
      >
        <Form
          {...formLayout}
          name="deduct"
          layout={'vertical'}
          form={form}
          initialValues={{ accountType: 1 }}
        >
          <Form.Item
            label="用户"
            name="mobile"
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          >
            <DebounceSelect
              // mode="multiple"
              value={user}
              placeholder="搜索用户"
              fetchOptions={getUser}
              onChange={(newValue) => {
                setUser(newValue);
                OwnerService.getCustomerAvaiable({ customerId: newValue.value }).then(
                  (res: any) => {
                    // console.log(res, 'ccc');
                    setUserAvaiable(transformFIL(res.avaiable));
                  },
                );
              }}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label={
              <div className={styles.numberLabel}>
                <span>数量</span>
                <div className={styles.avaiable}>
                  <span className={styles.title}>可用余额</span>
                  <span className={styles.number}>{userAvaiable}</span>
                </div>
              </div>
            }
            name="expensesAmount"
            rules={[
              {
                required: true,
                message: '数量不能为空',
              },
            ]}
          >
            <Input placeholder="请输入数量" type="number" />
          </Form.Item>
          <Form.Item
            label="原因"
            name="reason"
            rules={[
              {
                required: true,
                message: '原因不能为空',
              },
            ]}
          >
            <Input placeholder="请输入原因" />
          </Form.Item>
          <Form.Item label="备注" name="comment">
            <Input placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeductModal;
