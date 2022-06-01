/*
 * @Description: 待审核
 * @Author: 尚夏
 * @Date: 2021-11-05 14:22:12
 * @LastEditTime: 2021-11-09 15:30:36
 * @FilePath: /mining-admin-desktop/src/pages/WidthdrawRecord/components/StayCheck.tsx
 */

import React, { useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Tooltip, Button, message } from 'antd';
import { formatAddress, transformFIL, fileToEnd } from '@/utils/utils';
import { WithdrawRecord, PlatformService } from '@/services';
import WithdrawnAmount from '@/components/WithdrawnAmount';

const StayCheck: React.FC<{
  // address: string | null;
  // availableAmount?: string;
}> = (props) => {
  const actionRef = useRef<ActionType>();
  // const { address, availableAmount } = props;
  // const [visible, setVisible] = useState<boolean>(false);

  // const onCancel = () => {
  //   setVisible(false);
  // };

  // const onOk = (a: string, b: string, c: string) => {
  //   PlatformService.widthdrawApply({
  //     data: {
  //       amount: fileToEnd(a),
  //       verificationChallengeMethod: b,
  //       verificationChallengeResponse: c,
  //     },
  //   }).then((res) => {
  //     if (res) {
  //       onCancel();
  //       actionRef.current?.reload();
  //       message.success('操作成功！');
  //     }
  //   });
  // };

  // // 提现检查
  // const handleWithdraw = () => {
  //   if (address) {
  //     setVisible(true);
  //   } else {
  //     message.warning('请先去平台设置地址！');
  //   }
  // };

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '流水号',
      dataIndex: 'withdrawNo',
      // render: (_) => <a>{_}</a>,
    },
    {
      title: '平台',
      dataIndex: 'platformName',
    },
    // {
    //   title: '商务',
    //   search: false,
    //   dataIndex: 'agency',
    // },
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
  ];

  return (
    <>
      <ProTable<Banner.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          // console.log(params, 'parmas');
          return WithdrawRecord.getFilecoinWithdrawList({
            state: 'pending',
            // filter: 'pending',
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
        // toolBarRender={() => [
        //   <Button key="button" icon={<PlusOutlined />} type="primary" onClick={handleWithdraw}>
        //     提现
        //   </Button>,
        // ]}
      />
      {/* {data.availableAmount && (
        <WithdrawnAmount
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          address={address}
          availableAmount={data.availableAmount}
        />
      )} */}
    </>
  );
};

export default StayCheck;
