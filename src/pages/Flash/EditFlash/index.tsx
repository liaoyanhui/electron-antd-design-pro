/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-21 14:06:43
 * @LastEditTime: 2021-11-22 16:28:34
 * @FilePath: /mining-admin-desktop/src/pages/Flash/EditFlash/index.tsx
 */
import React, { useState, useEffect, createRef, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Input, Button, message, Card, Radio } from 'antd';
// import WangEditor from '@/components/WangEditor';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { history, connect } from 'umi';
import type { Dispatch } from 'umi';
import styles from './index.less';
import { FlashService } from '@/services';

const formLayout: any = {
  labelCol: { offset: 2, span: 20 },
  wrapperCol: { offset: 2, span: 20 },
};

const { TextArea } = Input;

const EditFlash: React.FC<{
  dispatch: Dispatch;
  activeFlash: any;
}> = (props) => {
  const { dispatch, activeFlash } = props;

  const [form] = Form.useForm();

  // 能容填入
  useEffect(() => {
    form.setFieldsValue({
      content: activeFlash.content,
      title: activeFlash.title,
      displayPopup: activeFlash.displayPopup ? 1 : 2,
    });
  }, []);

  // 检验表单
  const onCheck = async () => {
    try {
      // const values =
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      // console.log('Failed:', errorInfo);
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  /**
   * @description: 修改公告
   * 修改公告前先检验表单
   * @param {*}
   * @return {*}
   */
  const handleSave = async () => {
    const bool = await onCheck();
    if (bool) {
      FlashService.editFlash(
        { id: activeFlash.Id },
        {
          data: {
            title: form.getFieldValue('title'),
            content: form.getFieldValue('content'),
            displayPopup: form.getFieldValue('displayPopup') === 1 || false,
          },
        },
      ).then(() => {
        message.success('操作成功');
        history.push('/operation/flash');
      });
    }
  };

  /**
   * @description: 修改公告并发布
   * 修改公告前先检验表单
   * @param {*}
   * @return {*}
   */
  const handleSavePublish = () => {
    FlashService.editFlash(
      { id: activeFlash.Id },
      {
        data: {
          title: form.getFieldValue('title'),
          content: form.getFieldValue('content'),
          displayPopup: form.getFieldValue('displayPopup') === 1 || false,
        },
      },
    ).then((res: any) => {
      if (res) {
        FlashService.publishFlash({
          id: activeFlash.Id,
        }).then((response: any) => {
          if (response) {
            message.success('操作成功');
            history.push('/operation/flash');
          }
        });
      }
    });
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
      <Card style={{ padding: '24px 0' }}>
        <Form
          {...formLayout}
          name="editNitice"
          layout={'vertical'}
          form={form}
          // initialValues={{ content: '123' }}
        >
          <Form.Item
            label="快讯标题"
            name="title"
            rules={[
              {
                required: true,
                message: '快讯标题不能为空',
              },
            ]}
          >
            <Input placeholder="请输入快讯标题" />
          </Form.Item>
          <Form.Item
            label="正文"
            name="content"
            rules={[
              {
                required: true,
                message: '正文不能为空',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="是否弹窗" name="displayPopup">
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSave}>
              保存
            </Button>
            <Button type="primary" style={{ margin: '0 16px' }} onClick={handleSavePublish}>
              保存并发布
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

const mapStateToProps = (state: any) => {
  return {
    activeFlash: state.flash.activeFlash,
  };
};

export default connect(mapStateToProps)(EditFlash);
