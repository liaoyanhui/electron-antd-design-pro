/*
 * @Description: 待结算
 * @Author: 尚夏
 * @Date: 2021-08-27 11:35:42
 * @LastEditTime: 2021-11-09 15:06:11
 * @FilePath: /mining-admin-desktop/src/pages/StaySettlement/tabComponent/PlatformStay/index.tsx
 */

import React, { useRef, useState } from 'react';
import { Button, Modal, Input, Form, message, Tooltip } from 'antd';
import { transformFIL, fileToEnd } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FilecoinService } from '@/services';
import styles from '../index.less';
import { history } from 'umi';
import { formatAddress } from '@/utils/utils';

// const { TextArea } = Input;
const formLayout: any = {
  labelCol: { offset: 0, span: 24 },
  wrapperCol: { offset: 0, span: 24 },
};

const PlatformStay: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createForm] = Form.useForm();
  const [publishForm] = Form.useForm();

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
    {
      title: '商品',
      search: false,
      dataIndex: 'products',
      renderText: (text) => {
        return text.length;
      },
    },
    {
      title: '存储(T)',
      search: false,
      dataIndex: 'storage',
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
    //   title: '历史锁仓(FIL)',
    //   search: false,
    //   dataIndex: 'totalVestingAmount',
    //   renderText: (text) => {
    //     return transformFIL(text);
    //   },
    // },
    {
      title: '技术费(%)',
      search: false,
      dataIndex: 'serviceFeePercent',
      renderText: (text) => {
        return text / 10;
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
      title: '操作',
      // width: 164,
      key: 'option',
      valueType: 'option',
      renderText: (text) => {
        return (
          <>
            {/* <a
              key="publish"
              style={{ marginRight: 10 }}
              onClick={async () => {
                await FilecoinService.getFilecoinMiningEfficiency().then((res: any) => {
                  if (res) {
                    publishForm.setFieldsValue({
                      miningEfficiency: transformFIL(res.miningEfficiency),
                    });
                  }
                });
                setSettlementNo(text.settlementNo);
                setVisible(true);
              }}
            >
              发放
            </a> */}
            <a
              key="check"
              onClick={() => {
                history.push(
                  `/settlement/staySettlement/platformCheck?settlementNo=${text.settlementNo}`,
                );
              }}
            >
              查看
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
          return FilecoinService.getFilecoinPlatformSettlementList({
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
        toolBarRender={() => []}
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
            确认
          </Button>,
        ]}
      >
        <Form {...formLayout} name="publish" layout={'vertical'} form={publishForm}>
          <Form.Item label="24h平均单T收益" name="miningEfficiency">
            <Input type="number" placeholder="不填默认全网24h每T收益" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PlatformStay;
