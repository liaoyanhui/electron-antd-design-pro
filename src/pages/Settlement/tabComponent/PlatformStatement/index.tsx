/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-09-13 09:52:03
 * @LastEditTime: 2021-12-02 17:51:03
 * @FilePath: /mining-admin-desktop/src/pages/Settlement/tabComponent/PlatformStatement/index.tsx
 */
import React, { useRef, useState } from 'react';
import { history, useModel } from 'umi';
import { transformFIL } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FilecoinService } from '@/services';
import { Tooltip, Button } from 'antd';
import { formatAddress } from '@/utils/utils';
import { CSVLink } from 'react-csv';
import { convertUTCTimeToLocalTime } from '@/utils/utils';

const PlatformStatement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { statement, setStatement } = useModel('useStatement');

  const [csvData, setCsvData] = useState<any>([]);

  // 格式化导出数据csv
  const formatArr = (arr: any[]) => {
    const newArr: any[] = [
      [
        '结算单',
        '商品',
        '存储(FIL)',
        '锁仓(FIL)',
        '立刻释放(FIL)',
        '历史释放(FIL)',
        '总锁仓(FIL)',
        '技术费(%)',
        '本次结算(FIL)',
        '结算日期',
      ],
    ];
    arr.forEach((item: any) => {
      newArr.push([
        item.settlementNo,
        item.products.length,
        item.storage,
        transformFIL(item.vestingAmount),
        transformFIL(item.settledAmount - item.vestingUnlockAmount),
        transformFIL(item.vestingUnlockAmount),
        transformFIL(item.totalVestingAmount),
        item.serviceFeePercent / 10,
        transformFIL(item.settledAmount),
        convertUTCTimeToLocalTime(item.settleDay),
      ]);
    });
    setCsvData([...newArr]);
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
    {
      title: '总锁仓(FIL)',
      search: false,
      dataIndex: 'totalVestingAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
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
      key: 'option',
      valueType: 'option',
      renderText: (text) => {
        return (
          <>
            <a
              key="check"
              onClick={() => {
                setStatement(text);
                history.push(
                  `/settlement/settled/platformStatementCheck?settlementNo=${text.settlementNo}`,
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
            filter: 'confirmed',
          }).then((res: any) => {
            formatArr(res || []);
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
          <CSVLink data={csvData} filename="平台收益列表.csv" target="_blank">
            <Button key="button" type="primary">
              导出 CSV
            </Button>
          </CSVLink>,
        ]}
      />
    </>
  );
};

export default PlatformStatement;
