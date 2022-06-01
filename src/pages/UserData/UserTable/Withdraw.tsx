/*
 * @Description: 提现
 * @Author: 尚夏
 * @Date: 2021-07-27 16:56:31
 * @LastEditTime: 2022-01-07 17:49:16
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserTable/Withdraw.tsx
 */
import React, { useRef, useState } from 'react';
import styles from './index.less';
import { Button, Modal, Input, Tooltip } from 'antd';
import { formatAddress, transformFIL } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FilecoinService } from '@/services';

const { shell } = window.require('electron');
const { TextArea } = Input;

const Withdraw: React.FC<{
  userId: any;
}> = (props) => {
  const actionRef = useRef<ActionType>();
  const { userId } = props;
  const [visible, setVisible] = useState<boolean>(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setVisible(false);
  };

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '流水号',
      dataIndex: 'Id',
      // render: (_) => <a>{_}</a>,
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
    {
      title: '通过时间',
      search: false,
      dataIndex: 'completedAt',
      valueType: 'dateTime',
    },
    {
      title: 'MassageID',
      search: false,
      dataIndex: 'messageId',
      // width: 160,
      renderText: (text) => {
        if (text) {
          return (
            <Tooltip title={text}>
              <span
                className={styles.tool_color}
                onClick={() => shell.openExternal(`https://filfox.info/zh/message${text}`)}
              >
                {formatAddress(text)}
              </span>
            </Tooltip>
          );
        }
        return '-';
      },
    },
    {
      title: '备注',
      search: false,
      dataIndex: 'internalComment',
    },

    {
      title: '状态',
      dataIndex: 'state',
      valueEnum: {
        pending: {
          text: '待审核',
        },
        processing: {
          text: '待打币',
        },
        completed: {
          text: '已打币',
        },
        refused: {
          text: '未通过',
        },
      },
    },
  ];

  const headerTitle = () => {
    return (
      <>
        <ul className={styles.header_title}>
          <li>
            <span>累计提现(FIL)</span>
            <span className={styles.table_field}>19382</span>
          </li>
          <li>
            <span>提现手续费(FIL)</span>
            <span className={styles.table_field}>19382</span>
          </li>
        </ul>
      </>
    );
  };

  return (
    <>
      <ProTable<Banner.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        // headerTitle={headerTitle()}
        request={async (params = {}, sort, filter) => {
          return FilecoinService.getFilecoinWithdrawList({
            filterBy: 'customer',
            filter: userId,
          }).then((res: any) => {
            return {
              data: res || [],
            };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="Id"
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
        onCancel={handleCancel}
      >
        <ul>
          <li>
            <div>流水号</div>
            <div className={styles.value}>yisj1293880999</div>
          </li>
          <li>
            <div>用户</div>
            <div className={styles.value}>13892846492</div>
          </li>
          <li>
            <div>收币地址</div>
            <div className={styles.value}>mmnsjjljsslncndjjddddssdasdf</div>
          </li>
          <li>
            <div>数量</div>
            <div className={styles.value}>2083694</div>
          </li>
          <li>
            <div>手续费</div>
            <div className={styles.value}>0.04</div>
          </li>
          <li>
            <div>不通过原因</div>
            <div>
              <TextArea rows={3} />
            </div>
          </li>
        </ul>
      </Modal>
    </>
  );
};

export default Withdraw;
