/*
 * @Description: 算力
 * @Author: 尚夏
 * @Date: 2021-08-30 15:12:31
 * @LastEditTime: 2021-10-11 11:06:09
 * @FilePath: /mining-admin-desktop/src/pages/HashRate/index.tsx
 */
import React, { useRef } from 'react';
import { history } from 'umi';
import { Button, Tooltip } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import type { ProColumns } from '@ant-design/pro-table';
import { FilecoinService } from '@/services';
import { formatAddress } from '@/utils/utils';

const HashRate: React.FC<{}> = (props) => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Banner.FormProps>[] = [
    // {
    //   title: '存储编号',
    //   dataIndex: 'orderNo',
    //   renderText: (text) => {
    //     return (
    //       <Tooltip title={text}>
    //         <span>{formatAddress(text)}</span>
    //       </Tooltip>
    //     );
    //   },
    // },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      renderText: (text) => {
        return (
          <Tooltip title={text}>
            <span>{formatAddress(text)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '手机号',
      dataIndex: 'customerMobile',
    },
    {
      title: '商品',
      dataIndex: 'productName',
    },
    // {
    //   title: '存储(T)',
    //   search: false,
    //   dataIndex: 'storage',
    // },
    {
      title: '工作中(T)',
      search: false,
      dataIndex: 'sealedStorage',
    },
    // {
    //   title: '实收(¥)',
    //   search: false,
    //   dataIndex: 'productName',
    // },
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
      dataIndex: '',
    },
    {
      title: '累计收益',
      search: false,
      dataIndex: '',
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
          text: '工作中',
        },
        stopped: {
          text: '暂停',
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
            // console.log(params, 'parmas');
            return FilecoinService.getFilecoinStorageList({
              filterBy: 'all',
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
      </PageContainer>
    </>
  );
};

export default HashRate;
