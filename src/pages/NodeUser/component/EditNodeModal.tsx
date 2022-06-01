/*
 * @Description: 编辑节点用户
 * @Author: 尚夏
 * @Date: 2022-01-06 10:17:29
 * @LastEditTime: 2022-02-16 15:15:23
 * @FilePath: /mining-admin-desktop/src/pages/NodeUser/component/EditNodeModal.tsx
 */

import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message, Select } from 'antd';
import styles from '../index.less';
// import { OwnerService } from '@/services';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const EditNodeModal: React.FC<{
  visible: boolean;
  handleOk: (data: any) => void;
  handleCancel: () => void;
  data: any;
}> = (props) => {
  const [form] = Form.useForm();
  const { visible, handleOk, handleCancel, data } = props;

  const onCheck = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo: any) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      nodeNo: data.nodeNo,
      nodeComment: data.nodeComment,
    });
  }, []);

  const onOK = async () => {
    const bool = await onCheck();
    if (bool) {
      handleOk({
        id: data.id,
        nodeNo: form.getFieldValue('nodeNo'),
        nodeComment: form.getFieldValue('nodeComment'),
        withdrawnAddress: data.withdrawnAddress,
      });
    }
  };

  return (
    <Modal
      title={'编辑'}
      width={500}
      centered
      visible={visible}
      footer={[
        <Button key="back" type="primary" onClick={onOK}>
          通过
        </Button>,
      ]}
      // onOk={handleOk}
      wrapClassName={styles.modal}
      // bodyStyle={{maxHeight: '600px', minHeight: '300px'}}
      onCancel={handleCancel}
    >
      <Form
        {...formLayout}
        name="addBanner"
        layout={'vertical'}
        form={form}
        initialValues={{ accountType: 1 }}
      >
        <Form.Item label="手机号" name="mobile">
          <span>{data.mobile}</span>
        </Form.Item>
        <Form.Item
          label="新节点"
          name="nodeNo"
          rules={[
            {
              required: true,
              message: '节点号不能为空',
            },
          ]}
        >
          <Input placeholder="请输入节点号" />
        </Form.Item>
        <Form.Item label="节点备注" name="nodeComment">
          <Input placeholder="请输入节点备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditNodeModal;
