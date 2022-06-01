/*
 * @Description: 查看 编辑
 * @Author: 尚夏
 * @Date: 2021-08-05 13:40:01
 * @LastEditTime: 2021-09-29 18:50:31
 * @FilePath: /mining-admin-desktop/src/pages/AgencyCommodity/CheckEditCommodity/index.tsx
 */
import React, { useState, useEffect, useRef } from 'react';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import { Form, Input, Button, Upload, Card, message, Select, Radio, Divider } from 'antd';
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

const CheckEditCommodity: React.FC = () => {
  const [form] = Form.useForm();

  // 编辑器实例对象
  const editRef: any = useRef<any>();

  const [cover, setCover] = useState<string>('');
  const [coverId, setCoverId] = useState<number>();
  const [photos, setPhotos] = useState<string[]>([]);

  const [photoId, setPhotoId] = useState<number>();

  // 是否可编辑
  const [disabled, setDisabled] = useState<boolean>(false);
  // 商品详情
  const [comDetail, setComDetail] = useState<any>();

  // 初始化获取详情
  useEffect(() => {
    if (history.location.query) {
      const { Id, type } = history.location.query as any;
      if (type === 'check') {
        setDisabled(true);
      } else {
        setDisabled(false);
      }

      // 获取商品详情
      ProductService.getProductById({
        id: Id,
      }).then((res: any) => {
        if (res) {
          setComDetail(res);
          form.setFieldsValue({
            name: res.name,
            saleKeywords: res.saleKeywords.join(';'),
            intro: res.intro,
            hostingDays: res.hostingDays,
            serviceFeePercent: res.serviceFeePercent / 10,
            marketPrice: res.marketPrice / 100,
            price: res.price / 100,
            stockQty: res.stockQty,
            saleUnit: res.saleUnit,
            minUnitsForSale: res.minUnitsForSale,
            description: res.description,
          });

          // 轮播图 并且设置轮播图Id
          if (res.photos) {
            const photoArr = res.photos.photos || [];
            const dataArr = photoArr.map((item: any) => {
              return {
                id: item.Id,
                data: `data:${item.mimeType};base64,${item.data}`,
              };
            });
            setPhotos([...dataArr]);
            setPhotoId(res.photos.Id);
          }

          // 小图 并且设置图Id
          if (res.cover) {
            const coverBase64 = `data:${res.cover.mimeType};base64,${res.cover.photo}`;
            setCover(coverBase64);
            setCoverId(res.cover.Id);
          }
        }
      });
    }
  }, [history.location.query]);

  // 上传图片
  const uploadImg = (file: File) => {
    fileByBase64(file, async (base64: any) => {
      const { width, height } = await imgSize(base64);
      AlbumService.uploadPhoto({
        data: {
          // albumId: id,
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
  };

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
    uploadImg(file);

    return false;
  };

  // 上传进度改变函数
  const handleChange = () => {};

  const onCheck = async () => {
    try {
      // const values =
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
      ProductService.editProduct(
        { id: comDetail.Id },
        {
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
            description: editRef.current && editRef.current.txt.html(), // 商品详情
            saleUnit: Number(form.getFieldValue('saleUnit')), // 单份数量
            cover: coverId,
            photos: photoId,
          },
        },
      ).then((res: any) => {
        if (res) {
          message.success('操作成功');
          history.push('/commodity');
        }
      });
    }
  };

  // 取消
  const handleCancel = () => {
    history.goBack();
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
            <Input placeholder="请输入商品名称" disabled={disabled} />
          </Form.Item>
          <Form.Item label="商品标签" name="saleKeywords">
            <Input placeholder="多个需以;号分隔" disabled={disabled} />
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
            <Input disabled={disabled} />
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
                transform: (value) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input suffix="天" disabled={disabled} />
          </Form.Item>
          <Form.Item label="开挖方式" name="miningWay">
            <Radio.Group>
              {/* <Radio value={1}><Input suffix="天"/></Radio> */}
              <Radio value={1} disabled={disabled}>
                手动确认，次日凌晨
              </Radio>
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
                transform: (value) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input suffix="%" disabled={disabled} />
          </Form.Item>
          <Divider />
          <Form.Item
            label="每份原价"
            name="marketPrice"
            rules={[
              {
                required: true,
                transform: (value) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input suffix="CNY" disabled={disabled} />
          </Form.Item>
          <Form.Item
            label="每份现价"
            name="price"
            rules={[
              {
                required: true,
                transform: (value) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input suffix="CNY" disabled={disabled} />
          </Form.Item>
          <Divider />
          <Form.Item
            label="总量"
            name="stockQty"
            rules={[
              {
                required: true,
                transform: (value) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input suffix="份" disabled={disabled} />
          </Form.Item>
          <Form.Item
            label="单份数量"
            name="saleUnit"
            rules={[
              {
                required: true,
                transform: (value) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input suffix="T" disabled={disabled} />
          </Form.Item>
          <Form.Item
            label="默认最小购买份数"
            name="minUnitsForSale"
            rules={[
              {
                required: true,
                transform: (value) => Number(value),
                type: 'number',
                message: '必须为数字',
              },
            ]}
          >
            <Input disabled={disabled} />
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
                  return Promise.reject(new Error('前选择图片!'));
                },
              }),
            ]}
          >
            <Upload
              disabled={disabled}
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
                  return Promise.reject(new Error('前选择图片!'));
                },
              }),
            ]}
          >
            <Banner
              noDelete={disabled}
              photos={photos}
              setPhotos={setPhotos}
              photoId={photoId}
              setPhotoId={setPhotoId}
              form={form}
              disabled={disabled}
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
            {disabled ? (
              <div dangerouslySetInnerHTML={{ __html: comDetail?.description }}></div>
            ) : (
              <WangEditor
                getEditor={(edt: any) => {
                  editRef.current = edt;
                }}
                id="editor"
                htUeditor={500}
              />
            )}
          </Form.Item>
          <Form.Item>
            {!disabled && (
              <Button type="primary" onClick={handleSure}>
                确认
              </Button>
            )}
            <Button type="primary" style={{ margin: '0 16px' }} onClick={handleCancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CheckEditCommodity;
