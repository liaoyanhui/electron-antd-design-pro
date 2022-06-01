/*
 * @Description: 用户查看
 * @Author: 尚夏
 * @Date: 2021-09-12 15:08:39
 * @LastEditTime: 2021-12-02 15:58:53
 * @FilePath: /mining-admin-desktop/src/pages/SettlementDetail/UserCheck.tsx
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

const UserCheck: React.FC = () => {
  const printRef = useRef<any>(null);
  const [data, setData] = useState<any>({});

  const [csvData, setCsvData] = useState<any>([]);
  // 格式化数据 用来导出csv
  const formatArr = (arr: any[]) => {
    const newArr: any[] = [
      [
        '用户',
        '订单-商品',
        '存储(T)',
        '理论收益',
        '立刻释放',
        '锁仓',
        '历史释放',
        '总锁仓',
        '服务费',
        '本次结算',
      ],
    ];
    arr.forEach((item: any) => {
      newArr.push([
        item.customerMobile,
        '',
        item.storage,
        transformFIL(item.rewardAmount),
        transformFIL(item.settledAmount - item.vestingUnlockAmount),
        transformFIL(item.vestingAmount),
        transformFIL(item.vestingUnlockAmount),
        transformFIL(item.totalVestingAmount),
        transformFIL(item.serviceFeeAmount),
        transformFIL(item.settledAmount, 8),
      ]);
      if (item.orders) {
        item.orders.forEach((c: any) => {
          newArr.push([
            '',
            c.productName,
            c.storage,
            transformFIL(c.rewardAmount),
            transformFIL(c.settledAmount - c.vestingUnlockAmount),
            transformFIL(c.vestingAmount),
            transformFIL(c.vestingUnlockAmount),
            transformFIL(c.totalVestingAmount),
            transformFIL(c.serviceFeeAmount),
            transformFIL(c.settledAmount, 8),
          ]);
        });
      }
    });
    setCsvData([...newArr]);
  };

  useEffect(() => {
    const { settlementNo } = history.location.query as any;
    if (settlementNo) {
      FilecoinService.getFilecoinSettlement(settlementNo, {
        filterBy: 'all',
      }).then((res: any) => {
        setData(res);
        const arr = res.customers || [];
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
          <CSVLink data={csvData} filename="用户收益明细.csv" target="_blank">
            <Button type="primary">导出 CSV</Button>
          </CSVLink>
        </div>
        <div className={styles.checkStatement} ref={printRef}>
          <div className={styles.total_box}>
            <div className={styles.total_title}>
              <span>{data.settlementNo}</span>
              <span style={{ fontSize: 14 }}>用户收益明细</span>
              <div>
                <div>结算日:{convertUTCTimeToLocalTime(data.settleDay, true)}</div>
                <div>24h每T收益: {transformFIL(data.latest24hMiningEfficiency, 8)}</div>
              </div>
              {/* <span></span> */}
            </div>
            <div className={styles.total_line}></div>
            <div className={styles.total_table}>
              <ul>
                <li>用户</li>
                <li>订单-商品</li>
                <li>存储(T)</li>
                <li>理论收益</li>
                <li>立刻释放</li>
                <li>锁仓</li>
                <li>历史释放</li>
                <li>总锁仓</li>
                <li>服务费</li>
                <li>本次结算</li>
              </ul>
            </div>
          </div>
          <div className={styles.data}>
            {data.customers &&
              data.customers.map((item: any, index: number) => {
                return (
                  <div className={styles.commodity_table} key={index}>
                    <ul className={styles.statistics}>
                      <li className={styles.mobile}>{item.customerMobile}</li>
                      <li></li>
                      <li>{item.storage}</li>
                      <li>{transformFIL(item.rewardAmount)}</li>
                      <li>{transformFIL(item.settledAmount - item.vestingUnlockAmount)}</li>
                      <li>{transformFIL(item.vestingAmount)}</li>
                      <li>{transformFIL(item.vestingUnlockAmount)}</li>
                      <li>{transformFIL(item.totalVestingAmount)}</li>
                      <li>{transformFIL(item.serviceFeeAmount)}</li>
                      <li>{transformFIL(item.settledAmount, 8)}</li>
                    </ul>

                    <div className={styles.ul_box}>
                      {item.orders &&
                        item.orders.map((childItem: any, childIndex: number) => {
                          return (
                            <ul key={childIndex}>
                              <li></li>
                              <li>{childItem.productName}</li>
                              <li>{childItem.storage}</li>
                              <li>{transformFIL(childItem.rewardAmount)}</li>
                              <li>
                                {transformFIL(
                                  childItem.settledAmount - childItem.vestingUnlockAmount,
                                )}
                              </li>
                              <li>{transformFIL(childItem.vestingAmount)}</li>
                              <li>{transformFIL(childItem.vestingUnlockAmount)}</li>
                              <li>{transformFIL(childItem.totalVestingAmount)}</li>
                              <li>{transformFIL(childItem.serviceFeeAmount)}</li>
                              <li>{transformFIL(childItem.settledAmount, 8)}</li>
                            </ul>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
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

export default UserCheck;
