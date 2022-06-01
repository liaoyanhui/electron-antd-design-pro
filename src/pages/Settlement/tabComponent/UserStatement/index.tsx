/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-09-13 09:39:17
 * @LastEditTime: 2021-12-29 14:34:53
 * @FilePath: /mining-admin-desktop/src/pages/Settlement/tabComponent/UserStatement/index.tsx
 */
import React, { useRef, useState } from 'react';
import { history, useModel } from 'umi';
// import { PlusOutlined } from '@ant-design/icons';
import { transformFIL } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FilecoinService } from '@/services';
import { Tooltip, Button } from 'antd';
import { formatAddress } from '@/utils/utils';
import { CSVLink } from 'react-csv';
import { convertUTCTimeToLocalTime } from '@/utils/utils';

const UserStatement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { statement, setStatement } = useModel('useStatement');

  const [csvData, setCsvData] = useState<any>([]);

  // 格式化导出数据csv
  const formatArr = (arr: any[]) => {
    const newArr: any[] = [
      [
        '结算单',
        '理论收益(FIL)',
        '锁仓(FIL)',
        '立刻释放(FIL)',
        '历史释放(FIL)',
        '总锁仓(FIL)',
        '服务费(FIL)',
        '本次结算(FIL)',
        '结算日期',
        '创建时间',
        '状态',
      ],
    ];
    arr.forEach((item: any) => {
      newArr.push([
        item.settlementNo,
        transformFIL(item.rewardAmount),
        transformFIL(item.vestingAmount),
        transformFIL(item.settledAmount - item.vestingUnlockAmount),
        transformFIL(item.vestingUnlockAmount),
        transformFIL(item.totalVestingAmount),
        transformFIL(item.serviceFeeAmount),
        transformFIL(item.settledAmount),
        convertUTCTimeToLocalTime(item.settleDay),
        convertUTCTimeToLocalTime(item.confirmedAt),
        // eslint-disable-next-line no-nested-ternary
        item.state === 'confirmed' ? '已发放' : item.state === 'created' ? '未生效' : '已废弃',
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
    {
      title: '总锁仓(FIL)',
      search: false,
      dataIndex: 'totalVestingAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
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
      dataIndex: 'confirmedAt',
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
              key="check"
              onClick={() => {
                setStatement(text);
                history.push(
                  `/settlement/settled/userStatementCheck?settlementNo=${text.settlementNo}`,
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
          return FilecoinService.getFilecoinSettlementList({
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
          <CSVLink data={csvData} filename="用户收益列表.csv" target="_blank">
            <Button key="button" type="primary">
              导出 CSV
            </Button>
          </CSVLink>,
        ]}
      />
    </>
  );
};

export default UserStatement;
