/*
 * @Description: 待结算
 * @Author: 尚夏
 * @Date: 2021-08-27 11:35:42
 * @LastEditTime: 2022-05-18 09:15:23
 * @FilePath: /mining-admin-desktop/src/pages/StaySettlement/tabComponent/UserStay/index.tsx
 */

import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Form, message, Tooltip, DatePicker, modal } from 'antd';
import { transformFIL, fileToEnd, formatAddress } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FilecoinService } from '@/services';
import { history } from 'umi';
import styles from '../index.less';
import moment from 'moment';

// const { TextArea } = Input;
const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const ForThe: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createForm] = Form.useForm();
  const [publishForm] = Form.useForm();

  const [createVisible, setCreateVisible] = useState<boolean>(false);
  // 创建结算单 弹窗
  const handleCreate = () => {
    setCreateVisible(true);
  };

  // 结算单日期变化
  const handleChangeDate = (m: any) => {
    if (m) {
      FilecoinService.getFilecoinMiningEfficiency({
        dayAt: m.format('YYYY-MM-DD'),
      }).then((res: any) => {
        if (res) {
          createForm.setFieldsValue({
            miningEfficiency: transformFIL(res.miningEfficiency),
          });
        }
      });
    } else {
      createForm.setFieldsValue({
        miningEfficiency: null,
      });
    }
  };

  const onCheck = async () => {
    try {
      await createForm.validateFields();
      return true;
    } catch (errorInfo: any) {
      createForm.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  // 创建结算单
  const handleCreateStatement = async () => {
    const bool = await onCheck();
    if (bool) {
      let data = {};
      if (createForm.getFieldValue('miningEfficiency')) {
        data = {
          miningEfficiency: String(fileToEnd(createForm.getFieldValue('miningEfficiency'))),
        };
      }
      FilecoinService.createFilecoinSettlementInDay({
        data: {
          ...data,
          settleDayAt: createForm.getFieldValue('settleDayAt').format('YYYY-MM-DD'),
        },
      }).then((res: any) => {
        if (res) {
          setCreateVisible(false);
          createForm.resetFields();
          actionRef.current?.reload();
        }
      });
    }
  };

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current > moment().startOf('day');
  };

  const [visible, setVisible] = useState<boolean>(false);
  const [settlementNo, setSettlementNo] = useState<any>();
  // 确认发放
  const handleSure = () => {
    let data = {};
    if (publishForm.getFieldValue('miningEfficiency')) {
      data = {
        miningEfficiency: String(fileToEnd(publishForm.getFieldValue('miningEfficiency'))),
      };
    }
    FilecoinService.confirmFilecoinSettlement(
      {
        settlementNo,
      },
      {
        data: {
          ...data,
        },
      },
    ).then((res: any) => {
      if (res) {
        message.success('操作成功');
        setVisible(false);
        setSettlementNo(null);
        createForm.resetFields();
        actionRef.current?.reload();
      }
    });
  };

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '结算单',
      dataIndex: 'settlementNo',
      renderText: (text) => {
        return (
          <Tooltip title={text}>
            <span>{formatAddress(text)}</span>
          </Tooltip>
        );
      },
    },
    // {
    //   title: '用户',
    //   search: false,
    //   dataIndex: 'customers',
    //   renderText: (text) => {
    //     return text && text.length;
    //   },
    // },
    {
      title: '理论收益(FIL)',
      search: false,
      dataIndex: 'rewardAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '锁仓(FIL)',
      search: false,
      dataIndex: 'vestingAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '立刻释放(FIL)',
      search: false,
      renderText: (text) => {
        return transformFIL(text.settledAmount - text.vestingUnlockAmount);
      },
    },
    {
      title: '历史释放(FIL)',
      search: false,
      dataIndex: 'vestingUnlockAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    // {
    //   title: '总锁仓(FIL)',
    //   search: false,
    //   dataIndex: 'totalVestingAmount',
    //   renderText: (text) => {
    //     return transformFIL(text);
    //   },
    // },
    {
      title: '服务费(FIL)',
      search: false,
      dataIndex: 'serviceFeeAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },

    {
      title: '本次结算(FIL)',
      search: false,
      dataIndex: 'settledAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '结算日期',
      search: false,
      dataIndex: 'settleDay',
      valueType: 'date',
    },
    {
      title: '创建时间',
      search: false,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'state',
      valueEnum: {
        created: {
          text: '未生效',
        },
        confirmed: {
          text: '已发放',
        },
        discarded: {
          text: '已废弃',
        },
      },
    },
    {
      title: '操作',
      // width: 164,
      key: 'option',
      valueType: 'option',
      renderText: (text) => {
        return (
          <>
            <a
              key="publish"
              style={{ marginRight: 10 }}
              onClick={async () => {
                publishForm.setFieldsValue({
                  miningEfficiency: transformFIL(text.latest24hMiningEfficiency),
                });
                setSettlementNo(text.settlementNo);
                setVisible(true);
              }}
            >
              发放
            </a>
            <a
              key="check"
              style={{ marginRight: 10 }}
              onClick={() => {
                history.push(
                  `/settlement/staySettlement/userCheck?settlementNo=${text.settlementNo}`,
                );
              }}
            >
              查看
            </a>
            <a
              key="discarded"
              onClick={() => {
                modal.confirm({
                  title: '是否撤销',
                  content: <div>撤销后对应商务和平台结算单也会撤销！</div>,
                  onOk: (close: any) => {
                    FilecoinService.discardedFilecoinSettlement({
                      settlementNo: text.settlementNo,
                    }).then((res) => {
                      if (res) {
                        message.success('操作成功');
                        actionRef.current?.reload();
                        close();
                      }
                    });
                  },
                });
              }}
            >
              撤销
            </a>
          </>
        );
      },
    },
  ];

  return (
    <>
      <ProTable<Banner.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        headerTitle={null}
        // rowSelection={{}}
        request={async (params = {}, sort, filter) => {
          return FilecoinService.getFilecoinSettlementList({
            filterBy: 'state',
            filter: 'created',
          }).then((res: any) => {
            return {
              data: res || [],
            };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="settlementNo"
        // search={{
        //   labelWidth: 'auto',
        // }}
        search={false}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="number"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={handleCreate}>
            创建结算单
          </Button>,
        ]}
      />
      <Modal
        title={'确认此结算单生效并发布'}
        visible={visible}
        width={500}
        centered
        onCancel={() => setVisible(false)}
        wrapClassName={styles.modal}
        footer={[
          <Button key="back" type="primary" onClick={handleSure}>
            确认发布
          </Button>,
        ]}
      >
        <Form {...formLayout} name="publish" layout={'vertical'} form={publishForm}>
          <Form.Item label="24h平均单T收益" name="miningEfficiency">
            <Input type="number" placeholder="不填默认全网24h每T收益" disabled />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={'创建结算单'}
        visible={createVisible}
        width={500}
        centered
        onCancel={() => setCreateVisible(false)}
        wrapClassName={styles.createModal}
        footer={[
          <Button key="create" type="primary" onClick={handleCreateStatement}>
            创建
          </Button>,
        ]}
      >
        <div className={styles.tip}>多日结算，需按顺序逐日结算，生成并发放后再操作后一日</div>
        <Form
          {...formLayout}
          name="create"
          layout={'vertical'}
          form={createForm}
          // initialValues={{
          //   settleDayAt: moment().add(-1, 'days'),
          // }}
        >
          <Form.Item
            label="结算日期"
            name="settleDayAt"
            rules={[
              {
                required: true,
                message: '请选择结算日期',
              },
            ]}
          >
            <DatePicker onChange={handleChangeDate} disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item
            label="24h平均单T收益"
            name="miningEfficiency"
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          >
            <Input type="number" placeholder="24h平均单T收益" />
          </Form.Item>
          {/* <Form.Item label="备注" name="comment">
            <TextArea rows={3} />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default ForThe;
