/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-09-13 09:32:13
 * @LastEditTime: 2021-11-30 10:42:10
 * @FilePath: /mining-admin-desktop/src/pages/SettlementDetail/PlatformCheck.tsx
 */
import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import styles from './index.less';
import { FilecoinService } from '@/services';
import { useEffect } from 'react';
import { history } from 'umi';
// import ReactToPrint from 'react-to-print';
import { convertUTCTimeToLocalTime, transformFIL } from '@/utils/utils';
import { CSVLink } from 'react-csv';

const PlatformCheck: React.FC = () => {
  const printRef = useRef<any>(null);
  const [data, setData] = useState<any>({});

  const [csvData, setCsvData] = useState<any>([]);
  // 格式化数据 用来导出csv
  const formatArr = (arr: any[]) => {
    const newArr: any[] = [
      ['商品', '存储(T)', '立刻释放', '锁仓', '历史释放', '总锁仓', '本次结算'],
    ];
    arr.forEach((item: any) => {
      newArr.push([
        item.productName,
        item.storage,
        transformFIL(item.settledAmount - item.vestingUnlockAmount),
        transformFIL(item.vestingAmount),
        transformFIL(item.vestingUnlockAmount),
        transformFIL(item.totalVestingAmount),
        transformFIL(item.settledAmount, 8),
      ]);
    });
    setCsvData([...newArr]);
  };

  useEffect(() => {
    const { settlementNo } = history.location.query as any;
    if (settlementNo) {
      FilecoinService.getFilecoinPlatformSettlement(settlementNo, {
        filterBy: 'all',
      }).then((res: any) => {
        setData(res);
        const arr = res.products || [];
        formatArr(arr);
      });
    }
  }, []);
  return (
    <PageContainer
      header={{
        breadcrumbRender: (params) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      <div className={styles.box}>
        <div className={styles.btn}>
          {/* <ReactToPrint
            trigger={() => <Button type="primary">打印 / 下载</Button>}
            content={() => printRef.current}
          /> */}
          <CSVLink data={csvData} filename="平台收益明细.csv" target="_blank">
            <Button type="primary">导出 CSV</Button>
          </CSVLink>
        </div>
        <div className={styles.checkStatement} ref={printRef}>
          <div className={styles.total_box}>
            <div className={styles.total_title}>
              <span>{data.settlementNo}</span>
              <span style={{ fontSize: 14 }}>平台收益明细</span>
              <div>
                <div>结算日:{convertUTCTimeToLocalTime(data.settleDay, true)}</div>
                {/* <div>24h每T收益: {transformFIL(data.latest24hMiningEfficiency, 8)}</div> */}
              </div>
            </div>
            <div className={styles.total_line}></div>
            <div className={styles.total_table}>
              <ul>
                <li>商品</li>
                <li>存储(T)</li>
                <li>立刻释放</li>
                <li>锁仓</li>
                <li>历史释放</li>
                <li>总锁仓</li>
                <li>本次结算</li>
              </ul>
            </div>
          </div>
          <div className={styles.data}>
            {data.products &&
              data.products.map((item: any, index: number) => {
                return (
                  <div className={styles.commodity_table} key={index}>
                    <ul className={styles.platform_ul}>
                      <li className={styles.mobile}>{item.productName}</li>
                      <li>{item.storage}</li>
                      <li>{transformFIL(item.settledAmount - item.vestingUnlockAmount)}</li>
                      <li>{transformFIL(item.vestingAmount)}</li>
                      <li>{transformFIL(item.vestingUnlockAmount)}</li>
                      <li>{transformFIL(item.totalVestingAmount)}</li>
                      <li>{transformFIL(item.settledAmount, 8)}</li>
                    </ul>
                  </div>
                );
              })}
            <ul className={styles.platform_total}>
              <li>{data.products && data.products.length}</li>
              <li>{data.storage}</li>
              <li>{transformFIL(data.settledAmount - data.vestingUnlockAmount)}</li>
              <li>{transformFIL(data.vestingAmount)}</li>
              <li>{transformFIL(data.vestingUnlockAmount)}</li>
              <li>{transformFIL(data.totalVestingAmount)}</li>
              <li>{transformFIL(data.settledAmount, 8)}</li>
            </ul>
          </div>
          <div className={styles.statement_bottom}>
            <div className={styles.bold_line}></div>
            <div className={styles.small_line}></div>
            <div className={styles.total_total}>
              <span className={styles.bottom_title}>总计发放：</span>
              <span>{transformFIL(data.settledAmount, 8)}</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default PlatformCheck;
