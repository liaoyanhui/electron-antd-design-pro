/*
 * @Description: 绑定用户
 * @Author: 尚夏
 * @Date: 2021-09-02 16:46:01
 * @LastEditTime: 2021-09-22 19:34:38
 * @FilePath: /mining-admin-desktop/src/pages/UserData/component/BindModal.tsx
 */

import React, { useState } from 'react';
import { Modal, Form, Button } from 'antd';
import styles from '../index.less';
import DebounceSelect from '@/components/DebounceSelect';
import { CustomerService } from '@/services';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const BindModal: React.FC<{
  visible?: boolean;
  onCancel: () => void;
  onOk: any;
}> = (props) => {
  const [form] = Form.useForm();
  const { visible, onCancel, onOk } = props;

  const [user, setUser] = useState<any>();

  // 获取所有用户
  const getUser = (value: string): any => {
    return CustomerService.getCustomerList().then((res: any) => {
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
    } catch (errorInfo) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  const handleOk = async () => {
    const bool = await onCheck();
    if (bool) {
      form.resetFields();
      onOk(user.value);
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
        onOk={handleOk}
        onCancel={onCancel}
      >
        <Form {...formLayout} name="paid" layout={'vertical'} form={form}>
          <Form.Item
            label="邀请人"
            name="invite"
            rules={[
              {
                required: true,
                message: '邀请人不能为空',
              },
            ]}
          >
            <DebounceSelect
              value={user}
              placeholder="搜索邀请人"
              fetchOptions={getUser}
              onChange={(newValue) => {
                setUser(newValue);
              }}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BindModal;
