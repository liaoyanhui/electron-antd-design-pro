/*
 * @Description: 商品扣除
 * @Author: 尚夏
 * @Date: 2021-08-27 20:10:58
 * @LastEditTime: 2021-08-28 16:30:17
 * @FilePath: /mining-admin-desktop/src/pages/Settlement/tabComponent/Statements/Modal/ComDeduct.tsx
 */

import React from 'react';
import { Modal, Select, Input, Form, Button } from 'antd';
import styles from '../index.less';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const { Option } = Select;
const ComDeduct: React.FC<{
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
        name="ComDeduct"
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
        <Form.Item label="总扣除(FIL)" name="deduct">
          <Input placeholder="请输入总扣除FIL" />
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

export default ComDeduct;
