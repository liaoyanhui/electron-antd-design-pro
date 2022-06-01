/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-09-22 17:18:40
 * @LastEditTime: 2021-09-24 17:41:23
 * @FilePath: /mining-admin-desktop/src/pages/AppUpload/UploadModal.tsx
 */
import React, { useRef, useState } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './index.less';
import { OwnerService } from '@/services';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const { TextArea } = Input;

const UploadModal: React.FC<{
  visible?: boolean;
  setVisible?: any;
  onOk?: any;
  onCancel: () => void;
}> = (props) => {
  const [form] = Form.useForm();
  const { visible, setVisible, onOk, onCancel } = props;

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

  // 取消
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  // 确定
  const handleOk = async () => {
    const bool = await onCheck();
    if (bool) {
      onOk({
        version: form.getFieldValue('version'),
        releaseNotes: form.getFieldValue('releaseNotes'),
        // releaseDay: moment(form.getFieldValue('releaseDay')).utc().format(),
        platform: form.getFieldValue('platform'),
        // downloadURL: form.getFieldValue('downloadURL'),
      });
      handleCancel();
    }
  };

  return (
    <Modal
      title={'ios地址'}
      width={500}
      centered
      visible={visible}
      // footer={null}
      onOk={handleOk}
      okText={'确定'}
      wrapClassName={styles.modal}
      onCancel={handleCancel}
    >
      <Form {...formLayout} name="addBanner" layout={'vertical'} form={form}>
        <Form.Item
          label="链接"
          name="downloadURL"
          rules={[
            {
              required: true,
              message: '链接不能为空',
            },
          ]}
        >
          <Input placeholder="请输入app链接" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadModal;
