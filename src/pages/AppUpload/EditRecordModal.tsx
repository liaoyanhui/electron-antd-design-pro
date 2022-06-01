/*
 * @Description: 编辑
 * @Author: 尚夏
 * @Date: 2021-09-24 16:35:44
 * @LastEditTime: 2021-09-26 15:17:40
 * @FilePath: /mining-admin-desktop/src/pages/AppUpload/EditRecordModal.tsx
 */
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import styles from './index.less';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const { TextArea } = Input;
const EditRecordModal: React.FC<{
  visible?: boolean;
  onOk?: any;
  onCancel: () => void;
  record: any;
}> = (props) => {
  const [form] = Form.useForm();
  const { visible, onOk, onCancel, record } = props;

  const [currentPlatform, setCurrentPlatform] = useState<string>('');
  // platform 修改 选中为ios直接可以直接输入地址
  const handleChangeRaido = (e: any) => {
    setCurrentPlatform(e.target.value);
  };

  useEffect(() => {
    form.setFieldsValue({
      version: record.version,
      releaseNotes: record.releaseNotes,
      platform: record.platform,
    });
    if (record.platform === 'ios') {
      setCurrentPlatform('ios');
      form.setFieldsValue({
        downloadURL: record.downloadURL,
      });
    }
  }, [record]);

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

  // 编辑
  const handleOk = async () => {
    const bool = await onCheck();
    if (bool) {
      onOk({
        version: form.getFieldValue('version'),
        releaseNotes: form.getFieldValue('releaseNotes'),
        // releaseDay: moment(form.getFieldValue('releaseDay')).utc().format(),
        platform: form.getFieldValue('platform'),
        downloadURL: form.getFieldValue('downloadURL'),
      });
      handleCancel();
    }
  };

  return (
    <Modal
      title={'APP新版本'}
      width={500}
      centered
      visible={visible}
      // footer={null}
      onOk={handleOk}
      okText={'创建'}
      wrapClassName={styles.modal}
      // bodyStyle={{maxHeight: '600px', minHeight: '300px'}}
      onCancel={handleCancel}
    >
      <Form {...formLayout} name="addBanner" layout={'vertical'} form={form}>
        <Form.Item
          label="版本号"
          name="version"
          rules={[
            {
              required: true,
              message: '版本号不能为空',
            },
          ]}
        >
          <Input placeholder="请输入版本号码" />
        </Form.Item>
        <Form.Item
          label="更新内容"
          name="releaseNotes"
          rules={[
            {
              required: true,
              message: '内容不能为空',
            },
          ]}
        >
          <TextArea rows={4} placeholder="请输入更新内容" />
        </Form.Item>
        <Form.Item
          name="platform"
          label="平台"
          rules={[
            {
              required: true,
              message: '请选择平台',
            },
          ]}
        >
          <Radio.Group onChange={handleChangeRaido}>
            <Radio value="android">Android</Radio>
            <Radio value="ios">IOS</Radio>
          </Radio.Group>
        </Form.Item>
        {currentPlatform === 'ios' && (
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
        )}
      </Form>
    </Modal>
  );
};

export default EditRecordModal;
