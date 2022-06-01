/*
 * @Description: 基本设置
 * @Author: 尚夏
 * @Date: 2021-07-20 13:50:12
 * @LastEditTime: 2021-10-21 10:07:31
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserBasic/BasicSet.tsx
 */
import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import styles from './index.less';
import { useModel } from 'umi';
import { CustomerService } from '@/services';

const formLayout: any = {
  labelCol: { offset: 0, span: 18 },
  wrapperCol: { offset: 0, span: 18 },
};

const BasicSet: React.FC = () => {
  const [form] = Form.useForm();

  // store
  const { activeUser, setActiveUser } = useModel('useUser');

  useEffect(() => {}, []);
  const onCheck = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  /**
   * @description: 确定
   * 确定前先检验表单
   * @param {*}
   * @return {*}
   */
  const handleSubmit = async () => {
    const bool = await onCheck();
    if (bool) {
      CustomerService.editCustomer(
        {
          id: activeUser.Id,
        },
        {
          data: {
            nickName: form.getFieldValue('nickName'),
            internalRemarksName: form.getFieldValue('internalRemarksName'),
          },
        },
      ).then((res: any) => {
        if (res) {
          message.success('操作成功');
        }
      });
    }
  };

  return (
    <div className={styles.basicSet}>
      <Form
        {...formLayout}
        name="addBanner"
        layout={'vertical'}
        form={form}
        initialValues={{
          phoneNumber: activeUser.mobile,
          nickName: activeUser.nickName,
          internalRemarksName: activeUser.internalRemarksName,
        }}
      >
        <Form.Item label="手机" name="phoneNumber">
          <Input placeholder="请输入邮箱" disabled />
        </Form.Item>
        <Form.Item label="昵称" name="nickName">
          <Input placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item label="内部备注名" name="internalRemarksName">
          <Input placeholder="请输入内部备注名" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BasicSet;
