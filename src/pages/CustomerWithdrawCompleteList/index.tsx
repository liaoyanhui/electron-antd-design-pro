/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-12-06 11:08:08
 * @LastEditTime: 2022-01-05 15:35:22
 * @FilePath: /mining-admin-desktop/src/pages/CustomerWithdrawCompleteList/index.tsx
 */

import React, { useRef, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { transformFIL, formatAddress, dropThirdBrowser } from '@/utils/utils';
import moment from 'moment';
import { Tooltip } from 'antd';
import styles from './index.less';

// service
import { OwnerService } from '@/services';

const CustomerWithdrawCompleteList: React.FC<{
  // dispatch: Dispatch;
}> = () => {
  const actionRef = useRef<ActionType>();

  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    OwnerService.getPlatformList().then((res: any) => {
      if (res) {
        const newArr = res.map((item: any) => {
          return {
            label: item.name,
            value: item.Id,
          };
        });
        setList([...newArr]);
      }
    });
  }, []);

  const columns: ProColumns<Notice.FormProps>[] = [
    {
      title: '流水号',
      search: false,
      dataIndex: 'withdrawNo',
    },
    {
      title: '平台',
      dataIndex: 'platformName',
      valueType: 'select',
      fieldProps: {
        options: [...list],
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '用户',
      search: false,
      dataIndex: 'customerName',
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
      title: 'MassageID',
      search: false,
      dataIndex: 'messageId',
      // width: 160,
      renderText: (text) => {
        return (
          <Tooltip title={text}>
            <span className={styles.tool_color} onClick={() => dropThirdBrowser(text)}>
              {formatAddress(text)}
            </span>
          </Tooltip>
        );
      },
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
          if (params.platformName) {
            return OwnerService.getOwnerPlatformCustomerFileCoinWithdrawCompleteList({
              platformId: params.platformName,
            }).then((res: any) => {
              return { data: res };
            });
          }
          return {
            data: [],
          };
        }}
        options={{
          density: false,
        }}
        rowKey="Id"
        // search={false}
        form={{
          ignoreRules: false,
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        // headerTitle="高级表格"
        toolBarRender={() => []}
      />
    </PageContainer>
  );
};

export default CustomerWithdrawCompleteList;
