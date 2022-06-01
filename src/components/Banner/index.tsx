/*
 * @Description: 轮播图 或者 分享图
 * @Author: 尚夏
 * @Date: 2021-08-27 21:40:49
 * @LastEditTime: 2021-11-22 10:28:53
 * @FilePath: /mining-admin-desktop/src/components/Banner/index.tsx
 */

import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Upload, message } from 'antd';
import { AlbumService } from '@/services';
import { CloseCircleOutlined } from '@ant-design/icons';
import { fileByBase64, imgSize } from '@/utils/utils';

const Banner = (props: {
  photos: string[];
  setPhotos: any;
  setPhotoId?: any;
  photoId?: any;
  form: any;
  disabled?: boolean;
  noDelete?: boolean;
}) => {
  const { photos, setPhotos, photoId, form, disabled, setPhotoId, noDelete } = props;

  // 上传图片
  const uploadFile = (file: File, id: any) => {
    fileByBase64(file, async (base64: any) => {
      const { width, height } = await imgSize(base64);
      AlbumService.uploadPhoto({
        data: {
          albumId: id,
          mimeType: base64.split(';')[0].split(':')[1],
          data: base64.split(',')[1],
          width,
          height,
        },
      }).then((response: any) => {
        if (response) {
          form.resetFields(['banner']);
          setPhotos([
            ...photos,
            {
              id: response.Id,
              data: base64,
            },
          ]);
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
    if (photoId) {
      uploadFile(file, photoId);
      return false;
    }
    AlbumService.createAlbum({
      data: {
        title: 'photos',
      },
    }).then((res: any) => {
      setPhotoId(res.Id);
      uploadFile(file, res.Id);
    });
    return false;
  };

  // 上传进度改变函数
  // const handleChange = ({ }) => {
  //   console.log(fileList, 'fileList');
  // };

  // 删除
  const handleDelete = (i: number, Id: any) => {
    AlbumService.deletePhoto({
      id: Id,
    }).then((res: any) => {
      if (res) {
        const newArr = photos.filter((item: any, index: number) => {
          return index !== i;
        });
        setPhotos([...newArr]);
      }
    });
  };

  return (
    <>
      <div className={styles.banner_box}>
        <div className={styles.logo_img}>
          {photos?.map((item: any, index: number) => {
            return (
              <div key={index} className={styles.box}>
                <img src={item.data} alt="" />
                {!noDelete && (
                  <CloseCircleOutlined
                    className={styles.icon}
                    onClick={() => handleDelete(index, item.id)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <Upload
          disabled={disabled}
          action=""
          listType="picture-card"
          showUploadList={false}
          className={styles.uploader_banner}
          // fileList={fileList}
          beforeUpload={beforeUpload}
          // onChange={handleChange}
        >
          {photos.length >= 5 ? null : (
            <div>
              <div>添加</div>
            </div>
          )}
        </Upload>
      </div>
    </>
  );
};

export default Banner;
