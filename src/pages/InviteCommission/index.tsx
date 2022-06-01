/*
 * @Description: 平台邀请返佣比率
 * @Author: 尚夏
 * @Date: 2021-09-06 15:09:38
 * @LastEditTime: 2022-05-25 15:19:24
 * @FilePath: /mining-admin-desktop/src/pages/InviteCommission/index.tsx
 */
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import { Button, message } from 'antd';
import styles from './index.less';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import SetCommissionRate from './Modal/SetCommissionRate';
import { ReferrerService } from '@/services';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { transformFIL } from '@/utils/utils';

const InviteCommission: React.FC<{}> = (props) => {
  const actionRef = useRef<ActionType>();

  const [visible, setVisible] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<any>({});

  // 设置确定
  const handleOk = (val: any) => {
    if (val) {
      ReferrerService.setReferrerCommission(
        { id: activeUser.Id },
        {
          data: {
            commissionRate: val * 10,
          },
        },
      ).then((res: any) => {
        if (res) {
          message.success('操作成功');
          actionRef.current?.reload();
        }
      });
    }
  };

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: 'UID',
      dataIndex: 'Id',
    },
    {
      title: '用户',
      dataIndex: 'mobile',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '内部备注名',
      dataIndex: 'internalRemarksName',
    },
    {
      title: '邀请人',
      dataIndex: 'description',
    },
    {
      title: '邀请了(人)',
      dataIndex: 'description',
    },
    {
      title: '返佣比例(%)',
      dataIndex: 'commissionRate',
      renderText: (text) => {
        return text / 10;
      },
    },
    {
      title: '累计返佣',
      dataIndex: 'settledAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '锁仓',
      dataIndex: 'vestingAmount',
      renderText: (text) => {
        return transformFIL(text);
      },
    },
    {
      title: '操作',
      width: '164px',
      key: 'option',
      valueType: 'option',
      renderText: (text) => {
        return (
          <div className={styles.option}>
            {/* <a
              onClick={() => {
                // history.push('/order/checkOrder')
              }}
            >
              查看
            </a> */}
            <a
              onClick={() => {
                setActiveUser(text);
                setVisible(true);
              }}
            >
              设置返佣比
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <PageContainer
        header={{
          breadcrumbRender: (params) => {
            return <CustomBreadcrumb params={params} />;
          },
          title: false,
        }}
      >
        <ProTable<Banner.FormProps, Global.PageParams>
          columns={columns}
          actionRef={actionRef}
          request={async (params = {}, sort, filter) => {
            return ReferrerService.getReferrerList().then((res: any) => {
              return {
                data: res || [],
              };
            });
          }}
          options={{
            density: false,
          }}
          rowKey="Id"
          // headerTitle={headerTitle()}
          // search={{
          //   labelWidth: 'auto',
          // }}
          search={false}
          // pagination={false}
          pagination={{
            pageSize: 10,
          }}
          dateFormatter="number"
          toolBarRender={() => []}
        />
      </PageContainer>
      <SetCommissionRate
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleOk}
        commissionRate={activeUser.commissionRate}
      />
    </>
  );
};

export default InviteCommission;
