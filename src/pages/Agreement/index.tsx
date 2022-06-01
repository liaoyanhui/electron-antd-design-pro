/*
 * @Description: 用户
 * @Author: 尚夏
 * @Date: 2021-07-20 13:39:40
 * @LastEditTime: 2021-09-16 09:48:17
 * @FilePath: /mining-admin-desktop/src/pages/Agreement/index.tsx
 */
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { AgreementService } from '@/services';

const Agreement: React.FC = () => {
  const [agreementList, setAgreementList] = useState<any>();

  useEffect(() => {
    AgreementService.getAgreementList().then((res: any) => {
      setAgreementList(res);
    });
  }, []);

  /**
   * @description: // 编辑协议条款
   * @param {number} id  协议Id
   * @return {*}
   */
  const handleEditAgreement = (id: number) => {
    history.push(`/platform/agreement/editAgreement?id=${id}`);
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
      <div className={styles.card_list}>
        {agreementList &&
          agreementList.map((item: any, index: number) => {
            return (
              <Card
                key={index}
                onClick={() => handleEditAgreement(item.Id)}
                className={styles.card_style}
                extra={
                  <span className={styles.edit} onClick={() => handleEditAgreement(item.Id)}>
                    编辑
                  </span>
                }
                bordered={false}
              >
                <div className={styles.title}>{item.title}</div>
              </Card>
            );
          })}
        <Card
          className={styles.card_create}
          bordered={false}
          onClick={() => history.push('/platform/agreement/createAgreement')}
        >
          <PlusOutlined style={{ fontSize: 30, fontWeight: 'bold' }} />
        </Card>
      </div>
    </PageContainer>
  );
};

export default Agreement;
