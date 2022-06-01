/*
 * @Description: 编辑客服
 * @Author: 尚夏
 * @Date: 2021-07-23 16:39:18
 * @LastEditTime: 2021-07-23 17:28:19
 * @FilePath: /mining-admin-desktop/src/pages/Service/EditServiceModal.tsx
 */
import React, { useState } from 'react';
import { Modal, Form, Upload, message, Input, Button } from 'antd';
import styles from './index.less';
import type { ServiceModalProps } from './data';

const formLayout: any = {
  labelCol: {  span: 18 },
  wrapperCol: {  span: 18 },
};


const EditServiceModal = (props: ServiceModalProps) => {
  const { type, visible, handleCancel, handleOk } = props;

  const [form] = Form.useForm();

  const [code, setLogo] = useState<string>('');

  // 自定义上传图片
  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    // const isLt1M = file.size / 1024 / 1024 < 1;
    // if (!isLt1M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    return false;
  };

  // 上传进度改变函数
  const handleChange = () => {}

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
  const onOk = async () => {
    const bool = await onCheck();
    if(bool) {
      handleOk()
    }else {
      console.log(2222);
    }
  }


  return (
    <>
     <Modal
      title={type === 1 ? '编辑客服' : '新增客服'}
      width={600}
      centered
      visible={visible} 
      footer={[
        <Button key="back" type="primary" onClick={onOk}>
          确定
        </Button>,
        <Button key="submit" onClick={handleCancel}>
          取消
        </Button>
      ]}
      wrapClassName={styles.modal}
      onOk={onOk}
      onCancel={handleCancel}
    >
     <Form
        {...formLayout}
        name="service"
        layout={'vertical'}
        form={form}
        // initialValues={{ layout: formLayout }}
      >
        <Form.Item label="微信号" name="wx_number" rules={[
          {
            required: true,
            message: '微信号不能为空',
          },
        ]}>
          <Input placeholder="请输入微信号" />
        </Form.Item>
        <Form.Item label="微信二维码" name="wx_code" getValueProps={(value: any) => value} rules={[
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
              {code ? <img src={code} alt="avatar" style={{ width: '100%' }} /> : 
                <div>
                  <div>添加</div>
                </div>
              }
            </Upload>
        </Form.Item>
        <Form.Item label="手机号" name="phoneNumber" rules={[
          {
            required: true,
            message: '手机号不能为空',
          },
        ]}>
          <Input placeholder="请输入手机号" />
        </Form.Item>
      </Form>
    </Modal>
  </> 
  )
}

export default EditServiceModal;