/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-12-01 16:39:38
 * @LastEditTime: 2022-02-17 14:44:48
 * @FilePath: /mining-admin-desktop/src/pages/ProfitesStatistics/index.tsx
 */

import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
// import styles from './index.less';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { transformFIL } from '@/utils/utils';
import moment from 'moment';
import { Button } from 'antd';
import { CSVLink } from 'react-csv';
import { convertUTCTimeToLocalTime } from '@/utils/utils';

// service
import { OwnerService } from '@/services';

const ProfitesStatistics: React.FC<{
  // dispatch: Dispatch;
}> = () => {
  const actionRef = useRef<ActionType>();

  const [csvData, setCsvData] = useState<any>([]);

  // 格式化导出数据csv
  const formatArr = (arr: any[]) => {
    const newArr: any[] = [['平台名称', '用户收益', '商务收益', '平台收益', '总收益', '结算时间']];
    arr.forEach((item: any) => {
      newArr.push([
        item.platformName,
        transformFIL(item.customerAmount),
        transformFIL(item.referrerAmunt),
        transformFIL(item.platformAmount),
        transformFIL(item.customerAmount + item.referrerAmunt + item.platformAmount),
        convertUTCTimeToLocalTime(item.settleDay),
      ]);
    });
    setCsvData([...newArr]);
  };

  const columns: ProColumns<Notice.FormProps>[] = [
    {
      title: '平台名称',
      search: false,
      dataIndex: 'platformName',
    },
    {
      title: '用户收益',
      search: false,
      dataIndex: 'customerAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '商务收益',
      search: false,
      dataIndex: 'referrerAmunt',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '平台收益',
      search: false,
      dataIndex: 'platformAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '总收益',
      search: false,
      renderText: (text) => {
        return transformFIL(text.customerAmount + text.referrerAmunt + text.platformAmount);
      },
    },
    {
      title: '结算时间',
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
          return OwnerService.getOwnerPlatformFileCoinProfitesList({
            data: {
              settleDayAt: params.settleDay || moment(new Date()).format('YYYY-MM-DD'),
            },
          }).then((res: any) => {
            formatArr(res || []);
            return { data: res };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="platformId"
        // search={false}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        // headerTitle="高级表格"
        toolBarRender={() => [
          <CSVLink data={csvData} filename="收益统计.csv" target="_blank">
            <Button key="button" type="primary">
              导出 CSV
            </Button>
          </CSVLink>,
        ]}
      />
    </PageContainer>
  );
};

export default ProfitesStatistics;
