/*
 * @Description: 查看结算单
 * @Author: 尚夏
 * @Date: 2021-08-27 14:55:13
 * @LastEditTime: 2021-08-27 19:30:29
 * @FilePath: /mining-admin-desktop/src/pages/Settlement/tabComponent/Statements/CheckStatement.tsx
 */

import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import styles from './index.less';

const CheckStatement: React.FC = () => {
  const [commodityList, setCommodityList] = useState<any>([1, 3]);
  return (
    <PageContainer
      header={{
        breadcrumbRender: (params) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      <div className={styles.checkStatement}>
        <h1>结算单</h1>
        <div className={styles.total_box}>
          <div className={styles.total_title}>
            <span>NO.00001</span>
            <span>日期 2021-08-12</span>
          </div>
          <div className={styles.total_line}></div>
          <div className={styles.total_table}>
            <ul>
              <li>商品</li>
              <li>收益比</li>
              <li>用户数</li>
              <li>存储算力(T)</li>
              <li style={{ flex: 2 }}>昨日收益</li>
              <li>解锁</li>
              <li>本次结算(FIL)</li>
            </ul>
            <ul>
              <li>3</li>
              <li>\</li>
              <li>152</li>
              <li>10000</li>
              <li>锁仓</li>
              <li>解锁</li>
              <li>\</li>
              <li>327000.0000</li>
            </ul>
          </div>
        </div>
        {commodityList &&
          commodityList.map((item: any, index: number) => {
            return (
              <div className={styles.commodity_table} key={index}>
                <div className={styles.commodity_name}>
                  <span>商品名称</span>
                  <span className={styles.detail}>详情</span>
                </div>
                <div className={styles.ul_box}>
                  <ul>
                    <li>用户</li>
                    <li>80</li>
                    <li>100</li>
                    <li>5000</li>
                    <li>3100000</li>
                    <li>100000</li>
                    <li>100000</li>
                    <li>100000</li>
                  </ul>
                  <ul>
                    <li>平台</li>
                    <li>80</li>
                    <li>100</li>
                    <li>5000</li>
                    <li>3100000</li>
                    <li>100000</li>
                    <li>100000</li>
                    <li>100000</li>
                  </ul>
                  <ul>
                    <li>服务费</li>
                    <li>80</li>
                    <li>100</li>
                    <li>5000</li>
                    <li>3100000</li>
                    <li>100000</li>
                    <li>100000</li>
                    <li>100000</li>
                  </ul>
                </div>
                <ul className={styles.commodity_total}>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li>3100000</li>
                  <li>100000</li>
                  <li>100000</li>
                  <li>100000</li>
                </ul>
              </div>
            );
          })}
        <div className={styles.statement_bottom}>
          <div className={styles.data}>
            <span className={styles.bottom_title}>用户</span>
            <span className={styles.bottom_number}>12.00221000</span>
          </div>
          <div className={styles.data}>
            <span className={styles.bottom_title}>平台</span>
            <span className={styles.bottom_number}>3.00221000</span>
          </div>
          <div className={styles.data}>
            <span className={styles.bottom_title}>服务费</span>
            <span className={styles.bottom_number}>674.00221000</span>
          </div>
          <div className={styles.bold_line}></div>
          <div className={styles.small_line}></div>
          <div className={styles.total_total}>
            <span className={styles.bottom_title}>总计</span>
            <span>329386741.00000000</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CheckStatement;
