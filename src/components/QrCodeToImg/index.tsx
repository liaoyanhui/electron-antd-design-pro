/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-09-01 16:46:41
 * @LastEditTime: 2021-10-20 09:18:40
 * @FilePath: /mining-admin-desktop/src/components/QrCodeToImg/index.tsx
 */
import React, { useEffect } from 'react';
// import { imgs } from '@/assets/images';

const QRCode = require('qrcode.react');

const QrCodeToImg: React.FC<{
  value?: any;
  size?: number;
}> = (props) => {
  const { value, size } = props;

  // canvas转换成png
  const changeCanvasToPic = () => {
    const canvasImg: any = document.getElementById('qrCode');
    const image = new Image();
    image.src = canvasImg?.toDataURL('image/png');

    // 将canvas格式图片转换成image
    const alink = document.createElement('img');
    alink.className = 'qrcode_img';
    alink.id = 'qr-img';
    alink.src = image.src;
    const qrImg = document.getElementById('qr-img');
    if (qrImg) {
      canvasImg.parentNode.replaceChild(alink, qrImg);
    } else {
      canvasImg.parentNode.insertBefore(alink, canvasImg);
    }
  };

  useEffect(() => {
    changeCanvasToPic();
  }, [value]);

  return (
    <QRCode
      size={size}
      value={value}
      level={'H'}
      style={{ display: 'none' }}
      id="qrCode"
      // imageSettings={{
      //   src: imgs.downLoadLogo,
      //   height: 100,
      //   width: 100,
      // }}
    />
  );
};

export default QrCodeToImg;
