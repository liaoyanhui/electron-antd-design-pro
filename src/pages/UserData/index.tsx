/*
 * @Description: 用户
 * @Author: 尚夏
 * @Date: 2021-07-20 13:39:40
 * @LastEditTime: 2022-05-26 17:41:49
 * @FilePath: /mining-admin-desktop/src/pages/UserData/index.tsx
 */
import React, { useRef, useState, useEffect } from 'react';
import { history, connect, useModel } from 'umi';
import type { Dispatch } from 'umi';
import { Modal, Form, Input, Button, message, Select } from 'antd';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { CustomerService } from '@/services';
import DebounceSelect from '@/components/DebounceSelect';
import { transformFIL, fileToEnd } from '@/utils/utils';
import BlockUpModal from './component/BlockUpModal';
import ClearingFeeModal from './component/ClearingFeeModal';

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};
const { TextArea } = Input;
const { Option } = Select;

const UserData: React.FC<{
  dispatch: Dispatch;
}> = (props) => {
  const { dispatch } = props;
  const [form] = Form.useForm();

  // store
  const { setActiveUser } = useModel('useUser');

  const actionRef = useRef<ActionType>();

  // 搜索用户
  const [user, setUser] = useState<any>();

  // 操作用户
  const [customer, setCustomer] = useState<any>({});

  const [blockUpVisible, setBlockUpVisible] = useState<boolean>(false);
  const [clearingFeeVisible, setClearingFeeVisible] = useState<boolean>(false);

  // 获取所有用户
  const getUser = (value: string) => {
    return CustomerService.getCustomerList({}).then((res: any) => {
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

  // 新建用户
  const [visible, setVisible] = useState<boolean>(false);

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
      CustomerService.createCustomer({
        data: {
          referrerCustomerId: form.getFieldValue('user')?.value, // 用户Id
          mobile: form.getFieldValue('mobile'),
          nickName: form.getFieldValue('mobile'),
          // filWithdrawAddress: form.getFieldValue('filWithdrawAddress'),
          internalRemarksName: form.getFieldValue('internalRemarksName'),
          description: form.getFieldValue('description'),
        },
      }).then((res: any) => {
        if (res) {
          message.success('操作成功');
          form.resetFields();
          setVisible(false);
          actionRef.current?.reload();
        }
      });
    }
  };

  const handleCancelBlockUp = () => {
    setBlockUpVisible(false);
    setCustomer({});
  };

  const handleOkBlockUp = (id: any) => {
    CustomerService.stopCustomerOrders({
      id,
    }).then((res: any) => {
      if (res) {
        message.success('操作成功!');
        handleCancelBlockUp();
        actionRef.current?.reload();
      }
    });
  };

  const handleCancelClearingFee = () => {
    setClearingFeeVisible(false);
    setCustomer({});
  };
  const handleOkClearingFee = (id: any, amount: any) => {
    CustomerService.customerClearingFee(
      { id },
      {
        data: {
          clearingFeeAmount: fileToEnd(amount),
        },
      },
    ).then((res: any) => {
      if (res) {
        message.success('操作成功！');
        actionRef.current?.reload();
        handleCancelClearingFee();
      }
    });
  };

  const columns: ProColumns<Notice.FormProps>[] = [
    {
      title: 'UID',
      search: false,
      dataIndex: 'Id',
      // render: (_) => <a>{_}</a>,
    },
    {
      title: '用户',
      // search: false,
      dataIndex: 'mobile',
    },
    // {
    //   title: '创建人',
    //   search: false,
    //   dataIndex: 'createAuthor',
    // },
    // {
    //   title: '商务点',
    //   search: false,
    //   dataIndex: 'publishObj',
    // },
    {
      title: '昵称',
      search: false,
      dataIndex: 'nickName',
    },
    {
      title: '内部备注',
      search: false,
      dataIndex: 'internalRemarksName',
    },
    // {
    //   title: '邀请人',
    //   search: false,
    //   dataIndex: 'createdAt',
    // },
    {
      title: '存储(T)',
      search: false,
      dataIndex: 'revenues',
      renderText: (text) => {
        return text?.storage;
      },
    },
    {
      title: '累计收益(FIL)',
      search: false,
      ellipsis: true,
      dataIndex: 'revenues',
      renderText: (text) => {
        if (text) {
          return transformFIL(text.settledAmount + text.vestingAmount);
        }
        return transformFIL('0');
      },
    },
    {
      title: '锁仓收益(FIL)',
      search: false,
      ellipsis: true,
      dataIndex: 'revenues',
      renderText: (text) => {
        return transformFIL(text?.vestingAmount);
      },
    },
    {
      title: '解锁收益(FIL)',
      search: false,
      ellipsis: true,
      dataIndex: 'revenues',
      renderText: (text) => {
        return transformFIL(text?.settledAmount);
      },
    },
    {
      title: '返佣(FIL)',
      search: false,
      ellipsis: true,
      dataIndex: 'revenues',
      renderText: (text) => {
        return transformFIL(text?.referrerRevenue?.settledAmount);
      },
    },
    {
      title: '余额(FIL)',
      search: false,
      ellipsis: true,
      dataIndex: 'revenues',
      renderText: (text) => {
        return transformFIL(text?.availableAmount);
      },
    },
    {
      title: '已提现(FIL)',
      search: false,
      ellipsis: true,
      dataIndex: 'revenues',
      renderText: (text) => {
        return transformFIL(text?.withdrawnAmount);
      },
    },
    {
      title: '补扣(FIL)',
      search: false,
      ellipsis: true,
      dataIndex: 'revenues',
      renderText: (text) => {
        return transformFIL(text?.subsidyAmount - text?.deductAmount);
      },
    },
    {
      title: '协商结算费用(FIL)',
      search: false,
      ellipsis: true,
      dataIndex: 'closeExpense',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '注册时间',
      search: false,
      width: 100,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      width: 180,
      renderText: (text) => {
        return (
          <div className={styles.option}>
            <a
              onClick={() => {
                setActiveUser(text);
                history.push(`/userData/userDetail`);
              }}
            >
              查看
            </a>
            {!text.isCloseSettlement && (
              <a
                onClick={() => {
                  setCustomer(text);
                  setBlockUpVisible(true);
                }}
              >
                停用
              </a>
            )}
            {text.isCloseSettlement && (
              <a
                onClick={() => {
                  setCustomer(text);
                  setClearingFeeVisible(true);
                }}
              >
                协商结算费用
              </a>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer
      header={{
        breadcrumbRender: (params) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      <ProTable<Notice.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        request={async (params: any, sort, filter) => {
          // console.log(params, 'params');
          let data = {};
          if (params.mobile) {
            data = {
              filterBy: 'mobile',
              filter: params.mobile,
            };
          }
          return CustomerService.getCustomerList({ ...data }).then((res: any) => {
            return { data: res };
          });
        }}
        options={{
          density: false,
        }}
        // editable={{
        //   type: 'multiple',
        // }}

        rowKey="Id"
        // search={false}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        // headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setVisible(true)}
          >
            新用户
          </Button>,
        ]}
      />

      <Modal
        title={'新用户'}
        width={500}
        centered
        visible={visible}
        footer={null}
        // onOk={handleOk}
        wrapClassName={styles.modal}
        // bodyStyle={{maxHeight: '600px', minHeight: '300px'}}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...formLayout}
          name="addBanner"
          layout={'vertical'}
          form={form}
          initialValues={{ accountType: 1 }}
        >
          <Form.Item
            label="手机号"
            name="mobile"
            rules={[
              {
                required: true,
                message: '手机号不能为空',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item label="邀请人" name="user">
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
          {/* <Form.Item label="提现地址" name="filWithdrawAddress">
            <Input placeholder="请输入提现地址" />
          </Form.Item> */}
          <Form.Item label="内部备注名" name="internalRemarksName">
            <Input placeholder="请输入内部备注名" />
          </Form.Item>
          <Form.Item label="描述信息" name="description">
            <TextArea rows={4} placeholder="请输入描述信息" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSure}>
              确定
            </Button>
            {/* <Button type="primary" style={{ margin: '0 16px' }} onClick={handleCancel}>取消</Button> */}
          </Form.Item>
        </Form>
      </Modal>

      <BlockUpModal
        visible={blockUpVisible}
        customer={customer}
        onCancel={handleCancelBlockUp}
        onOk={handleOkBlockUp}
      />
      <ClearingFeeModal
        visible={clearingFeeVisible}
        customer={customer}
        onCancel={handleCancelClearingFee}
        onOk={handleOkClearingFee}
      />
    </PageContainer>
  );
};

// const mapStateToProps = (state: any) => {
//   return {
//       // publishVideoList: state.video.publishVideoList
//   }
// }

export default connect()(UserData);
