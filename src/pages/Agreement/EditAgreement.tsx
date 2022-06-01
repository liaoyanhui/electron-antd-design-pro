/*
 * @Description: 编辑模版
 * @Author: 尚夏
 * @Date: 2021-07-23 10:24:04
 * @LastEditTime: 2021-08-26 09:42:45
 * @FilePath: /mining-admin-desktop/src/pages/Agreement/EditAgreement.tsx
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

// const content = `<p style="text-align:left;">尊敬的用户：<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据协议实验室官方信息，星际文件系统主网将于2021年6月30日UTC时间21:00-23:00，区块高度892800时，升级至V13 HyperDrive版本。本次更新将会使星际文件系统网络的存储和验证效率提高10-25倍。<br/>Bitchina将于北京时间6月30日8：00至7月1日8：00时进行升级，升级期间新增算力可能受影响，出块收益正常。除此之外，bitchina其余服务皆正常运转，App可以正常登录。<br/>bitchina遵循客户第一的原则，致力于以一流的产品服务为客户提供完善的服务体验。如您有任何问题请第一时间联系官方客服，我们将会及时为您解答。</p><p>根据协议实验室官方信息，星际文件系统主网将于2021年6月30日UTC时间21:00-23:00，区块高度892800时，升级至V13 HyperDrive版本。本次更新将会使星际文件系统网络的存储和验证效率提高10-25倍。<br/>Bitchina将于北京时间6月30日8：00至7月1日8：00时进行升级，升级期间新增算力可能受影响，出块收益正常。除此之外，bitchina其余服务皆正常运转，App可以正常登录。<br/>bitchina遵循客户第一的原则，致力于以一流的产品服务为客户提供完善的服务体验。如您有任何问题请第一时间联系官方客服，我们将会及时为您解答。<br/></p><p>根据协议实验室官方信息，星际文件系统主网将于2021年6月30日UTC时间21:00-23:00，区块高度892800时，升级至V13 HyperDrive版本。本次更新将会使星际文件系统网络的存储和验证效率提高10-25倍。<br/>Bitchina将于北京时间6月30日8：00至7月1日8：00时进行升级，升级期间新增算力可能受影响，出块收益正常。除此之外，bitchina其余服务皆正常运转，App可以正常登录。<br/>bitchina遵循客户第一的原则，致力于以一流的产品服务为客户提供完善的服务体验。如您有任何问题请第一时间联系官方客服，我们将会及时为您解答。<br/></p><p style="text-align:right;">BitChina.io</p><p data-we-empty-p="" style="text-align:right;">2021-10-19</p`;

const EditAgreement: React.FC = () => {
  // 编辑dom对象
  const editRef: any = useRef<any>();

  // 监听路由参数 获取协议Id
  const [agreementId, setAgreementId] = useState<number>();

  const [title, setTitle] = useState<string>();

  // 修改标题
  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    const Id = history.location.query?.id;
    setAgreementId(Number(Id));
    if (Id) {
      AgreementService.getAgreementById({
        id: Number(Id),
      }).then((res: any) => {
        if (res) {
          editRef.current.txt.html(res.content);
          setTitle(res.title);
        }
      });
    }
  }, []);

  const [mobilePreviewVisible, setMobilePreviewVisible] = useState<boolean>(false);
  const [mobileContent, setMobileContent] = useState<string>('');
  // 保存
  const handleSave = () => {
    AgreementService.editAgreement(
      { id: Number(agreementId) },
      {
        data: {
          title,
          content: editRef.current.txt.html(),
        },
      },
    ).then((res: any) => {
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
        {/* <h2>关于V13网络升级的通知</h2> */}
        <div className={styles.mobile_content}>
          <img src={imgs.iphone} alt="" />
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: mobileContent }}></div>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default EditAgreement;
