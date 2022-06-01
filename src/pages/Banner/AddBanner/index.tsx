/*
 * @Description: 添加Banner
 * @Author: 尚夏
 * @Date: 2021-07-21 14:06:43
 * @LastEditTime: 2021-07-26 11:19:02
 * @FilePath: /mining-admin-desktop/src/pages/Banner/AddBanner/index.tsx
 */
import React, { useState, useEffect, createRef } from 'react';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Input, Button, Upload, Card, DatePicker, message } from 'antd';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import styles from '../index.less';


const formLayout: any = {
  labelCol: { offset: 2, span: 18 },
  wrapperCol: { offset: 2, span: 18 },
};

const { RangePicker } = DatePicker;

const AddBanner: React.FC = () => {
  const [form] = Form.useForm();

  const [zhUrl, setZhUrl] = useState<string>('');
  const [enUrl, setEhUrl] = useState<string>('');

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('Image must smaller than 2MB!');
    }
    // return isJpgOrPng && isLt1M;
    return false;
  };
  const handleChange = () => {};
  const otherBeforeUpload = () => {};
  const otherHandleChange = () => {};
  
  // 检验表单
  const onCheck = async () => {
    try {
      // const values = 
      await form.validateFields();
      return true
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      form.scrollToField(errorInfo.errorFields[0].name, {block: 'center'})
      return false
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
    if(bool) {
      console.log(111);
    }else {
      console.log(2222);
    }
  }

  // 取消
  const handleCancel = () => {
    history.goBack()
  }
  
  return (
      <PageContainer
          header={{
            breadcrumbRender: params => {
              return <CustomBreadcrumb params={params}/>
            },
            title: false
          }}>
          <Card style={{ padding: '24px 0'}}>
            <Form
              {...formLayout}
              name="addBanner"
              layout={'vertical'}
              form={form}
              // initialValues={{ layout: formLayout }}
            >
              <Form.Item label="主题" name="theme" rules={[
                {
                  required: true,
                  message: '主题不能为空',
                },
              ]}>
                <Input placeholder="请输入主题" />
              </Form.Item>
              <Form.Item label="图片-中文" name="imgZH" getValueProps={(value: any) => value} rules={[
                { 
                  required: true,
                  message: '请选择图片',
                }
              ]}>
                   <Upload
                    name="avatar"
                    listType="picture-card"
                    className={styles.uploader}
                    showUploadList={false}
                    action=""
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {zhUrl ? <img src={zhUrl} alt="avatar" style={{ width: '100%' }} /> : 
                      <div>
                        <div>添加</div>
                        <div className={styles.tip}>1005*330上传图片需小于1M</div>
                      </div>
                    }
                  </Upload>
              </Form.Item>
              <Form.Item label="图片-英文" name="imgEN" getValueProps={(value: any) => value}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className={styles.uploader}
                    showUploadList={false}
                    action=""
                    beforeUpload={otherBeforeUpload}
                    onChange={otherHandleChange}
                  >
                    {enUrl ? <img src={enUrl} alt="avatar" style={{ width: '100%' }} /> : 
                      <div>
                        <div>添加</div>
                        <div className={styles.tip}>1005*330上传图片需小于1M</div>
                      </div>
                    }
                  </Upload>
              </Form.Item>
              <Form.Item label="链接" name="url">
                <Input placeholder="请输入链接" />
              </Form.Item>
              <Form.Item label="起止时间" name="data">
                <RangePicker />
              </Form.Item>
              <Form.Item >
                <Button type="primary" onClick={handleSure}>确定</Button>
                <Button type="primary" style={{ margin: '0 16px' }} onClick={handleCancel}>取消</Button>
              </Form.Item>
            </Form>
          </Card>
      </PageContainer>
  )
}

export default AddBanner;