/*
 * @Description: 用户节点
 * @Author: 尚夏
 * @Date: 2021-07-20 13:39:40
 * @LastEditTime: 2022-02-16 13:59:18
 * @FilePath: /mining-admin-desktop/src/pages/NodeUser/index.tsx
 */

import React, { useRef, useState, useEffect } from 'react';
import { history, connect, useModel } from 'umi';
// import type { Dispatch } from 'umi';
import { Modal, Form, Input, Button, message, Select } from 'antd';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { CustomerService, Node, OwnerService } from '@/services';
import DebounceSelect from '@/components/DebounceSelect';
import { transformFIL } from '@/utils/utils';
import EditNodeModal from './component/EditNodeModal';

const { shell } = window.require('electron');

const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};
const { TextArea } = Input;
const { Option } = Select;

const NodeUser: React.FC<{}> = () => {
  const [form] = Form.useForm();

  // store
  const { setActiveUser } = useModel('useUser');

  const actionRef = useRef<ActionType>();

  // 用户
  const [user, setUser] = useState<any>();

  // 获取所有用户
  const getUser = (value: string) => {
    return OwnerService.getOwnerCustomerList({}).then((res: any) => {
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
    } catch (errorInfo: any) {
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
      OwnerService.addOwnerCustomerNode({
        data: {
          customerId: form.getFieldValue('mobile')?.value, // 用户Id
          nodeNo: form.getFieldValue('nodeNo'),
          nodeComment: form.getFieldValue('nodeComment'),
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

  // 编辑节点用户
  const [editNodeVisible, setEditNodeVisible] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>({});

  const handleEditCancel = () => {
    setEditNodeVisible(false);
    setEditData({});
  };

  const handleEditOk = (data: any) => {
    OwnerService.editOwnerCustomerNode(
      {
        id: data.id,
      },
      {
        data: {
          node_no: data.nodeNo,
          node_comment: data.nodeComment,
          withdrawn_address: data.withdrawnAddress,
        },
      },
    ).then((res: any) => {
      if (res) {
        message.success('操作成功');
        actionRef.current?.reload();
        handleEditCancel();
      }
    });
  };

  // 停用节点用户
  const handleFinishCustomerNode = (Id: number) => {
    OwnerService.finishOwnerCustomerNode({
      id: Id,
    }).then((res) => {
      if (res) {
        message.success('操作成功');
        actionRef.current?.reload();
      }
    });
  };

  /**
   * @description: 循环节点号 获取节点内数据
   * @param {Array} nodeNoList
   * @return {*}
   */
  const nodeFormatData = (nodeNoList: string[]) => {
    const promiseArr = nodeNoList.map((item: any, index) => {
      return Node.NodeDetail(
        {
          0: item.nodeNo,
        },
        {
          data: {
            id: 1,
            jsonrpc: '2.0',
            method: 'filscan.FilscanActorById',
            params: [item.nodeNo],
          },
        },
      );
    });

    return Promise.all(promiseArr).then((res) => {
      return nodeNoList.map((item: any) => {
        const detail: any = res.filter((i: any) => i?.result?.extra?.actor === item.nodeNo);
        if (detail) {
          return {
            ...detail[0],
            ...item,
          };
        }
        return item;
      });
    });
  };

  const columns: ProColumns<Notice.FormProps>[] = [
    // {
    //   title: 'UID',
    //   search: false,
    //   dataIndex: 'id',
    // },
    {
      title: '节点',
      dataIndex: 'nodeNo',
      renderText: (text) => {
        return (
          <span
            className={styles.node_no}
            onClick={() => {
              shell.openExternal(`https://filscan.io/address/miner?address=${text}`);
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: '用户',
      dataIndex: 'mobile',
    },
    {
      title: '节点备注',
      search: false,
      dataIndex: 'nodeComment',
    },

    {
      title: '有效存储(P)',
      search: false,
      dataIndex: 'result',
      renderText: (text) => {
        return text?.extra.quality_adjust_power
          ? // eslint-disable-next-line no-restricted-properties
            (text?.extra.quality_adjust_power / Math.pow(1024, 5)).toFixed(2)
          : '-';
      },
    },
    {
      title: '账户余额',
      search: false,
      ellipsis: true,
      dataIndex: 'result',
      renderText: (text) => {
        return (
          text?.basic.balance && Number(Number(text?.basic.balance).toFixed(4)).toLocaleString()
        );
      },
    },
    {
      title: '可用余额',
      search: false,
      ellipsis: true,
      dataIndex: 'result',
      renderText: (text) => {
        return (
          text?.extra.available_balance &&
          Number(Number(text?.extra.available_balance).toFixed(4)).toLocaleString()
        );
      },
    },
    {
      title: '扇区抵押',
      search: false,
      ellipsis: true,
      dataIndex: 'result',
      renderText: (text) => {
        return (
          text?.extra.init_pledge &&
          Number(Number(text?.extra.init_pledge).toFixed(4)).toLocaleString()
        );
      },
    },
    {
      title: '出块数量',
      search: false,
      ellipsis: true,
      dataIndex: 'result',
      renderText: (text) => {
        return text?.block_count;
      },
    },
    {
      title: '总奖励',
      search: false,
      ellipsis: true,
      dataIndex: 'result',
      renderText: (text) => {
        return (
          text?.basic.rewards && Number(Number(text?.basic.rewards).toFixed(4)).toLocaleString()
        );
        // return transformFIL(text?.withdrawnAmount);
      },
    },
    {
      title: '提现地址',
      search: false,
      width: 100,
      dataIndex: 'withdrawnAddress',
    },
    {
      title: '已提现',
      search: false,
      width: 100,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'state',
      search: false,
      valueEnum: {
        working: {
          text: '工作中',
        },
        finish: {
          text: '结束',
        },
      },
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      renderText: (text) => {
        if (text.state !== 'finish') {
          return [
            <a
              key="edit"
              onClick={() => {
                setEditData(text);
                setEditNodeVisible(true);
              }}
            >
              编辑
            </a>,
            <a
              key="finish"
              onClick={() => {
                Modal.confirm({
                  title: '确定停用?',
                  onOk: (close) => {
                    handleFinishCustomerNode(text.id);
                    close();
                  },
                });
              }}
            >
              停用
            </a>,
          ];
        }
        return null;
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
          return OwnerService.getOwnerCustomerNode({
            mobile: params.mobile || '',
            nodeNo: params.nodeNo || '',
          }).then(async (res: any) => {
            if (res) {
              const data = await nodeFormatData(res || []);
              // return {
              //   data: nodeFormatData(res || []),
              // };

              return {
                data,
              };
            }
            return [];
          });
        }}
        options={{
          density: false,
        }}
        rowKey="id"
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
            添加新节点
          </Button>,
        ]}
      />

      <Modal
        title={'添加新节点'}
        width={500}
        centered
        visible={visible}
        footer={[
          <Button key="back" type="primary" onClick={handleSure}>
            通过
          </Button>,
        ]}
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
          <Form.Item label="手机号" name="mobile">
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
          <Form.Item label="新节点" name="nodeNo">
            <Input placeholder="请输入节点号" />
          </Form.Item>
          <Form.Item label="节点备注" name="nodeComment">
            <Input placeholder="请输入节点备注" />
          </Form.Item>
        </Form>
      </Modal>
      {editNodeVisible && (
        <EditNodeModal
          visible={editNodeVisible}
          data={editData}
          handleOk={handleEditOk}
          handleCancel={handleEditCancel}
        />
      )}
    </PageContainer>
  );
};

export default connect()(NodeUser);
