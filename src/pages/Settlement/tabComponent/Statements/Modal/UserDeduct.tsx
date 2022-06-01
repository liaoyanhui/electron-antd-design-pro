/*
 * @Description: 用户扣除
 * @Author: 尚夏
 * @Date: 2021-08-28 15:25:15
 * @LastEditTime: 2021-08-28 16:30:12
 * @FilePath: /mining-admin-desktop/src/pages/Settlement/tabComponent/Statements/Modal/UserDeduct.tsx
 */

import React from 'react';
import { Modal, Select, Input, Form, Button } from 'antd';
import styles from '../index.less';
import DebounceSelect from '@/components/DebounceSelect';
import { CustomerService } from '@/services';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const { Option } = Select;
const UserDeduct: React.FC<{
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}> = (props) => {
  const [form] = Form.useForm();

  // 获取所有用户
  const getUser = (value: string) => {
    // eslint-disable-next-line consistent-return
    return CustomerService.getCustomerList().then((res: any) => {
      if (res) {
        const newArr = res.filter((i: any) => {
          return i.nickName.indexOf(value) > -1;
        });
        return newArr.map((item: any) => {
          return {
            label: item.nickName,
            value: item.Id,
          };
        });
      }
    });
  };

  const { visible, onOk, onCancel } = props;
  return (
    <Modal
      centered
      width={450}
      title={null}
      wrapClassName={styles.modal}
      visible={visible}
      footer={null}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        {...formLayout}
        name="UserDeduct"
        layout={'vertical'}
        form={form}
        initialValues={{ accountType: 1 }}
      >
        <Form.Item
          label="用户"
          name="user"
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
        >
          <DebounceSelect
            value={''}
            placeholder="Select users"
            fetchOptions={getUser}
            onChange={(newValue) => {
              console.log(newValue, '123');
              // setUser(newValue);
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="数量" name="number">
          <div>1</div>
        </Form.Item>
        <Form.Item label="总扣除(FIL)" name="subsidy">
          <Input placeholder="请输入总补贴FIL" />
        </Form.Item>
        <Form.Item>
          <div className={styles.btn}>
            <Button type="primary" onClick={onOk}>
              确定
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserDeduct;
