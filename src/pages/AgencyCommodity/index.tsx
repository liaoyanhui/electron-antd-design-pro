/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-10-29 15:29:13
 * @LastEditTime: 2022-01-13 10:17:11
 * @FilePath: /mining-admin-desktop/src/pages/AgencyCommodity/index.tsx
 */
/*
 * @Description: 商务点 商品
 * @Author: 尚夏
 * @Date: 2021-07-20 13:50:12
 * @LastEditTime: 2021-10-27 15:20:35
 * @FilePath: /mining-admin-desktop/src/pages/AgencyCommodity/index.tsx
 */
import React, { useRef, createRef } from 'react';
import { Button, message, Modal, Radio } from 'antd';
import { history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import { ProductService } from '@/services';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import ModalInfo from '@/components/ModalInfo';
import { fenToCny } from '@/utils/utils';

const AgencyCommodity: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addedRef: any = createRef<any>();

  const onChange = (e: any) => {
    addedRef.current = e.target.value;
  };

  // 修改商品状态
  const changeComState = (id: number, state: string) => {
    ProductService.changeProductState({
      id,
      state,
    }).then((res: any) => {
      if (res) {
        message.success('操作成功');
        actionRef.current?.reload();
      }
    });
  };
  // 上架 info 弹窗
  const added = (commodity: any) => {
    Modal.info({
      title: '销售方式',
      centered: true,
      maskClosable: true,
      content: (
        <Radio.Group onChange={onChange} defaultValue={'opening'}>
          <Radio value={'opening'}>立刻销售</Radio>
          <Radio value={'comingSoon'}>预售</Radio>
        </Radio.Group>
      ),
      okText: '确定',
      onOk(close) {
        changeComState(commodity.Id, addedRef.current || 'opening');
        addedRef.current = 'opening';
        close();
      },
    });
  };

  // 内售
  const innerSell = (id: number) => {
    ModalInfo({
      title: '开启内售',
      handleOk: () => {
        changeComState(id, 'internalOnSale');
      },
    });
  };

  // 下架
  const closed = (id: number) => {
    ModalInfo({
      title: '下架',
      handleOk: () => {
        changeComState(id, 'soldOut');
      },
    });
  };

  // 取消内售
  const cancelInnerSell = (id: number) => {
    ModalInfo({
      title: '取消内售',
      handleOk: () => {
        changeComState(id, 'soldOut');
      },
    });
  };

  // 开售
  const startSell = (id: number) => {
    ModalInfo({
      title: '开售',
      handleOk: () => {
        changeComState(id, 'opening');
      },
    });
  };

  // 上架
  const putaway = (id: number) => {
    ModalInfo({
      title: '上架',
      handleOk: () => {
        changeComState(id, 'opening');
      },
    });
  };

  const columns: ProColumns<Banner.FormProps>[] = [
    {
      title: '商品',
      dataIndex: 'name',
    },
    {
      title: '单份数量',
      dataIndex: 'saleUnit',
    },
    // {
    //   title: '算力类型',
    //   search: false,
    //   dataIndex: 'type',
    //   // render: (_) => <a>{_}</a>,
    // },
    {
      title: '合约周期(天)',
      // search: false,
      dataIndex: 'hostingDays',
    },
    // {
    //   title: '开挖时间',
    //   search: false,
    //   dataIndex: 'time',
    // },
    {
      title: '技术服务费',
      // search: false,
      dataIndex: 'serviceFeePercent',
      renderText: (text) => {
        return `${text / 10}%`;
      },
    },

    {
      title: '每份现价(¥)',
      // search: false,
      dataIndex: 'price',
      renderText: (text) => {
        return fenToCny(text);
      },
    },
    {
      title: '总量(份)',
      search: false,
      renderText: (text) => {
        return text.salesVolume + text.stockQty;
      },
    },
    {
      title: '已售(份)',
      search: false,
      dataIndex: 'salesVolume',
    },
    {
      title: '状态',
      search: false,
      dataIndex: 'state',
      valueEnum: {
        created: {
          text: '待上架',
        },
        opening: {
          text: '销售中',
        },
        outOfStock: {
          text: '售罄',
        },
        internalOnSale: {
          text: '内售',
        },
        soldOut: {
          text: '下架',
        },
        comingSoon: {
          text: '预售',
        },
        closed: {
          text: '已取消',
        },
      },
    },
    {
      title: '操作',
      width: '190px',
      key: 'option',
      valueType: 'option',
      renderText: (text) => {
        if (text.state === 'created') {
          return (
            <div className={styles.options}>
              <a
                onClick={() => {
                  history.push(`/commodity/checkEditCommodity?type=edit&Id=${text.Id}`);
                }}
              >
                编辑
              </a>
              <a onClick={() => added(text)}>上架</a>
              <a onClick={() => innerSell(text.Id)}>内售</a>
            </div>
          );
        }
        if (text.state === 'opening') {
          return (
            <div className={styles.options}>
              <a
                onClick={() =>
                  history.push(`/commodity/checkEditCommodity?type=check&Id=${text.Id}`)
                }
              >
                查看
              </a>
              <a onClick={() => history.push(`/order/createOrder?comm=${JSON.stringify(text)}`)}>
                创建订单
              </a>
              <a onClick={() => closed(text.Id)}>下架</a>
            </div>
          );
        }
        if (text.state === 'soldOut') {
          return (
            <div className={styles.options}>
              <a
                onClick={() => {
                  history.push(`/commodity/checkEditCommodity?type=edit&Id=${text.Id}`);
                }}
              >
                编辑
              </a>
              <a onClick={() => added(text)}>上架</a>
              <a onClick={() => innerSell(text.Id)}>内售</a>
            </div>
          );
        }
        if (text.state === 'internalOnSale') {
          return (
            <div className={styles.options}>
              <a
                onClick={() => {
                  history.push(`/commodity/checkEditCommodity?type=check&Id=${text.Id}`);
                }}
              >
                查看
              </a>
              <a onClick={() => history.push(`/order/createOrder?comm=${JSON.stringify(text)}`)}>
                创建订单
              </a>
              <a onClick={() => cancelInnerSell(text.Id)}>取消内售</a>
            </div>
          );
        }
        if (text.state === 'outOfStock') {
          return (
            <div className={styles.options}>
              <a
                onClick={() => {
                  history.push(`/commodity/checkEditCommodity?type=check&Id=${text.Id}`);
                }}
              >
                查看
              </a>
              <a onClick={() => closed(text.Id)}>下架</a>
            </div>
          );
        }
        if (text.state === 'comingSoon') {
          return (
            <div className={styles.options}>
              <a
                onClick={() => {
                  history.push(`/commodity/checkEditCommodity?type=check&Id=${text.Id}`);
                }}
              >
                查看
              </a>
              <a onClick={() => startSell(text.Id)}>开售</a>
            </div>
          );
        }
        if (text.state === 'closed') {
          return (
            <div className={styles.options}>
              <a
                onClick={() => {
                  history.push(`/commodity/checkEditCommodity?type=edit&Id=${text.Id}`);
                }}
              >
                编辑
              </a>
              <a onClick={() => putaway(text.Id)}>上架</a>
            </div>
          );
        }
        return null;
      },
    },
  ];

  return (
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
          return ProductService.getProducts().then((res: any) => {
            return {
              data: res || [],
            };
          });
        }}
        options={{
          density: false,
        }}
        rowKey="Id"
        // search={{
        //   labelWidth: 'auto',
        // }}
        search={false}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="number"
        // headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => history.push('/commodity/addCommodity')}
          >
            新增商品
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default AgencyCommodity;
