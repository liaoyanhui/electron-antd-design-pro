/*
 * @Description: 安全设置
 * @Author: 尚夏
 * @Date: 2021-07-20 13:50:12
 * @LastEditTime: 2021-09-01 10:27:48
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserBasic/SafetySet.tsx
 */
import React, { useEffect } from 'react';
// import { history } from 'umi';
import { Form, Input, Button } from 'antd';
import styles from './index.less';

const formLayout: any = {
  labelCol: { offset: 0, span: 18 },
  wrapperCol: { offset: 0, span: 18 },
};

const SafetySet: React.FC = () => {
  const [form] = Form.useForm();

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
      console.log(111);
    }
  };

  return (
    <div className={styles.basicSet}>
      <Form {...formLayout} name="addBanner" layout={'vertical'} form={form}>
        {/* <Form.Item label="谷歌验证" name="googleVerify">
          <div className={styles.field}>已启用</div>
        </Form.Item>
        <Form.Item label="实名认证" name="realName">
          <div className={styles.field}>已认证</div>
        </Form.Item> */}
        {/* <Form.Item
          label="提现地址"
          name="address"
          rules={[
            {
              required: true,
              message: '提现地址不能为空',
            },
          ]}
        >
          <Input placeholder="请输入提现地址" />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SafetySet;
