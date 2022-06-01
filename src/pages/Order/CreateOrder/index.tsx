/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-27 10:23:35
 * @LastEditTime: 2021-11-05 09:48:29
 * @FilePath: /mining-admin-desktop/src/pages/Order/CreateOrder/index.tsx
 */
import React, { useState, useEffect, createRef } from 'react';
import { history } from 'umi';
import { Form, Input, Button, Upload, Card, message, Select } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import DebounceSelect from '@/components/DebounceSelect';
// import styles from '../index.less';
import { ProductService, CustomerService } from '@/services';
import { fenToCny } from '@/utils/utils';

const formLayout: any = {
  labelCol: { offset: 0, span: 18 },
  wrapperCol: { offset: 0, span: 6 },
};

const { Option } = Select;

const CreateOrder: React.FC = () => {
  const [form] = Form.useForm();

  const [commodity, setCommodity] = useState<any>([]);

  const [user, setUser] = useState<any>();

  useEffect(() => {
    const { comm = '{}' } = history.location.query as any;
    // console.log(comm, 'commm');
    const mo = JSON.parse(comm);
    setCommodity(mo);

    form.setFieldsValue({
      commodity: mo.name,
    });
  }, [history.location.query]);

  const onCheck = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  // 应收金额
  const [receivable, setReceivable] = useState<any>('');

  const handleChangeNumber = (e: any) => {
    const { price } = commodity;
    setReceivable(e.target.value * price);
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
      const data: any = {
        customerId: Number(form.getFieldValue('user').value), // 用户Id
        qty: Number(form.getFieldValue('number')),
        paidAmount: Number(form.getFieldValue('paidAmount') * 100), // 实收金额
        grantQty: form.getFieldValue('grantQty') && Number(form.getFieldValue('grantQty')),
      };
      // if (form.getFieldValue('grantQty')) {
      //   data.grantQty = Number(form.getFieldValue('grantQty'));
      // }
      // internalComment: form.getFieldValue('internalComment'), // 内部备注

      ProductService.purchaseProduct(
        { id: Number(commodity.Id) },
        {
          data: {
            ...data,
          },
        },
      ).then((res: any) => {
        if (res) {
          message.success('操作成功');
          history.goBack();
        }
      });
    }
  };

  // 取消
  const handleCancel = () => {
    history.goBack();
  };

  // 获取所有用户
  const getUser = (value: string) => {
    return CustomerService.getCustomerList().then((res: any) => {
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
            label="用户"
            name="user"
            rules={[
              {
                required: true,
                message: '用户不能为空',
              },
            ]}
          >
            {/* <Input placeholder="请输入用户" /> */}
            <DebounceSelect
              // mode="multiple"
              value={user}
              placeholder="搜索用户"
              fetchOptions={getUser}
              onChange={(newValue) => {
                setUser(newValue);
              }}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="商品"
            name="commodity"
            rules={[
              {
                required: true,
                message: '商品不能为空',
              },
            ]}
          >
            <Input disabled></Input>
          </Form.Item>
          <Form.Item
            label="数量"
            name="number"
            rules={[
              {
                required: true,
                message: '数量不能为空',
              },
            ]}
          >
            <Input
              suffix="份"
              placeholder="请输入数量"
              type="number"
              min={0}
              onChange={handleChangeNumber}
            />
          </Form.Item>
          <Form.Item label="应收" name="receivable">
            <div>{fenToCny(receivable)} CNY</div>
          </Form.Item>
          <Form.Item
            label="实收"
            name="paidAmount"
            rules={[
              {
                required: true,
                message: '实收不能为空',
              },
            ]}
          >
            <Input suffix="CNY" placeholder="请输入实收金额" min={0} type="number" />
          </Form.Item>
          {/* <Form.Item label="需质押" name="needPledge">
            <div>75000 FIL</div>
          </Form.Item>
          <Form.Item
            label="质押"
            name="pledge"
            rules={[
              {
                required: true,
                message: '质押数量不能为空',
              },
            ]}
          >
            <Input suffix="FIL" placeholder="请输入质押FIL数量" type="number" />
          </Form.Item> */}
          <Form.Item
            label="赠送"
            name="grantQty"
            // rules={[
            //   {
            //     required: true,
            //     message: '赠送不能为空',
            //   },
            // ]}
          >
            <Input suffix="份" placeholder="请输入赠送算力" type="number" min={0} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSure}>
              确定
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

export default CreateOrder;
