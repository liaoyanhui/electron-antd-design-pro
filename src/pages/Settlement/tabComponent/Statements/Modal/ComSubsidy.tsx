/*
 * @Description: 商品补贴
 * @Author: 尚夏
 * @Date: 2021-08-28 15:24:53
 * @LastEditTime: 2021-08-28 16:30:21
 * @FilePath: /mining-admin-desktop/src/pages/Settlement/tabComponent/Statements/Modal/ComSubsidy.tsx
 */

import React from 'react';
import { Modal, Select, Input, Form, Button } from 'antd';
import styles from '../index.less';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const { Option } = Select;
const ComSubsidy: React.FC<{
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}> = (props) => {
  const [form] = Form.useForm();

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
        name="ComSubsidy"
        layout={'vertical'}
        form={form}
        initialValues={{ accountType: 1 }}
      >
        <Form.Item
          label="商品"
          name="commodity"
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
        >
          <Select>
            <Option value="IPFS">老司机</Option>
          </Select>
        </Form.Item>
        <Form.Item label="总补贴(FIL)" name="subsidy">
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

export default ComSubsidy;
