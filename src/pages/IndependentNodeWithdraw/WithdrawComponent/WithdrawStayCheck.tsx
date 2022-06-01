/*
 * @Description: 提现
 * @Author: 尚夏
 * @Date: 2021-07-27 16:56:31
 * @LastEditTime: 2022-01-07 14:17:51
 * @FilePath: /mining-admin-desktop/src/pages/IndependentNodeWithdraw/WithdrawComponent/WithdrawStayCheck.tsx
 */
import React, { useRef, useState } from 'react';

import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, Modal, Input, Tooltip, message } from 'antd';
import styles from '../index.less';
import { formatAddress, dropThirdBrowser, transformFIL } from '@/utils/utils';
import { OwnerService } from '@/services';

const { TextArea } = Input;

const WithdrawStayCheck: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<any>({});

  // 拒绝原因
  const [comment, setComment] = useState<string>('');
  const handleRefuse = (e: any) => {
    setComment(e.target.value);
  };

  const onCancel = () => {
    setComment('');
    setActiveOrder({});
    setVisible(false);
  };

  // 通过
  const handleOk = () => {
    OwnerService.customerNodeWithdrawProcess(
      { withdrawNo: activeOrder.withdrawNo },
      {
        data: {
          internalComment: comment,
        },
      },
    ).then((res: any) => {
      if (res) {
        message.success('操作成功');
        onCancel();
        actionRef.current?.reload();
      }
    });
  };

  // 不通过
  const handleCancel = () => {
    OwnerService.customerNodeWithdrawRefuse(
      { withdrawNo: activeOrder.withdrawNo },
      {
        data: {
          refuseComment: comment,
        },
      },
    ).then((res: any) => {
      if (res) {
        message.success('操作成功');
        onCancel();
        actionRef.current?.reload();
      }
    });
  };

  // id,
  //         customer_id,
  //         withdraw_no,
  //         to_address,
  //         amount,
  //         refuse_comment,
  //         internal_comment,
  //         created_at,
  //         refused_at,
  //         completed_at,
  //         state

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '流水号',
      dataIndex: 'withdrawNo',
    },
    {
      title: '节点号',
      dataIndex: 'nodeNo',
    },
    {
      title: '用户',
      dataIndex: 'mobile',
    },
    {
      title: '收币地址',
      search: false,
      dataIndex: 'toAddress',
      renderText: (text) => {
        return (
          <Tooltip title={text}>
            <span>{formatAddress(text)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '数量(FIL)',
      search: false,
      dataIndex: 'amount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '发起时间',
      search: false,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      renderText: (text) => {
        return (
          <a
            onClick={() => {
              setActiveOrder(text);
              setVisible(true);
            }}
          >
            审核
          </a>
        );
      },
    },
  ];

  return (
    <>
      <ProTable<Banner.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          // console.log(params, 'parmas');
          return OwnerService.customerNodeWithdrawList({
            filterBy: 'state',
            filter: 'pending',
          }).then((res: any) => {
            return {
              data: res,
            };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="withdrawNo"
        // search={{
        //   labelWidth: 'auto',
        // }}
        search={false}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="number"
        // headerTitle="高级表格"
        toolBarRender={() => []}
      />
      <Modal
        title="提币审核"
        width={500}
        centered
        visible={visible}
        footer={[
          <Button key="back" type="primary" onClick={handleOk}>
            通过
          </Button>,
          <Button key="submit" onClick={handleCancel}>
            不通过
          </Button>,
        ]}
        wrapClassName={styles.modal}
        onOk={handleOk}
        onCancel={onCancel}
      >
        <ul>
          <li>
            <div>流水号</div>
            <div className={styles.value}>{activeOrder.withdrawNo}</div>
          </li>
          <li>
            <div>节点号</div>
            <div className={styles.value}>{activeOrder.nodeNo}</div>
          </li>
          <li>
            <div>收币地址</div>
            <div className={styles.value}>
              <Tooltip title={activeOrder.toAddress}>
                <span
                  className={styles.tool_color}
                  onClick={() => dropThirdBrowser(activeOrder.toAddress)}
                >
                  {formatAddress(activeOrder.toAddress)}
                </span>
              </Tooltip>
            </div>
          </li>
          <li>
            <div>数量(FIL)</div>
            <div className={styles.value}>{transformFIL(activeOrder.amount)}</div>
          </li>
          {/* <li>
            <div>手续费</div>
            <div className={styles.value}>0.04</div>
          </li> */}
          <li>
            <div>备注</div>
            <div>
              <TextArea rows={3} value={comment} onChange={handleRefuse} />
            </div>
          </li>
        </ul>
      </Modal>
    </>
  );
};

export default WithdrawStayCheck;
