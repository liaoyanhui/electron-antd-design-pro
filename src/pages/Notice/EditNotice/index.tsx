/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-21 14:06:43
 * @LastEditTime: 2021-09-24 19:55:58
 * @FilePath: /mining-admin-desktop/src/pages/Notice/EditNotice/index.tsx
 */
import React, { useState, useEffect, createRef, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Input, Button, message, Card } from 'antd';
import WangEditor from '@/components/WangEditor';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { history, connect } from 'umi';
import type { Dispatch } from 'umi';
import styles from './index.less';
import { NoticeService } from '@/services';

const formLayout: any = {
  labelCol: { offset: 2, span: 20 },
  wrapperCol: { offset: 2, span: 20 },
};

const EditNotice: React.FC<{
  dispatch: Dispatch;
  activeNotice: any;
}> = (props) => {
  const { dispatch, activeNotice } = props;

  const [form] = Form.useForm();
  // 编辑器实例对象
  const editRef: any = useRef<any>();
  // const [content, setContent] = useState<string>('');

  // 能容填入
  useEffect(() => {
    form.setFieldsValue({
      content: activeNotice.content,
      title: activeNotice.title,
    });
  }, []);

  // const queryId: any = createRef<any>();
  // queryId.current = history.location.query?.id;

  // useEffect(() => {
  //   if(queryId.current) {
  //     const Prom = new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve('');
  //       }, 300);
  //     })
  //     Prom.then(() => {
  //       form.setFieldsValue({
  //         'content': 'ceshi1243',
  //         'title': 'title1',
  //         'agency': ['1']
  //       })
  //     })
  //   }

  // }, [queryId.current])

  // 全选
  // const handleSelectAll = () => {
  //   form.setFieldsValue({
  //     'agency': ['1','2']
  //   })
  // }

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
      NoticeService.editNotice(
        { id: activeNotice.Id },
        {
          data: {
            title: form.getFieldValue('title'),
            content: form.getFieldValue('content'),
          },
        },
      ).then(() => {
        message.success('操作成功');
        history.push('/operation/notice');
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
    NoticeService.editNotice(
      { id: activeNotice.Id },
      {
        data: {
          title: form.getFieldValue('title'),
          content: form.getFieldValue('content'),
        },
      },
    ).then((res: any) => {
      if (res) {
        NoticeService.publishNotice({
          id: activeNotice.Id,
        }).then((response: any) => {
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
          name="editNitice"
          layout={'vertical'}
          form={form}
          // initialValues={{ content: '123' }}
        >
          <Form.Item
            label="公告标题"
            name="title"
            rules={[
              {
                required: true,
                message: '公告标题不能为空',
              },
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
    activeNotice: state.notice.activeNotice,
  };
};

export default connect(mapStateToProps)(EditNotice);
