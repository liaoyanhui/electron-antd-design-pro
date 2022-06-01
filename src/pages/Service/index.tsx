/*
 * @Description: 客服
 * @Author: 尚夏
 * @Date: 2021-07-20 13:50:12
 * @LastEditTime: 2021-07-26 11:25:27
 * @FilePath: /mining-admin-desktop/src/pages/Service/index.tsx
 */
import React, { useState } from 'react';
// import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import styles from './index.less';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import EditServiceModal from './EditServiceModal';
import {imgs} from '@/assets/images';

const Service: React.FC = () => {

  const [contact, setContact] = useState<string>('1');
  // 弹窗类型 1 编辑 2 新增
  const [type, setType] = useState<number>(1);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  
  /**
   * @description: // 编辑客服
   * @param {number} id  客服id
   * @return {*}
   */  
  const handleEditService = (id: number) => {
    setType(1);
    setEditVisible(true);
  }

  const handleAddService = () => {
    setType(2);
    setEditVisible(true);
  }

  return (
      <PageContainer
          header={{
            breadcrumbRender: params => {
              return <CustomBreadcrumb params={params}/>
            },
            title: false
          }}>
          <div className={styles.card_list}>
              <Card 
                onClick={handleAddService}
                className={styles.card_style_add}
                bordered={false}>
                <div className={styles.title} >+ 新增客服</div>
              </Card>
              <Card 
                title={
                  <div className={styles.header_style}>
                    <span style={contact === '1' ? { color: '#000' } : {color: '#BCBCBC'}} onClick={() => {
                      setContact('1')
                    }}>微信</span>
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    <span style={contact === '0' ? { color: '#000' } : {color: '#BCBCBC'}} onClick={() => {
                      setContact('0')
                    }}>手机</span>
                  </div>
                }
                // headStyle={{fontSize: 12}}
                className={styles.card_style}
                extra={
                  <span className={styles.edit} onClick={() => handleEditService(1)}>编辑</span>
                } 
                bordered={false}>
                <div className={styles.content}>
                  {contact === '1' ? (
                    <div className={styles.weixin_box}>
                      <span>刘成宝</span>
                      <img src={imgs.demo} alt="" />
                    </div>
                  ): (
                    <div className={styles.title}>18329042940</div>
                  )}
                </div>
              </Card>
          </div>
          <EditServiceModal 
            type={type}
            visible={editVisible}
            handleCancel={ () => setEditVisible(false)}
            handleOk={() => setEditVisible(false)}
          />
      </PageContainer>
  )
}

export default Service;