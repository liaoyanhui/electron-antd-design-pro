/*
 * @Description: 邀请关系
 * @Author: 尚夏
 * @Date: 2021-09-06 14:47:24
 * @LastEditTime: 2021-09-06 15:16:31
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserTable/InviteRelation.tsx
 */
import React, { useRef } from 'react';
import { history } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { ReferrerService } from '@/services';

const InviteRelation: React.FC<{
  userId: any;
}> = (props) => {
  const { userId } = props;
  const actionRef = useRef<ActionType>();

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
      title: '描述信息',
      dataIndex: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    // {
    //   title: '操作',
    //   width: '164px',
    //   key: 'option',
    //   valueType: 'option',
    //   renderText: (text) => {
    //     return (
    //       <div className={styles.option}>
    //         {text.state === 'created' ? (
    //           <>
    //             <a>质押</a>
    //             <a>消单</a>
    //           </>
    //         ) : (
    //           <a
    //             onClick={() => {
    //               // history.push('/order/checkOrder')
    //             }}
    //           >
    //             查看
    //           </a>
    //         )}
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <ProTable<Banner.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return ReferrerService.getReferrerCustomerList({
            id: userId,
          }).then((res: any) => {
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
        toolBarRender={() => [
          // <Button
          //   key="button"
          //   icon={<PlusOutlined />}
          //   type="primary"
          //   onClick={() => history.push('/order/createOrder')}
          // >
          //   创建订单
          // </Button>,
        ]}
      />
    </>
  );
};

export default InviteRelation;
