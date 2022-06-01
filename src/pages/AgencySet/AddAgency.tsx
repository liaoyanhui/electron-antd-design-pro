/*
 * @Description: 新增商务
 * @Author: 尚夏
 * @Date: 2021-07-20 13:50:12
 * @LastEditTime: 2022-01-13 10:17:27
 * @FilePath: /mining-admin-desktop/src/pages/AgencySet/AddAgency.tsx
 */
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Input, Button, Upload, Card, message, Select } from 'antd';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import styles from './index.less';

const formLayout: any = {
  labelCol: { offset: 1, span: 18 },
  wrapperCol: { offset: 1, span: 18 },
};

const { TextArea } = Input;
const { Option } = Select;

const PlatformSet: React.FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {}, []);
  const onCheck = async () => {
    try {
      // const values =
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
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
  const handleSure = async () => {
    const bool = await onCheck();
    if (bool) {
      console.log(111);
    } else {
      console.log(2222);
    }
  };

  // 取消
  const handleCancel = () => {
    history.push('/agencySet');
  };

  return (
    <PageContainer
      header={{
        breadcrumbRender: (params) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      <Card style={{ padding: '24px 0', height: '100%' }}>
        <Form
          {...formLayout}
          name="addBanner"
          layout={'vertical'}
          form={form}
          // initialValues={{ layout: formLayout }}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[
              {
                required: true,
                message: '名称不能为空',
              },
            ]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="联系方式" name="contactWay">
            <Input placeholder="请输入联系方式" />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <TextArea rows={4} placeholder="请输入备注" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSure}>
              确定
            </Button>
            <Button type="primary" style={{ margin: '0 16px' }} onClick={handleCancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default PlatformSet;
