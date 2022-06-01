/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-21 14:06:43
 * @LastEditTime: 2022-01-13 10:18:27
 * @FilePath: /mining-admin-desktop/src/pages/Notice/AddNotice/index.tsx
 */
import React, { useState, useEffect, createRef, Dispatch } from 'react';
import { history, connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Input, Button, Checkbox, message, Card } from 'antd';
import WangEditor from '@/components/WangEditor';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { NoticeService } from '@/services';

const formLayout: any = {
  labelCol: { offset: 2, span: 20 },
  wrapperCol: { offset: 2, span: 20 },
};

const AddNotice = (props: { dispatch: any }) => {
  const { dispatch } = props;
  const [form] = Form.useForm();

  // 编辑器实例对象
  const editRef: any = createRef<any>();
  // const [content, setContent] = useState<string>('');

  // 检验表单
  const onCheck = async () => {
    try {
      // const values =
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  /**
   * @description: 保存
   * 保存前先检验表单
   * @param {*}
   * @return {*}
   */
  const handleSave = async () => {
    const bool = await onCheck();
    if (bool) {
      NoticeService.createNotice({
        data: {
          title: form.getFieldValue('title'),
          content: form.getFieldValue('content'),
        },
      }).then((res) => {
        if (res) {
          message.success('操作成功');
          history.push('/operation/notice');
        }
      });
    }
  };

  /**
   * @description: 保存并发布
   * 保存前先检验表单
   * @param {*}
   * @return {*}
   */
  const handleSavePublish = () => {
    NoticeService.createNotice({
      data: {
        title: form.getFieldValue('title'),
        content: form.getFieldValue('content'),
      },
    }).then((res: any) => {
      if (res) {
        NoticeService.publishNotice({
          id: res.Id,
        }).then((response) => {
          if (response) {
            message.success('操作成功');
            history.push('/operation/notice');
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
          name="addNitice"
          layout={'vertical'}
          form={form}
          // initialValues={{ layout: formLayout }}
        >
          <Form.Item
            label="公告标题"
            name="title"
            rules={[
              {
                required: true,
                message: '公告标题不能为空',
              },
              // {
              //   min: 6,
              //   message: '公告标题不能少于6个字'
              // }
            ]}
          >
            <Input placeholder="请输入公告标题" />
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
            <WangEditor
              getEditor={(edt: any) => {
                editRef.current = edt;
              }}
              id="editor"
              htUeditor={500}
            />
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
    // publishVideoList: state.video.publishVideoList
  };
};

export default connect(mapStateToProps)(AddNotice);
