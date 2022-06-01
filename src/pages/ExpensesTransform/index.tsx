/*
 * @Description: 扣补
 * @Author: 尚夏
 * @Date: 2022-02-16 10:49:41
 * @LastEditTime: 2022-02-17 14:49:45
 * @FilePath: /mining-admin-desktop/src/pages/ExpensesTransform/index.tsx
 */

import React, { useRef, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { transformFIL, formatAddress, dropThirdBrowser } from '@/utils/utils';
import { Button, Tooltip } from 'antd';
import styles from './index.less';
import DeductModal from './component/DeductModal';
import { CSVLink } from 'react-csv';
import { convertUTCTimeToLocalTime } from '@/utils/utils';

// service
import { OwnerService } from '@/services';

const ExpensesTransform: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();

  const [csvData, setCsvData] = useState<any>([]);

  // 格式化导出数据csv
  const formatArr = (arr: any[]) => {
    const newArr: any[] = [
      ['流水号', '平台', '用户', '备注名', '数量', '类型', '时间', '原因', '备注', '状态'],
    ];
    arr.forEach((item: any) => {
      newArr.push([
        item.expensesNo,
        item.platformName,
        item.mobile,
        item.internalRemarksName,
        transformFIL(item.expensesAmount),
        item.expensesType === 'deduct' ? '扣费' : '补贴',
        convertUTCTimeToLocalTime(item.createdAt),
        item.reason,
        item.comment,
        item.state === 'deducted' ? '已扣除' : '已补贴',
      ]);
    });
    setCsvData([...newArr]);
  };

  // 扣费
  const [visible, setVisible] = useState<boolean>(false);
  const handleClickDeduct = () => {
    setVisible(true);
  };

  const handleDeductCancel = () => {
    setVisible(false);
  };

  const handleDeductOk = (data: any) => {
    OwnerService.addCustomerExpenses({
      data: {
        ...data,
      },
    }).then((res: any) => {
      if (res) {
        handleDeductCancel();
        actionRef.current?.reload();
      }
    });
  };

  const columns: ProColumns<Notice.FormProps>[] = [
    {
      title: '流水号',
      search: false,
      dataIndex: 'expensesNo',
      renderText: (text) => {
        return (
          <Tooltip title={text}>
            <span>{formatAddress(text)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '平台',
      search: false,
      dataIndex: 'platformName',
    },
    {
      title: '用户',
      // search: false,
      dataIndex: 'mobile',
    },
    {
      title: '备注名',
      search: false,
      dataIndex: 'internalRemarksName',
    },
    {
      title: '数量(FIL)',
      search: false,
      dataIndex: 'expensesAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '类型',
      search: false,
      dataIndex: 'expensesType',
      valueEnum: {
        deduct: {
          text: '扣费',
        },
        subsidy: {
          text: '补贴',
        },
      },
    },
    {
      title: '时间',
      search: false,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '原因',
      search: false,
      dataIndex: 'reason',
    },
    {
      title: '备注',
      search: false,
      dataIndex: 'comment',
    },
    {
      title: '状态',
      search: false,
      dataIndex: 'state',
      valueEnum: {
        deducted: {
          text: '已扣除',
        },
        subsidied: {
          text: '已补贴',
        },
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
          if (params.mobile) {
            return OwnerService.getCustomerExpensesList({
              filterBy: 'mobile',
              filter: params.mobile,
            }).then((res: any) => {
              formatArr(res || []);
              return { data: res };
            });
          }
          return OwnerService.getCustomerExpensesList({
            filterBy: 'all',
          }).then((res: any) => {
            formatArr(res || []);
            return { data: res };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="expensesNo"
        // search={false}
        form={{
          ignoreRules: false,
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        // headerTitle="高级表格"
        toolBarRender={() => [
          // <Button key="subsidy" type="primary">
          //     补贴
          // </Button>,
          <Button key="deduct" type="primary" onClick={handleClickDeduct}>
            扣费
          </Button>,
          <CSVLink data={csvData} filename="补贴记录.csv" target="_blank">
            <Button key="button" type="primary">
              导出 CSV
            </Button>
          </CSVLink>,
        ]}
      />
      {visible && (
        <DeductModal
          visible={visible}
          handleOk={handleDeductOk}
          handleCancel={handleDeductCancel}
        />
      )}
    </PageContainer>
  );
};

export default ExpensesTransform;
