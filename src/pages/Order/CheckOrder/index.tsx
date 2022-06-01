/*
 * @Description: 查看订单
 * @Author: 尚夏
 * @Date: 2021-07-27 10:42:14
 * @LastEditTime: 2021-09-08 10:00:22
 * @FilePath: /mining-admin-desktop/src/pages/Order/CheckOrder/index.tsx
 */
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Steps } from 'antd';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import Sealing from './Sealing';
import styles from './index.less';
import OrderDetail from './OrderDetail';
import ContentList from './ContentList';
import { history } from 'umi';
import { OrderService } from '@/services';

const { Step } = Steps;

const steps = [
  {
    title: '付款',
    type: 'pending',
    // description: '222',
  },
  {
    title: '质押',
    type: 'waitingForPledge',
    // description: '2222',
  },
  {
    title: '待封装',
    type: 'waitingForSeal',
  },
  {
    title: '封装中',
    type: 'sealing',
  },
  {
    title: '挖矿',
    type: 'mining',
  },
  {
    title: '完成',
    type: 'finished',
  },
];

const CreateOrder: React.FC = () => {
  // 当前步骤
  const [current, setCurrent] = useState<number>(0);
  const [orderInfo, setOrderInfo] = useState<any>({});

  // 根据订单Id 获取订单详情 并且通过详情状态state移动step
  const getOrderById = () => {
    const Id = history.location.query?.Id;
    if (Id) {
      OrderService.getOrderById({
        id: Number(Id),
      }).then((res: any) => {
        if (res) {
          const index = steps.findIndex((item: any) => item.type === res.state);
          if (index > -1) {
            setCurrent(index);
          }
          setOrderInfo(res);
        }
      });
    }
  };

  // 初始化 获取订单详情
  useEffect(() => {
    getOrderById();
  }, []);

  return (
    <PageContainer
      header={{
        breadcrumbRender: (params: any) => {
          return <CustomBreadcrumb params={params} />;
        },
        title: false,
      }}
      content={<OrderDetail orderInfo={orderInfo} title={steps[current].title} />}
    >
      <div className={styles.content}>
        <div className={styles.step}>
          <div className={styles.title}>流程进度</div>
          <div className={styles.step_box}>
            <Steps progressDot current={current} labelPlacement={'vertical'}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div>
        </div>
      </div>
      <div className={styles.content_list}>
        <ContentList orderId={history.location.query?.Id} />
      </div>

      <div className={styles.sealing}>
        <div className={styles.step}>
          <div className={styles.title}>封装进度</div>
          <div className={styles.step_box}>
            <Sealing orderId={history.location.query?.Id} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateOrder;
