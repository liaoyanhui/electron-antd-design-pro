/* eslint-disable consistent-return */
/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-09-06 11:25:35
 * @LastEditTime: 2021-09-30 10:41:12
 * @FilePath: /mining-admin-desktop/src/pages/BindRelation/index.tsx
 */

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Col, Row, Select, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import DebounceSelect from '@/components/DebounceSelect';
import styles from './index.less';
import { CustomerService, OwnerService } from '@/services';

const formLayout: any = {
  labelCol: { offset: 0, span: 16 },
  wrapperCol: { offset: 0, span: 16 },
};

const { Option } = Select;

const BindRelation: React.FC = () => {
  const [form] = Form.useForm();

  const [platformId, setPlatformId] = useState<string>('');
  const [platformList, setPlatformList] = useState<any[]>([]);
  useEffect(() => {
    OwnerService.getPlatformList().then((res: any) => {
      setPlatformList(res);
    });
  }, []);

  const handleSelect = (value: string) => {
    setPlatformId(value);
  };

  const [user, setUser] = useState<any>();

  // 获取所有用户
  const getUser = (value: string): any => {
    return CustomerService.getOwnCustomerList(platformId).then((res: any) => {
      if (res) {
        const newArr = res.filter((i: any) => {
          return i.mobile.indexOf(value) > -1;
        });
        return newArr.map((item: any) => {
          return {
            label: item.mobile,
            value: item.Id,
          };
        });
      }
    });
  };

  const onCheck = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  // 确定
  const handleSure = async () => {
    const bool = await onCheck();
    if (bool) {
      OwnerService.rebindCustomerToPlatform(platformId, {
        customerId: form.getFieldValue('customerId')?.value,
        newPlatformId: form.getFieldValue('newPlatformId'),
      }).then((res: any) => {
        if (res) {
          form.resetFields();
          message.success('操作成功');
        }
      });
    }
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
      <div className={styles.content}>
        <Form
          {...formLayout}
          name="bindRelation"
          layout={'vertical'}
          form={form}
          // initialValues={{ layout: formLayout }}
        >
          <Row>
            <Col span={8} offset={3}>
              <Form.Item
                label="平台"
                name="platform"
                rules={[
                  {
                    required: true,
                    message: '请选择平台',
                  },
                ]}
              >
                <Select placeholder="请选择平台" onChange={handleSelect}>
                  {platformList &&
                    platformList.map((item: any, index: number) => {
                      return (
                        <Option key={index} value={item.Id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8} offset={3}>
              <Form.Item
                label="被邀请人"
                name="customerId"
                rules={[
                  {
                    required: true,
                    message: '名称不能为空',
                  },
                ]}
              >
                <DebounceSelect
                  // eslint-disable-next-line no-unneeded-ternary
                  disabled={platformId ? false : true}
                  value={user}
                  placeholder="搜索用户"
                  fetchOptions={getUser}
                  onChange={(newValue) => {
                    setUser(newValue);
                  }}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label=" " name="">
                <div>绑定至</div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="邀请平台"
                name="newPlatformId"
                rules={[
                  {
                    required: true,
                    message: '请选择平台',
                  },
                ]}
              >
                <Select placeholder="请选择平台" onChange={handleSelect}>
                  {platformList &&
                    platformList.map((item: any, index: number) => {
                      return (
                        <Option key={index} value={item.Id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.btn_box}>
            <Col span={12} offset={11}>
              <Form.Item>
                <Button type="primary" onClick={handleSure}>
                  确定
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </PageContainer>
  );
};

export default BindRelation;
