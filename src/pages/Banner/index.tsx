/*
 * @Description: 轮播图
 * @Author: 尚夏
 * @Date: 2021-07-20 13:39:40
 * @LastEditTime: 2021-07-26 11:36:22
 * @FilePath: /mining-admin-desktop/src/pages/Banner/index.tsx
 */
import React, {useRef,useState} from 'react';
import moment from 'moment';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import styles from './index.less';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';

const Banner: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '编号',
      search: false,
      dataIndex: 'id',
      // render: (_) => <a>{_}</a>,
    },
    {
      title: '主题',
      dataIndex: 'theme',
    },
    {
      title: '图片',
      search: false,
      dataIndex: 'banner',
    },
    {
      title: '链接',
      search: false,
      dataIndex: 'url'
    },
    {
      title: '轮播时间',
      dataIndex: 'carouselTime',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
      render: (_, record) => {
        return (
          <>{moment(record.carouselTime && record.carouselTime[0]).format('YYYY/MM/DD')} - {moment(record.carouselTime && record.carouselTime[1]).format('YYYY/MM/DD')}</>
        )
       
      }
    },
    {
      title: '状态',
      search: false,
      dataIndex: 'status',
      valueEnum: {
        '0': {
          text: '已发布',
        },
        '1': {
          text: '未发布',
        },
      },
    },
    {
      title: '操作',
      width: '164px',
      key: 'option',
      valueType: 'option',
      render: (_, record) => {
        return (
          <div className={styles.option}>
            {record.status === '1' ? 
              (
                <>
                  <a onClick={() => history.push(`/operation/banner/editBanner?id=${record.id}`)}>编辑</a>
                  <a onClick={() => {}}>上架</a>
                </>
                
              )  : (
                <>
                  <a onClick={() => {}}>下架</a>
                </>
              )
            }
          </div>
        )
      }
    },
  ];

  return (
      <PageContainer
          header={{
            breadcrumbRender: params => {
              return <CustomBreadcrumb params={params}/>
            },
            title: false
          }}>
          <ProTable<Banner.FormProps, Global.PageParams>
            columns={columns}
            actionRef={actionRef}
            request={async (params = {}, sort, filter) => {
              // console.log(params, 'parmas');
              return Promise.resolve(
                {
                  data: [{
                    id:1,
                    theme: '国庆大抽奖',
                    banner: '作者',
                    url: 'http://www.baidu.com',
                    carouselTime:  [
                      1626250527461,
                      1626336927461,
                    ],
                    status: '0'
                  },{
                    id:2,
                    theme: '国庆大抽奖2',
                    banner: '作者',
                    url: 'http://www.baidu.com',
                    carouselTime:  [
                      1626941727461,
                      1626855327461,
                    ],
                    status: '1'
                  }],
                  success: true,
                  total: 11
                }
              )
            }}
            options={{
              density: false
            }}
            // editable={{
            //   type: 'multiple',
            // }}
            rowKey="id"
            search={{
              labelWidth: 'auto',
            }}
            pagination={{
              pageSize: 10,
            }}
            dateFormatter="number"
            // headerTitle="高级表格"
            toolBarRender={() => [
              <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => history.push('/operation/banner/addBanner')}>
                新建Banner
              </Button>
            ]}
          />
      </PageContainer>
  )
}

export default Banner;