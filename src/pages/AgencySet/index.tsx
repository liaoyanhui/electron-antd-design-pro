/*
 * @Description: 商务设置
 * @Author: 尚夏
 * @Date: 2021-07-30 14:28:02
 * @LastEditTime: 2022-01-13 10:17:31
 * @FilePath: /mining-admin-desktop/src/pages/AgencySet/index.tsx
 */

import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Menu, Dropdown } from 'antd';
import styles from './index.less';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { history } from 'umi';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const AgencySet: React.FC = () => {
  // 新增商务商
  const handleAdd = () => {
    history.push('/agencySet/addAgency');
  };

  // 设置
  const handleSet = () => {
    history.push('/agencySet/agencyMenu');
  };

  return (
    <PageContainer
      header={{
        breadcrumbRender: (params) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
    >
      <div className={styles.agency_list}>
        <Card
          extra={
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    {true ? (
                      <span onClick={() => console.log('ting')}>停用</span>
                    ) : (
                      <span onClick={() => console.log('qiyong')}>启用</span>
                    )}
                  </Menu.Item>
                </Menu>
              }
              placement="bottomCenter"
              arrow
            >
              <EllipsisOutlined style={{ cursor: 'pointer', fontSize: 20 }} />
            </Dropdown>
          }
          title={
            <div onClick={handleSet}>
              <span>云界网络</span>
              <span>15.5 P</span>
            </div>
          }
          style={{ cursor: 'pointer' }}
        >
          <ul className={styles.agency_ul}>
            <li>
              <div>
                <span>用户</span>
                <span>107</span>
              </div>
              <div>
                <span>商品</span>
                <span>4</span>
              </div>
            </li>
            <li>
              <div>
                <span>销售额</span>
                <span>155,000 CNY</span>
              </div>
              <div>
                <span>质押</span>
                <span>107 FIL</span>
              </div>
            </li>
            <li>
              <div>
                <span>收益</span>
                <span>107 FIL</span>
              </div>
              <div>
                <span>发放</span>
                <span>1078 FIL</span>
              </div>
              <div>
                <span>提现</span>
                <span>1078 FIL</span>
              </div>
            </li>
          </ul>
        </Card>
        <Card>
          <div className={styles.add} onClick={handleAdd}>
            <PlusOutlined style={{ fontSize: 30, fontWeight: 'bold' }} />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AgencySet;
