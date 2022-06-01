/*
 * @Description: 编辑平台
 * @Author: 尚夏
 * @Date: 2021-09-14 17:12:23
 * @LastEditTime: 2021-12-20 16:03:32
 * @FilePath: /mining-admin-desktop/src/pages/HomePage/EditPlatform.tsx
 */

import React, { useState, useEffect, useRef } from 'react';
import { history, useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Input, Button, Upload, Card, message, Radio, Select } from 'antd';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { OwnerService } from '@/services';
import WangEditor from '@/components/WangEditor';
// import styles from './index.less';

const formLayout: any = {
  labelCol: { offset: 1, span: 18 },
  wrapperCol: { offset: 1, span: 18 },
};

const { TextArea } = Input;
const { Option } = Select;

const Language = [
  {
    label: '中文',
    value: 'zh',
  },
  {
    label: '英文',
    value: 'en',
  },
];
const EditPlatform: React.FC = () => {
  const [form] = Form.useForm();
  const { platform, setPlatform } = useModel('usePlatform');

  const [demoPlatformDis, setDemoPlatformDis] = useState<boolean>(true);

  const handleChangeSelf = (e: any) => {
    if (e.target.value === 'no') {
      setDemoPlatformDis(false);
    } else {
      form.setFieldsValue({
        isDemoPlatform: 'no',
      });
      setDemoPlatformDis(true);
    }
  };

  // 编辑dom对象
  const editRef: any = useRef<any>();
  useEffect(() => {
    if (platform) {
      form.setFieldsValue({
        name: platform.name,
        intro: platform.intro,
        isSelfOperated: platform.isSelfOperated === true ? 'yes' : 'no',
        isDemoPlatform: platform.isDemoPlatform === true ? 'yes' : 'no',
        language: platform.language,
        filecoinStorageProductServiceFeePercent:
          platform.settings?.filecoinStorageProductServiceFeePercent / 10 || '0',
        referrerCommissionRate: platform.settings?.referrerCommissionRate / 10 || '0',
      });
      editRef.current.txt.html(platform.settings?.productPurchaseSpecifiction || '');
    } else {
      history.push('/homePage');
    }
  }, [platform]);

  const onCheck = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
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
    if (bool) {
      OwnerService.settingPlatform(
        {
          id: platform.Id,
        },
        {
          data: {
            // eslint-disable-next-line no-unneeded-ternary
            isSelfOperated: form.getFieldValue('isSelfOperated') === 'no' ? false : true,
            // eslint-disable-next-line no-unneeded-ternary
            isDemoPlatform: form.getFieldValue('isDemoPlatform') === 'no' ? false : true,
            language: form.getFieldValue('language'),
            filecoinStorageProductServiceFeePercent:
              form.getFieldValue('filecoinStorageProductServiceFeePercent') * 10,
            referrerCommissionRate: form.getFieldValue('referrerCommissionRate') * 10,
            productPurchaseSpecifiction: editRef.current.txt.html(),
          },
        },
      ).then((res: any) => {
        if (res) {
          message.success('操作成功');
          history.push('/');
        }
      });
    }
  };

  // 取消 返回主页面
  const handleCancel = () => {
    history.push('/');
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
          name="addBanner"
          layout={'vertical'}
          form={form}
          // initialValues={{ layout: formLayout }}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[
              {
                required: true,
                message: '名称不能为空',
              },
            ]}
          >
            <Input placeholder="请输入名称" disabled />
          </Form.Item>
          <Form.Item
            label="简介"
            name="intro"
            rules={[
              {
                required: true,
                message: '简介不能为空',
              },
            ]}
          >
            <TextArea rows={4} placeholder="请输入简介" disabled />
          </Form.Item>
          <Form.Item name="isSelfOperated" label="是否自营">
            <Radio.Group onChange={handleChangeSelf}>
              <Radio value="no">否</Radio>
              <Radio value="yes">是</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="isDemoPlatform" label="是否演示平台">
            <Radio.Group disabled={demoPlatformDis}>
              <Radio value="no">否</Radio>
              <Radio value="yes">是</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="language"
            label="语言"
            rules={[
              {
                required: true,
                message: '请选择语言',
              },
            ]}
          >
            <Select placeholder="选择语言">
              {Language &&
                Language.map((item: any, index: number) => {
                  return (
                    <Option value={item.value} key={index}>
                      {item.label}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            label="技术费"
            name="filecoinStorageProductServiceFeePercent"
            rules={[
              {
                required: true,
                message: '技术费不能为空',
              },
            ]}
          >
            <Input suffix="%" />
          </Form.Item>
          <Form.Item
            label="返佣比例"
            name="referrerCommissionRate"
            rules={[
              {
                required: true,
                message: '返佣不能为空',
              },
            ]}
          >
            <Input suffix="%" />
          </Form.Item>
          <Form.Item
            label="购买后提示内容"
            name="productPurchaseSpecifiction"
            rules={[
              {
                required: true,
                message: '内容不能为空',
              },
            ]}
          >
            <WangEditor
              getEditor={(edt: any) => {
                editRef.current = edt;
              }}
              id="editor"
              htUeditor={300}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSure}>
              保存
            </Button>
            <Button type="primary" style={{ margin: '0 16px' }} onClick={handleCancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default EditPlatform;
