/*
 * @Description: 超级平台
 * @Author: 尚夏
 * @Date: 2021-10-19 14:26:14
 * @LastEditTime: 2022-03-17 09:57:44
 * @FilePath: /mining-admin-desktop/src/pages/HomePage/platform/SuperPlatform.tsx
 */

import React, { useEffect } from 'react';
import { history, useAccess, useModel } from 'umi';
import { Card, Dropdown, Menu, Tooltip } from 'antd';
import { StarOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import styles from '../index.less';
import { setStore, transformFIL } from '@/utils/utils';
import SuperCardList from '../components/SuperCardList';

const SuperPlatform: React.FC<{
  platformList: any[];
}> = (props) => {
  const { platformList } = props;
  const { initialState, setInitialState } = useModel('@@initialState');
  const { centerBool, setCenterBool } = useModel('useCenterModal');
  const { setPlatform } = useModel('usePlatform');

  // 编辑平台
  const handleEdit = (item: Record<string, unknown>) => {
    setPlatform(item);
    history.push('/homePage/editPlatform');
  };

  /**
   * @description: 切换平台
   * setInitialState 设置 用户信息
   * @param {any} item
   * @return {*}
   */
  const changePlatform = async (item: any) => {
    setStore('platformId', item.Id);
    setInitialState({
      ...initialState,
      platformId: String(item.Id),
    });
    history.push('/homePage');
    setCenterBool(false);
  };

  const showStar = (data: any) => {
    if (data.isDemoPlatform) {
      return (
        <>
          <Tooltip title="演示平台">
            <StarOutlined style={{ color: '#fbae17', marginLeft: 10 }} />
          </Tooltip>
        </>
      );
    }

    if (data.isSelfOperated) {
      return (
        <>
          <Tooltip title="自营平台">
            <StarOutlined style={{ color: '#1890ff', marginLeft: 10 }} />
            <StarOutlined style={{ color: '#1890ff', marginLeft: 5 }} />
            <StarOutlined style={{ color: '#1890ff', marginLeft: 5 }} />
            <StarOutlined style={{ color: '#1890ff', marginLeft: 5 }} />
            <StarOutlined style={{ color: '#1890ff', marginLeft: 5 }} />
          </Tooltip>
        </>
      );
    }
    return (
      <>
        <Tooltip title="其他平台">
          <StarOutlined style={{ color: '#ff0000', marginLeft: 10 }} />
          <StarOutlined style={{ color: '#ff0000', marginLeft: 5 }} />
          <StarOutlined style={{ color: '#ff0000', marginLeft: 5 }} />
        </Tooltip>
      </>
    );
  };

  return (
    <div className={styles.home_page}>
      <div className={styles.home_page_header}>
        <SuperCardList />
      </div>
      {/* <div className={styles.home_page_line}>
        <Card></Card>
      </div> */}
      {centerBool && (
        <div className={styles.home_page_agency_list}>
          {platformList &&
            platformList.map((item: any, index: number) => {
              return (
                <Card
                  extra={
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item key="edit">
                            <span onClick={() => handleEdit(item)}>编辑</span>
                          </Menu.Item>
                        </Menu>
                      }
                      placement="bottomCenter"
                      arrow
                    >
                      <EllipsisOutlined style={{ cursor: 'pointer', fontSize: 20 }} />
                    </Dropdown>
                  }
                  key={index}
                  bodyStyle={{ cursor: 'pointer' }}
                  title={
                    <div className={styles.platform_title}>
                      <span>{item.name}</span>
                      {/* <div className={styles.title_amount}>{item.platformData.sealedStorage} T</div>
                      <div className={styles.title_serviceAmount}>
                        技术费
                        <span>{transformFIL(item.platformData.serviceFeeAmount || 0, 4)}</span>
                      </div> */}
                      {showStar(item)}
                    </div>
                  }
                >
                  <ul className={styles.agency_ul} onClick={() => changePlatform(item)}>
                    {/* <li>
                      <div>
                        <span>用户</span>
                        <span>{item.platformData.customerCount || 0}</span>
                      </div>
                      <div>
                        <span>代理</span>
                        <span>{item.platformData.referrerCount || 0}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>质押</span>
                        <span>{transformFIL(item.platformData.sealPledgeAmount || 0, 1)}</span>
                      </div>
                      <div>
                        <span>封装Gas</span>
                        <span>{transformFIL(item.platformData.sealGasFeeAmount || 0, 1)}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>总收益</span>
                        <span>{transformFIL(item.platformData.totalAmount || 0, 1)}</span>
                      </div>
                      <div>
                        <span>已发放</span>
                        <span>{transformFIL(item.platformData.totalSettledAmount || 0, 1)}</span>
                      </div>
                      <div>
                        <span>锁仓</span>
                        <span>{transformFIL(item.platformData.totalVestingAmount || 0, 1)}</span>
                      </div>
                      <div>
                        <span>提现</span>
                        <span>{transformFIL(item.platformData.withdrawnAmount || 0, 1)}</span>
                      </div>
                    </li> */}
                  </ul>
                </Card>
              );
            })}

          <Card>
            <div
              className={styles.home_page_add}
              onClick={() => history.push('/homePage/createPlatform')}
            >
              <PlusOutlined style={{ fontSize: 30, fontWeight: 'bold' }} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SuperPlatform;
