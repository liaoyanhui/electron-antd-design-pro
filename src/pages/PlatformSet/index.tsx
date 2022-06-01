/*
 * @Description: 平台设置
 * @Author: 尚夏
 * @Date: 2021-07-20 13:50:12
 * @LastEditTime: 2021-12-20 16:03:15
 * @FilePath: /mining-admin-desktop/src/pages/PlatformSet/index.tsx
 */
import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Input, Button, Upload, Card, message, Radio, Select } from 'antd';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import Banner from '@/components/Banner';
import styles from './index.less';
import { PlatformService, AgreementService } from '@/services';
import { getStore, fileByBase64 } from '@/utils/utils';
// import WangEditor from '@/components/WangEditor';

const { Option } = Select;
const formLayout: any = {
  labelCol: { offset: 2, span: 18 },
  wrapperCol: { offset: 2, span: 18 },
};

const { TextArea } = Input;

const Language = [
  {
    label: '中文',
    value: 'zh',
  },
  {
    label: '英文',
    value: 'en',
  },
];

const PlatformSet: React.FC = () => {
  const [form] = Form.useForm();
  // 编辑dom对象
  const editRef: any = useRef<any>();
  // 轮播图
  const [photos, setPhotos] = useState<string[]>([]);
  // 轮播图相册Id
  const [photoId, setPhotoId] = useState<number>();

  // 邀请海报
  const [invites, setInvites] = useState<string[]>([]);
  // 邀请海报Id
  const [inviteId, setInviteId] = useState<number>();

  // 微信二维码
  const [wechatBusinessCard, setWechatBusinessCard] = useState<string>('');
  // 平台数据
  const [platformData, setPlatformData] = useState<any>({});

  const [tipContent, setTipContent] = useState<any>('');
  // 设置平台数据
  const setPlatform = (res: any) => {
    setPlatformData({ ...res });
    form.setFieldsValue({
      name: res.name,
      intro: res.intro,
      userServiceAgreementId: res.userServiceAgreement?.Id,
      privacyPolicyAgreementId: res.privacyPolicyAgreement?.Id,
      salesContractAndHostingServiceAgreementId: res.salesContractAndHostingServiceAgreement?.Id,
      aboutUsAgreementId: res.aboutUsAgreement?.Id,
      language: res.language,
      isSelfOperated: res.isSelfOperated === true ? 'yes' : 'no',
      isDemoPlatform: res.isDemoPlatform === true ? 'yes' : 'no',
      filecoinStorageProductServiceFeePercent:
        res.settings?.filecoinStorageProductServiceFeePercent / 10 || '0',
      referrerCommissionRate: res.settings?.referrerCommissionRate / 10 || '0',
    });

    setTipContent(res.settings?.productPurchaseSpecifiction || '');
    if (res.customerServiceContact) {
      setWechatBusinessCard(res.customerServiceContact.wechat_business_card);
      form.setFieldsValue({
        wechatNumber: res.customerServiceContact.wechat_number,
        wechatBusinessCard: res.customerServiceContact.wechat_business_card,
      });
    }

    // 轮播图 并且设置轮播图Id
    if (res.carousels) {
      const photoArr = res.carousels.photos || [];
      const dataArr = photoArr.map((item: any) => {
        return {
          id: item.Id,
          data: `data:${item.mimeType};base64,${item.data}`,
        };
      });
      setPhotos([...dataArr]);
      setPhotoId(res.carousels.Id);
    }

    // 邀请海报
    if (res.referrer) {
      const photoArr = res.referrer.photos || [];
      const dataArr = photoArr.map((item: any) => {
        return {
          id: item.Id,
          data: `data:${item.mimeType};base64,${item.data}`,
        };
      });
      setInvites([...dataArr]);
      setInviteId(res.referrer.Id);
    }
  };

  const [agreementList, setAgreementList] = useState<any>([]);
  // 获取平台更多信息
  const getPlatformInfo = (id: string | number) => {
    PlatformService.getPlatformById({
      id,
    }).then((res: any) => {
      if (res) {
        setPlatform({ ...res });
      }
    });
  };
  useEffect(() => {
    // 返回协议列表
    AgreementService.getAgreementList().then((res: any) => {
      if (res) {
        setAgreementList(res);
      }
    });

    const platformId = getStore('platformId');
    if (platformId) {
      getPlatformInfo(platformId);
    } else {
      const userInfo = JSON.parse(getStore('userInfo') || '{}');
      const user: any = userInfo;
      if (user.userRole === 'PlatformAdmin') {
        getPlatformInfo(user.platformIds[0]);
      }
    }
  }, []);

  // 自定义上传图片
  const beforeUpload = (file: File) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/svg' ||
      file.type === 'image/gif';
    if (!isJpgOrPng) {
      message.error('图片格式只支持png,jpeg,jpg,svg!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    // 转换成base64
    fileByBase64(file, async (base64: any) => {
      setWechatBusinessCard(base64);
    });
    return false;
  };

  // 上传进度改变函数
  const handleChange = () => {};

  const onCheck = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      form.scrollToField(errorInfo.errorFields[0].name, { block: 'center' });
      return false;
    }
  };

  /**
   * @description: 确定
   * 确定前先检验表单
   * @param {*}
   * @return {*}
   */
  const handleSure = async () => {
    const bool = await onCheck();
    if (bool) {
      const platformId = getStore('platformId');
      // delete platformData.carousels;
      PlatformService.editProfile(
        {
          id: platformId,
        },
        {
          data: {
            // ...platformData, // 平台数据 用来放入未被修改的数据
            name: form.getFieldValue('name'), // 平台名称
            intro: form.getFieldValue('intro'), // 平台介绍
            carouselsAlbumId: photoId, // 平台轮播图相册Id
            referrerAlbumId: inviteId, // 邀请海报Id
            orderPaymethods: [
              {
                icon: '',
                accountNo: '',
                bankName: '',
                comment: '',
                accountName: '',
              },
            ],
            userServiceAgreementId: form.getFieldValue('userServiceAgreementId'),
            privacyPolicyAgreementId: form.getFieldValue('privacyPolicyAgreementId'),
            aboutUsAgreementId: form.getFieldValue('aboutUsAgreementId'),
            salesContractAndHostingServiceAgreementId: form.getFieldValue(
              'salesContractAndHostingServiceAgreementId',
            ),
            language: form.getFieldValue('language'),
            customerServiceContact: {
              // 联系方式
              // ...platformData.customerServiceContact,
              wechatNumber: form.getFieldValue('wechatNumber'),
              wechatBusinessCard,
              mobile: platformData.customerServiceContact?.mobile,
            },
          },
        },
      ).then((res: any) => {
        if (res) {
          message.success('操作成功');
        }
      });
    }
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
      <Card style={{ padding: '24px 0' }}>
        <Form
          {...formLayout}
          name="addBanner"
          layout={'vertical'}
          form={form}
          // initialValues={{ layout: formLayout }}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[
              {
                required: true,
                message: '名称不能为空',
              },
            ]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item
            label="平台介绍"
            name="intro"
            rules={[
              {
                required: true,
                message: '平台介绍不能为空',
              },
            ]}
          >
            <TextArea rows={4} placeholder="请输入平台介绍" />
          </Form.Item>
          <Form.Item
            name="language"
            label="语言"
            rules={[
              {
                required: true,
                message: '请选择语言',
              },
            ]}
          >
            <Select placeholder="选择语言">
              {Language &&
                Language.map((item: any, index: number) => {
                  return (
                    <Option value={item.value} key={index}>
                      {item.label}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            label="用户服务协议"
            name="userServiceAgreementId"
            rules={[
              {
                required: true,
                message: '请选择用户协议',
              },
            ]}
          >
            <Select placeholder="选择用户协议">
              {agreementList &&
                agreementList.map((item: any, index: number) => {
                  return (
                    <Option value={item.Id} key={index}>
                      {item.title}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            label="隐私条款"
            name="privacyPolicyAgreementId"
            rules={[
              {
                required: true,
                message: '请选择隐私条款',
              },
            ]}
          >
            <Select placeholder="选择隐私条款">
              {agreementList &&
                agreementList.map((item: any, index: number) => {
                  return (
                    <Option value={item.Id} key={index}>
                      {item.title}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            label="IPFS分布式存储购买及服务托管协议"
            name="salesContractAndHostingServiceAgreementId"
            rules={[
              {
                required: true,
                message: '请选择IPFS分布式存储购买及服务托管协议',
              },
            ]}
          >
            <Select placeholder="选择IPFS分布式存储购买及服务托管协议">
              {agreementList &&
                agreementList.map((item: any, index: number) => {
                  return (
                    <Option value={item.Id} key={index}>
                      {item.title}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            label="关于我们"
            name="aboutUsAgreementId"
            rules={[
              {
                required: true,
                message: '请选择关于我们',
              },
            ]}
          >
            <Select placeholder="选择关于我们">
              {agreementList &&
                agreementList.map((item: any, index: number) => {
                  return (
                    <Option value={item.Id} key={index}>
                      {item.title}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>

          <Form.Item
            label="客服微信号"
            name="wechatNumber"
            rules={[
              {
                required: true,
                message: '客服微信号不能为空',
              },
            ]}
          >
            <Input placeholder="请输入客服微信号" />
          </Form.Item>
          <Form.Item
            label={
              <div>
                <span>客服二维码</span>
                <span className={styles.img_tip}>(图片不能大于2M)</span>
              </div>
            }
            name="wechatBusinessCard"
            rules={[
              ({ getFieldValue }) => ({
                required: true,
                validator(_, value) {
                  if (getFieldValue('wechatBusinessCard')) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('请输入客服二维码!'));
                },
              }),
            ]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className={styles.uploader}
              showUploadList={false}
              action=""
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {wechatBusinessCard ? (
                <img
                  src={wechatBusinessCard}
                  alt="客服二维码"
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <div>
                  <div>添加</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label={
              <div>
                <span>首页banner</span>
                <span className={styles.img_tip}>(图片不能大于2M)</span>
              </div>
            }
            name="banner"
            getValueProps={(value: any) => value}
            rules={[
              () => ({
                required: true,
                validator(_, value) {
                  if (photos && photos.length > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('请选择图片!'));
                },
              }),
            ]}
          >
            <Banner
              photos={photos}
              setPhotos={setPhotos}
              setPhotoId={setPhotoId}
              photoId={photoId}
              form={form}
            />
          </Form.Item>
          <Form.Item
            label={
              <div>
                <span>邀请</span>
                <span className={styles.img_tip}>(图片不能大于2M)</span>
              </div>
            }
            name="invite"
            getValueProps={(value: any) => value}
            rules={[
              () => ({
                required: true,
                validator(_, value) {
                  if (photos && photos.length > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('请选择图片!'));
                },
              }),
            ]}
          >
            <Banner
              photos={invites}
              setPhotos={setInvites}
              setPhotoId={setInviteId}
              photoId={inviteId}
              form={form}
            />
          </Form.Item>
          <Form.Item name="isSelfOperated" label="是否自营">
            <Radio.Group disabled>
              <Radio value="no">否</Radio>
              <Radio value="yes">是</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="isDemoPlatform" label="是否演示平台">
            <Radio.Group disabled>
              <Radio value="no">否</Radio>
              <Radio value="yes">是</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="技术费" name="filecoinStorageProductServiceFeePercent">
            <Input suffix="%" disabled />
          </Form.Item>
          <Form.Item label="返佣比例" name="referrerCommissionRate">
            <Input suffix="%" disabled />
          </Form.Item>
          <Form.Item label="购买后提示内容" name="productPurchaseSpecifiction">
            <div
              className={styles.tip_content}
              dangerouslySetInnerHTML={{ __html: tipContent }}
            ></div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSure}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default PlatformSet;
