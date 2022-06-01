/* eslint-disable no-param-reassign */
/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2022-04-08 17:02:17
 * @LastEditTime: 2022-04-11 11:29:05
 * @FilePath: /mining-admin-desktop/src/pages/NewestSettlementList/index.tsx
 */
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import styles from './index.less';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { transformFIL, formatAddress } from '@/utils/utils';
import moment from 'moment';
import { Button, Tooltip } from 'antd';
// import { CSVLink } from 'react-csv';
// import { convertUTCTimeToLocalTime } from '@/utils/utils';

// service
import { OwnerService } from '@/services';

interface Total {
  totalSettledAmount: number;
  totalVestingAmount: number;
  totalTotalVestingAmount: number;
  totalVestingUnlockAmount: number;
  // totalVestingAmount: number;
}
const ProfitesStatistics: React.FC<{
  // dispatch: Dispatch;
}> = () => {
  const actionRef = useRef<ActionType>();
  const [totalList, setTotalList] = useState<Total>();
  // const [csvData, setCsvData] = useState<any>([]);

  // 格式化导出数据csv
  // const formatArr = (arr: any[]) => {
  //   const newArr: any[] = [['平台名称', '用户收益', '商务收益', '平台收益', '总收益', '结算时间']];
  //   arr.forEach((item: any) => {
  //     newArr.push([
  //       item.platformName,
  //       transformFIL(item.customerAmount),
  //       transformFIL(item.referrerAmunt),
  //       transformFIL(item.platformAmount),
  //       transformFIL(item.customerAmount + item.referrerAmunt + item.platformAmount),
  //       convertUTCTimeToLocalTime(item.settleDay),
  //     ]);
  //   });
  //   setCsvData([...newArr]);
  // };

  /**
   * @description: 格式化结算单数据 返回列表需要的数据
   * 根据customer 同时加上 platform 和 referrer 内的数据
   * @param {*}
   * @return {*}
   */

  const formatList = (data: Record<string, unknown>) => {
    const customerList: any = data.customer || [];
    const referrerList: any = data.referrer || [];
    const platformList: any = data.platform || [];

    if (customerList) {
      let list: any[] = [];
      list = customerList.map((item: any) => {
        const rItem = referrerList.filter(
          (ri: any) =>
            ri.platformName === item.platformName && ri.settlementNo === item.settlementNo,
        );
        if (rItem[0]) {
          item.settledAmount += rItem[0].settledAmount;
          item.vestingAmount += rItem[0].vestingAmount;
          item.totalVestingAmount += rItem[0].totalVestingAmount;
          item.vestingUnlockAmount += rItem[0].vestingUnlockAmount;
        }

        const pItem = platformList.filter(
          (pi: any) =>
            pi.platformName === item.platformName && pi.settlementNo === item.settlementNo,
        );
        if (pItem[0]) {
          item.settledAmount += pItem[0].settledAmount;
          item.vestingAmount += pItem[0].vestingAmount;
          item.totalVestingAmount += pItem[0].totalVestingAmount;
          item.vestingUnlockAmount += pItem[0].vestingUnlockAmount;
        }

        return item;
      });
      const l = {
        totalSettledAmount: 0,
        totalVestingAmount: 0,
        totalTotalVestingAmount: 0,
        totalVestingUnlockAmount: 0,
      };

      if (list) {
        list.forEach((i: any) => {
          l.totalSettledAmount += i.settledAmount;
          l.totalVestingAmount += i.vestingAmount;
          l.totalTotalVestingAmount += i.totalVestingAmount;
          l.totalVestingUnlockAmount += i.vestingUnlockAmount;
        });
      }

      setTotalList({ ...l });
      return list || [];
    }
    return [];
  };

  // 总统计数据
  const headerTitle = () => {
    return (
      <>
        <ul className={styles.header_title}>
          <li>
            <span>锁仓</span>
            <span className={styles.table_field}>
              {totalList && transformFIL(totalList.totalVestingAmount)}
            </span>
          </li>
          <li>
            <span>立刻释放</span>
            <span className={styles.table_field}>
              {totalList &&
                transformFIL(totalList.totalSettledAmount - totalList.totalVestingUnlockAmount)}
            </span>
          </li>
          <li>
            <span>历史释放</span>
            <span className={styles.table_field}>
              {totalList && transformFIL(totalList.totalVestingUnlockAmount)}
            </span>
          </li>
          <li>
            <span>总锁仓</span>
            <span className={styles.table_field}>
              {totalList && transformFIL(totalList.totalTotalVestingAmount)}
            </span>
          </li>
          <li>
            <span>本次结算</span>
            <span className={styles.table_field}>
              {totalList && transformFIL(totalList.totalSettledAmount)}
            </span>
          </li>
        </ul>
      </>
    );
  };

  const columns: ProColumns<Notice.FormProps>[] = [
    {
      title: '平台名称',
      search: false,
      dataIndex: 'platformName',
    },
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
          // console.log(params, 'sddd');
          // console.log(moment(new Date()).format('YYYY-MM-DD'));
          return OwnerService.getNewestSettlementList().then((res: any) => {
            // console.log(res);
            const list = formatList(res || {});

            return { data: list };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="platformName"
        // search={false}
        pagination={{
          pageSize: 20,
        }}
        dateFormatter="string"
        headerTitle={headerTitle()}
        toolBarRender={() => [
          // <CSVLink data={csvData} filename="收益统计.csv" target="_blank">
          //   <Button key="button" type="primary">
          //     导出 CSV
          //   </Button>
          // </CSVLink>,
        ]}
      />
    </PageContainer>
  );
};

export default ProfitesStatistics;
