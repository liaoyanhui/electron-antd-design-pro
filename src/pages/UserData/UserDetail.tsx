/*
 * @Description: 用户详情
 * @Author: 尚夏
 * @Date: 2021-07-30 17:25:24
 * @LastEditTime: 2022-03-15 12:45:05
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserDetail.tsx
 */
import React, { useState, useEffect } from 'react';
import { history, useModel } from 'umi';
import { Divider, message } from 'antd';
import styles from './index.less';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import UserTable from './UserTable';
import { imgs } from '@/assets/images';
import { convertUTCTimeToLocalTime } from '@/utils/utils';
import { CustomerService, ReferrerService } from '@/services';
import BindModal from './component/BindModal';
import { transformFIL } from '@/utils/utils';

const UserDetail: React.FC = () => {
  const [showInfo, setShowInfo] = useState<boolean>(true);

  const [user, setUser] = useState<any>({});

  // store
  const { activeUser, setActiveUser } = useModel('useUser');

  // 获取用户详情
  const getUserDetail = () => {
    const userId = activeUser?.Id;
    if (userId) {
      CustomerService.getCustomerById({
        id: userId,
      }).then((res: any) => {
        if (res) {
          console.log(res, 'resss');

          setUser(res);
        }
      });
    }
  };

  useEffect(() => {
    const userId = activeUser?.Id;
    if (userId) {
      getUserDetail();
      // ReferrerService.getReferrerCustomerList({
      //   id: userId,
      // }).then((response: any) => {
      //   if (response) {
      //     const arr: any = [];
      //     response.forEach((item: any, index: number) => {
      //       if (index < 2) {
      //         arr.push(item.mobile);
      //       }
      //     });
      //     setBindList(arr.join(';'));
      //   }
      // });
    }
  }, []);

  const [visible, setVisible] = useState<boolean>(false);

  const handleBind = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = (referrerId: any) => {
    CustomerService.rebindCustomerReferrer(user.Id, {
      referrerId,
    }).then((res: any) => {
      if (res) {
        message.success('操作成功');
        handleCancel();
        getUserDetail();
      }
    });
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
      <div>
        <div className={styles.user_detail_header}>
          <div className={showInfo ? styles.user_detail_info : styles.user_detail_info_hide}>
            <div className={styles.info_detail}>
              <div>
                <img src={imgs.head} alt="" />
                <ul className={styles.account_info_1}>
                  <li>
                    <span className={styles.account_name}>账号</span>
                    <span>{user.mobile}</span>
                  </li>
                  <li>
                    <span className={styles.account_name}>UID</span>
                    <span>{user.Id}</span>
                  </li>
                  <li>
                    <span className={styles.account_name}>昵称</span>
                    <span>{user.nickName}</span>
                  </li>
                  <li>
                    <span className={styles.account_name}>注册时间</span>
                    <span>{convertUTCTimeToLocalTime(user.createdAt)}</span>
                  </li>
                  {/* <li>
                    <span className={styles.account_name}>最近登录</span>
                    <span>13503941182</span>
                  </li> */}
                </ul>
              </div>
              <div>
                <ul className={styles.account_info_2}>
                  <li>
                    <span className={styles.account_name}>手机</span>
                    <span>{user.mobile}</span>
                  </li>
                  <li>
                    <span className={styles.account_name}>邮箱</span>
                    <span>--</span>
                  </li>
                  <li>
                    <span className={styles.account_name}>实名认证</span>
                    <span>--</span>
                  </li>
                  <li>
                    <span className={styles.account_name}>Google验证</span>
                    <span>--</span>
                  </li>
                  <li>
                    <span className={styles.account_name}>提现地址</span>
                    <span>{user.filecoinWithdrawAddress}</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className={styles.account_info_3}>
                  <li>
                    <span className={styles.account_name}>邀请人</span>
                    <span>{user.referrerCustomerMobile}</span>
                    <div className={styles.bind} onClick={handleBind}>
                      {user.referrerCustomerId ? '重绑' : '绑定'}
                    </div>
                  </li>
                  <li>
                    {/* <span className={styles.account_name}>邀请</span>
                    <div>
                      <span>{bindList}</span>
                      <span
                        className={styles.more}
                        onClick={() => {
                          setActiveUser(user);
                          history.push('/userData/userDetail/userBasic/inviteRelation');
                        }}
                      >
                        更多
                      </span>
                    </div> */}
                  </li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <span
              className={`${styles.edit} ${showInfo ? null : styles.hide}`}
              onClick={() => {
                setActiveUser(user);
                history.push('/userData/userDetail/userBasic');
              }}
            >
              编辑
            </span>
          </div>
          {showInfo && <Divider style={{ margin: 0 }} />}
          <div className={styles.user_detail_data}>
            <div className={styles.user_detail_data_top}>
              <div>
                <span>总资产(FIL)</span>
                <span className={styles.number}>
                  {user.revenues &&
                    transformFIL(
                      user.revenues.settledAmount +
                        user.revenues.vestingAmount -
                        user.revenues.withdrawingAmount -
                        user.revenues.withdrawnAmount +
                        user.revenues.sealPledgeAmount || 0,
                    )}
                </span>
              </div>
              <div>
                <span>总算力(T)</span>
                <span className={styles.number}>{user.revenues && user.revenues.storage}</span>
              </div>
              <div>
                <span>可提现金额</span>
                <span className={styles.number}>
                  {user.revenues && transformFIL(user.revenues.availableAmount, 4)}
                </span>
              </div>
              <div>
                <span>提现中</span>
                <span className={styles.number}>
                  {user.revenues && transformFIL(user.revenues.withdrawingAmount, 4)}
                </span>
              </div>
              <div>
                <span>已提现</span>
                <span className={styles.number}>
                  {user.revenues && transformFIL(user.revenues.withdrawnAmount, 4)}
                </span>
              </div>
              <div>
                <span>锁仓</span>
                <span className={styles.number}>
                  {user.revenues && transformFIL(user.revenues.vestingAmount, 4)}
                </span>
              </div>
              <div>
                <span>质押</span>
                <span className={styles.number}>
                  {user.revenues && transformFIL(user.revenues.sealPledgeAmount, 4)}
                </span>
              </div>
              <div>
                <span>Gas</span>
                <span className={styles.number}>
                  {user.revenues && transformFIL(user.revenues.sealGasFeeAmount, 4)}
                </span>
              </div>
              <div>
                <span>补扣</span>
                <span className={styles.number}>
                  {user.revenues &&
                    transformFIL(user.revenues.subsidyAmount - user.revenues.deductAmount, 4)}
                </span>
              </div>
            </div>
            <DoubleLeftOutlined
              rotate={showInfo ? 90 : -90}
              className={styles.icon}
              onClick={() => setShowInfo(!showInfo)}
            />
          </div>
        </div>
      </div>
      <UserTable userId={activeUser?.Id} mobile={activeUser?.mobile} />
      <BindModal visible={visible} onCancel={handleCancel} onOk={handleOk} />
    </PageContainer>
  );
};

export default UserDetail;
