/*
 * @Description: 超级平台
 * @Author: 尚夏
 * @Date: 2021-08-11 15:16:24
 * @LastEditTime: 2021-08-13 13:34:01
 * @FilePath: /mining-admin-desktop/src/pages/OwnHomePage/index.tsx
 */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Menu, Dropdown } from 'antd';
import styles from './index.less';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { history, useModel } from 'umi';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { OwnerService } from '@/services';
import { setStore } from '@/utils/utils';

const OwnHomePage: React.FC = () => {
  const [platformList, setPlatformList] = useState<any>([]);
  const { initialState, setInitialState } = useModel('@@initialState');
  useEffect(() => {
    // OwnerService.getPlatformList().then((res: any) => {
    //   setPlatformList(res);
    // });
  }, []);

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
      <div className={styles.home_page}>
        <div className={styles.home_page_header}>
          <Card>
            {/* <div>
                  <p>存储(PB)</p>
                  <div>10.1234</div>
                  <div>周占比 10%</div>
                </div> */}
          </Card>
          <Card loading={true}>123</Card>
          <Card loading={true}>123</Card>
          <Card loading={true}>123</Card>
        </div>
        <div className={styles.home_page_line}>
          <Card></Card>
        </div>
        <div className={styles.home_page_agency_list}>
          {platformList &&
            platformList.map((item: any, index: number) => {
              return (
                <Card
                  // extra={
                  //   <Dropdown
                  //     overlay={
                  //       <Menu>
                  //         <Menu.Item>
                  //           {true ? (
                  //             <span onClick={() => console.log('ting')}>停用</span>
                  //           ) : (
                  //             <span onClick={() => console.log('qiyong')}>启用</span>
                  //           )}
                  //         </Menu.Item>
                  //       </Menu>
                  //     }
                  //     placement="bottomCenter"
                  //     arrow
                  //   >
                  //     <EllipsisOutlined style={{ cursor: 'pointer', fontSize: 20 }} />
                  //   </Dropdown>
                  // }
                  key={index}
                  bodyStyle={{ cursor: 'pointer' }}
                  onClick={() => changePlatform(item)}
                  title={
                    <div>
                      <span>{item.name}</span>
                      {/* <span>15.5 P</span> */}
                    </div>
                  }
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
              );
            })}

          <Card>
            <div className={styles.home_page_add}>
              <PlusOutlined style={{ fontSize: 30, fontWeight: 'bold' }} />
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default OwnHomePage;
