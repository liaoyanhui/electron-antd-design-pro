/*
 * @Description: 创建协议
 * @Author: 尚夏
 * @Date: 2021-09-16 09:43:32
 * @LastEditTime: 2021-09-16 09:59:42
 * @FilePath: /mining-admin-desktop/src/pages/Agreement/CreateAgreement.tsx
 */

import React, { useState, useRef, useEffect } from 'react';
import { history } from 'umi';
import { Card, Button, Modal, message, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import WangEditor from '@/components/WangEditor';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { imgs } from '@/assets/images';
import { AgreementService } from '@/services';

const CreateAgreement: React.FC = () => {
  // 编辑dom对象
  const editRef: any = useRef<any>();

  // 监听路由参数 获取协议Id
  // const [agreementId, setAgreementId] = useState<number>();

  const [title, setTitle] = useState<string>();

  // 修改标题
  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  useEffect(() => {}, []);

  const [mobilePreviewVisible, setMobilePreviewVisible] = useState<boolean>(false);
  const [mobileContent, setMobileContent] = useState<string>('');
  // 保存
  const handleSave = () => {
    AgreementService.createAgreement({
      data: {
        title,
        content: editRef.current.txt.html(),
      },
    }).then((res: any) => {
      if (res) {
        message.success('操作成功');
        history.push('/platform/agreement');
      }
    });
  };

  // 取消
  const handleCancel = () => {
    history.goBack();
  };
  // 预览
  const handlePreview = () => {
    const text = editRef.current && editRef.current.txt.html();
    setMobileContent(text || '');
    setMobilePreviewVisible(true);
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
      <Card>
        <div className={styles.title}>
          <Input placeholder="标题" value={title} onChange={handleChange} />
        </div>
        <WangEditor
          id="editor"
          editBox={editRef.current}
          getEditor={(edt: any) => {
            editRef.current = edt;
          }}
          htUeditor={600}
        />
        <div className={styles.btn}>
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
          <Button type="primary" onClick={handlePreview}>
            预览
          </Button>
          <Button type="primary" onClick={handleCancel}>
            取消
          </Button>
        </div>
      </Card>
      <Modal
        title={''}
        width={400}
        centered
        visible={mobilePreviewVisible}
        footer={null}
        // onOk={handleOk}
        wrapClassName={styles.mobile_modal}
        // bodyStyle={{maxHeight: '600px', minHeight: '300px'}}
        onCancel={() => setMobilePreviewVisible(false)}
      >
        <div className={styles.mobile_content}>
          <img src={imgs.iphone} alt="" />
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: mobileContent }}></div>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default CreateAgreement;
