/*
 * @Description: 算力存储
 * @Author: 尚夏
 * @Date: 2021-08-02 15:08:09
 * @LastEditTime: 2022-05-26 17:15:12
 * @FilePath: /mining-admin-desktop/src/pages/UserData/UserTable/HashRateStorage.tsx
 */

import React, { useRef } from 'react';
import { history } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { FilecoinService } from '@/services';

const HashRateStorage: React.FC<{
  userId: any;
}> = (props) => {
  const { userId } = props;
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
    },
    {
      title: '商品',
      dataIndex: 'productName',
    },
    {
      title: '工作中(T)',
      search: false,
      dataIndex: 'sealedStorage',
    },
    // {
    //   title: '质押(FIL)',
    //   search: false,
    //   dataIndex: 'pledge',
    // },
    // {
    //   title: '封装Gas(FIL)',
    //   search: false,
    //   dataIndex: 'expend',
    // },
    {
      title: '下单日期',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '已运行(天)',
      search: false,
      dataIndex: 'null',
    },
    {
      title: '累计收益(FIL)',
      search: false,
      dataIndex: 'null',
    },
    {
      title: '状态',
      search: false,
      dataIndex: 'state',
      valueEnum: {
        created: {
          text: '待质押',
        },
        working: {
          text: '工作中',
        },
        stop: {
          text: '停用',
        },
        deactivated: {
          text: '无效算力',
        },
      },
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

  const headerTitle = () => {
    return (
      <>
        <ul className={styles.header_title}>
          <li>
            <span>工作算力(T)</span>
            <span className={styles.table_field}>19382</span>
          </li>
          <li>
            <span>封装算力(T)</span>
            <span className={styles.table_field}>11770</span>
          </li>
          <li>
            <span>订单算力(T)</span>
            <span className={styles.table_field}>11770</span>
          </li>
          <li>
            <span>过期算力(T)</span>
            <span className={styles.table_field}>0</span>
          </li>
        </ul>
      </>
    );
  };

  return (
    <>
      <ProTable<Banner.FormProps, Global.PageParams>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return FilecoinService.getFilecoinStorageList({
            filterBy: 'customer',
            filter: userId,
          }).then((res: any) => {
            return {
              data: res || [],
            };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="orderNo"
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

export default HashRateStorage;
