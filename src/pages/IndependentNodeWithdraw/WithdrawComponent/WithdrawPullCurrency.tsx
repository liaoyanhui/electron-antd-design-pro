/*
 * @Description: 打币
 * @Author: 尚夏
 * @Date: 2021-07-27 16:56:31
 * @LastEditTime: 2022-01-07 14:22:23
 * @FilePath: /mining-admin-desktop/src/pages/IndependentNodeWithdraw/WithdrawComponent/WithdrawPullCurrency.tsx
 */
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Modal, Input, Tooltip, message } from 'antd';
import styles from '../index.less';
import { formatAddress, dropThirdBrowser, transformFIL } from '@/utils/utils';
import { FilecoinService, OwnerService } from '@/services';

const { shell } = window.require('electron');

const WithdrawPullCurrency: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<any>({});

  // messageId
  const [messageId, setMessageId] = useState<string>('');
  const handleMessageId = (e: any) => {
    setMessageId(e.target.value);
  };

  // 确认
  const handleOk = () => {
    OwnerService.customerNodeWithdrawComplete(
      { withdrawNo: activeOrder.withdrawNo },
      {
        data: {
          messageId,
        },
      },
    ).then((res: any) => {
      if (res) {
        setVisible(false);
        actionRef.current?.reload();
        setActiveOrder({});
        setMessageId('');
      }
    });
  };

  // 取消
  const handleCancel = () => {
    setMessageId('');
    setActiveOrder({});
    setVisible(false);
  };

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '流水号',
      dataIndex: 'withdrawNo',
      // render: (_) => <a>{_}</a>,
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
      // width: 200,
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
    // {
    //   title: '手续费(FIL)',
    //   search: false,
    //   dataIndex: 'serviceCharge',
    // },
    {
      title: '发起时间',
      search: false,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },

    // {
    //   title: 'MassageID',
    //   search: false,
    //   dataIndex: 'messageId',
    //   // width: 160,
    //   renderText: (text) => {
    //     return (
    //       <Tooltip title={text}>
    //         <span className={styles.tool_color} onClick={() => dropThirdBrowser(text)}>
    //           {formatAddress(text)}
    //         </span>
    //       </Tooltip>
    //     );
    //   },
    // },
    {
      title: '备注',
      search: false,
      dataIndex: 'internalComment',
      renderText: (text) => {
        return (
          <Tooltip title={text}>
            <span>{formatAddress(text)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '操作',
      // width: 164,
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
            打币
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
            filter: 'processing',
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
        title="确认打币"
        width={500}
        centered
        visible={visible}
        wrapClassName={styles.modal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ul>
          <li>
            <div>节点号</div>
            <div className={styles.value}>{activeOrder.nodeNo}</div>
          </li>
          <li>
            <div>数量</div>
            <div className={styles.value}>{transformFIL(activeOrder.amount)}</div>
          </li>
          <li>
            <div>MessageID</div>
            <div>
              <Input value={messageId} onChange={handleMessageId} />
            </div>
          </li>
        </ul>
      </Modal>
    </>
  );
};

export default WithdrawPullCurrency;
