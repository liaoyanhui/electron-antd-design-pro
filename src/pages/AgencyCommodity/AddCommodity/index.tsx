/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-28 10:09:11
 * @LastEditTime: 2021-11-05 10:13:34
 * @FilePath: /mining-admin-desktop/src/pages/AgencyCommodity/AddCommodity/index.tsx
 */
import React, { useState, useEffect, useRef } from 'react';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Input, Button, Upload, Card, message, Select, Radio, Divider } from 'antd';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import WangEditor from '@/components/WangEditor';
import styles from './index.less';
import { fileByBase64, imgSize, cnyToFen } from '@/utils/utils';
import { ProductService, AlbumService } from '@/services';

import Banner from '@/components/Banner';

const formLayout: any = {
  // labelCol: { offset: 2, span: 18 },
  // wrapperCol: { offset: 2, span: 18 },
};

const { TextArea } = Input;
const { Option } = Select;

const AddCommodity: React.FC = () => {
  const [form] = Form.useForm();

  // 编辑器实例对象
  const editRef: any = useRef<any>();

  const [cover, setCover] = useState<string>('');
  const [coverId, setCoverId] = useState<number>();
  const [photos, setPhotos] = useState<string[]>([]);

  const [photoId, setPhotoId] = useState<number>();

  // 初始化创建相册 商品轮播图相册
  useEffect(() => {
    // AlbumService.createAlbum({
    //   data: {
    //     title: 'photos',
    //   },
    // }).then((res: any) => {
    //   setPhotoId(res.Id);
    // });
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
      message.error('图片不能大于2M!');
    }

    // 创建封面相册
    fileByBase64(file, async (base64: any) => {
      const { width, height } = await imgSize(base64);
      AlbumService.uploadPhoto({
        data: {
          // albumId: res.Id,
          mimeType: base64.split(';')[0].split(':')[1],
          data: base64.split(',')[1],
          width,
          height,
        },
      }).then((response: any) => {
        if (response) {
          form.resetFields(['thumbnail']);
          setCoverId(response.Id);
          setCover(base64);
        }
      });
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
      ProductService.createProduct({
        data: {
          name: form.getFieldValue('name'),
          intro: form.getFieldValue('intro'),
          saleMethod: 'byStorage',
          hostingDays: Number(form.getFieldValue('hostingDays')), // 合约周期
          saleKeywords: form.getFieldValue('saleKeywords').split(';'), // 营销关键词
          serviceFeePercent: Number(form.getFieldValue('serviceFeePercent')) * 10, // 技术服务费
          marketPrice: cnyToFen(form.getFieldValue('marketPrice')), // 原价
          price: cnyToFen(form.getFieldValue('price')), // 现价
          stockQty: Number(form.getFieldValue('stockQty')), // 总量 / 库存
          minUnitsForSale: Number(form.getFieldValue('minUnitsForSale')), // 默认最小起售份数
          description: form.getFieldValue('description'), // 商品详情
          saleUnit: Number(form.getFieldValue('saleUnit')), // 单份数量
          cover: coverId,
          photos: photoId,
        },
      }).then((res: any) => {
        if (res) {
          message.success('操作成功');
          history.push('/commodity');
        }
      });
    }
  };

  // 取消
  const handleCancel = () => {
    history.push('/commodity');
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
          initialValues={{ commodityType: 2, miningWay: 1 }}
        >
          {/* <Form.Item label="算力类型" name="hashrateType" >
                <div>IPFS</div>
              </Form.Item>
              <Form.Item label="商品类型" name="commodityType" rules={[
                {
                  required: true,
                  message: '标语不能为空',
                },
              ]}>
                <Radio.Group>
                  <Radio value={1}>算力</Radio>
                  <Radio value={2}>老司机</Radio>
                  <Radio value={3}>刘成宝</Radio>
                </Radio.Group>
              </Form.Item> */}
          <Form.Item
            label="商品名称"
            name="name"
            rules={[
              {
                required: true,
                message: '名称不能为空',
              },
            ]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item label="商品标签" name="saleKeywords">
            <Input placeholder="多个需以;号分隔" />
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="intro"
            rules={[
              {
                required: true,
                message: '描述不能为空',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Divider />
          <Form.Item
            label="合约周期"
            name="hostingDays"
            rules={[
              // {
              //   required: true,
              //   message: '合约周期不能为空',
              // },
              {
                required: true,
                transform: (value: string) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input suffix="天" />
          </Form.Item>
          <Form.Item label="开挖方式" name="miningWay">
            <Radio.Group>
              {/* <Radio value={1}><Input suffix="天"/></Radio> */}
              <Radio value={1}>手动确认，次日凌晨</Radio>
            </Radio.Group>
          </Form.Item>
          {/* <Form.Item label="封装时间" name="packageTime" rules={[
                {
                  required: true,
                  message: '封装时间'
                }
              ]}>
                 <Radio.Group>
                  <Radio value={1}>立刻</Radio>
                  <Radio value={2}>按比每日缓存</Radio>
                </Radio.Group>
              </Form.Item> */}
          <Form.Item
            label="技术服务费"
            name="serviceFeePercent"
            rules={[
              {
                required: true,
                message: '服务费不能为空',
              },
              {
                transform: (value: string) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input suffix="%" />
          </Form.Item>
          <Divider />
          <Form.Item
            label="每份原价"
            name="marketPrice"
            rules={[
              {
                required: true,
                transform: (value: string) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input suffix="CNY" />
          </Form.Item>
          <Form.Item
            label="每份现价"
            name="price"
            rules={[
              {
                required: true,
                transform: (value: string) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input suffix="CNY" />
          </Form.Item>
          <Divider />
          <Form.Item
            label="单份数量"
            name="saleUnit"
            rules={[
              {
                required: true,
                transform: (value: string) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input suffix="T" />
          </Form.Item>
          <Form.Item
            label="总量"
            name="stockQty"
            rules={[
              {
                required: true,
                transform: (value: string) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input suffix="份" />
          </Form.Item>

          <Form.Item
            label="默认最小购买份数"
            name="minUnitsForSale"
            rules={[
              {
                required: true,
                transform: (value: string) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Divider />
          <Form.Item
            label={
              <div>
                <span>商品小图</span>
                <span className={styles.img_tip}>(图片不能大于2M)</span>
              </div>
            }
            name="thumbnail"
            getValueProps={(value: any) => value}
            rules={[
              () => ({
                required: true,
                validator(_, value) {
                  if (cover) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('请选择图片!'));
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
              {cover ? (
                <img src={cover} alt="avatar" style={{ width: '100%', height: '100%' }} />
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
                <span>商品轮播图</span>
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
            label="商品详情"
            name="description"
            rules={[
              {
                required: true,
                message: '正文不能为空',
              },
            ]}
          >
            <WangEditor
              getEditor={(edt: any) => {
                editRef.current = edt;
              }}
              id="editor"
              htUeditor={500}
              // onChange={setContent}
              // value={content}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSure}>
              确认
            </Button>
            <Button type="primary" style={{ margin: '0 16px' }} onClick={handleCancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default AddCommodity;
