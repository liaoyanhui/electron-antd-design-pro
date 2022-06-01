/* eslint-disable prefer-template */
/* eslint-disable no-restricted-properties */
/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-05 15:22:24
 * @LastEditTime: 2022-05-27 11:11:13
 * @FilePath: /mining-admin-desktop/src/utils/utils.ts
 */
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
// const reg =
//   /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

// export const isUrl = (path: string): boolean => reg.test(path);

// export const isAntDesignPro = (): boolean => {
//   if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
//     return true;
//   }
//   return window.location.hostname === 'preview.pro.ant.design';
// };

// // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
// export const isAntDesignProOrDev = (): boolean => {
//   const { NODE_ENV } = process.env;
//   if (NODE_ENV === 'development') {
//     return true;
//   }
//   return isAntDesignPro();
// };

import BigNumber from 'bignumber.js';

/**
 *  工具函数
 */
const { shell } = window.require('electron');

// 地址格式转换
export const formatAddress = (address: string) => {
  if (!address) return null;
  if (address.length < 12) return address;
  return `${address.substring(0, 6)}...${address.substr(-6)}`;
};

/**
 * @description:  UTC时间转化为本地时间
 * @param {string} UTCDateString
 * @param {boolean} noTime 是否显示时间 默认显示  true 不显示
 * @return {*}
 */
export const convertUTCTimeToLocalTime = (UTCDateString: string, noTime?: boolean) => {
  if (!UTCDateString) {
    return '-';
  }
  function formatFunc(str: any) {
    // 格式化显示
    return str > 9 ? str : `0${str}`;
  }
  const date2 = new Date(UTCDateString); // 这步是关键
  const year = date2.getFullYear();
  const mon = formatFunc(date2.getMonth() + 1);
  const day = formatFunc(date2.getDate());
  let hour = date2.getHours();
  // const noon = hour >= 12 ? 'PM' : 'AM';
  // hour = hour >= 12 ? hour - 12 : hour;
  hour = formatFunc(hour);
  const min = formatFunc(date2.getMinutes());
  let dateStr = `${year}-${mon}-${day}`;
  if (!noTime) {
    dateStr = `${dateStr} ${hour}:${min}`;
  }
  // dateStr = `${year}-${mon}-${day} ${hour}:${min}`;
  // const dateStr = `${year}-${mon}-${day} ${hour}:${min}`;
  return dateStr;
};

/**
 * 上传附件转base64
 * @param {File} file 文件流
 */
export const fileByBase64 = (file: File, callback: any) => {
  const reader = new FileReader();
  // 传入一个参数对象即可得到基于该参数对象的文本内容
  reader.readAsDataURL(file);
  reader.onload = function (e: any) {
    // target.result 该属性表示目标对象的DataURL
    // console.log(e.target.result);
    callback(e.target.result);
  };
};

// export const demoFor = (urlData: any) => {
//    base64.replace('data:image/jpeg;base64,', '')
//    return window.btoa(urlData.split(',')[0].replace(/-/g, '+').replace(/_/g, '/'));
// };

export const setStore = (name: string, content: any) => {
  if (!name) return;
  let newContent = content;
  if (typeof content !== 'string') {
    newContent = JSON.stringify(content);
  }
  window.localStorage.setItem(name, newContent);
};

/**
 * 获取localStorage
 */
export const getStore = (name: string) => {
  if (!name) return;
  // eslint-disable-next-line consistent-return
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = (name: string) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

// 数字每3位添加一个逗号
const commaAdd = (str: string) => {
  return Number(str).toLocaleString();
};

// 分转换成元
export const fenToCny = (fen: any) => {
  if (!fen) return '-';
  const num = String(fen / 100);
  const index = num.indexOf('.');
  if (index > -1) {
    const n = num.slice(0, index);
    // 不够补0
    const d = `${num}00`.slice(index, index + 3);
    return `${commaAdd(n)}${d}`;
  }
  return `${commaAdd(num)}.00`;
};

// 元转换成分
export const cnyToFen = (cny: any) => {
  if (!cny) return '0.00';
  return Math.floor(cny * 100);
};

// 科学技术法转换成小数
const toD = (val: number) => {
  const e = String(val);
  const rex = /^([0-9]).?([0-9]*)e-([0-9]*)/;
  if (!rex.test(e)) return val;
  const numArr: any = e.match(rex);
  const n = Number('' + numArr[1] + (numArr[2] || ''));
  const num = '0.' + String(Math.pow(10, Number(numArr[3]) - 1)).substr(1) + n;
  return num.replace(/0*$/, ''); // 防止可能出现0.0001540000000的情况
};

/**
 * @description: filecoin 单位转换成
 * @param {any} number file值
 * @param {number} digit 保留单位数 默认是8位
 * @return {*}
 */
export const transformFIL = (number: any, digit?: number | string): any => {
  let zeroNum = '';
  let sliceZero: any = 8;
  if (digit) {
    sliceZero = digit;
    let whileZero: any = digit;
    while (whileZero > 0) {
      zeroNum += '0';
      whileZero -= 1;
    }
  } else {
    zeroNum = '00000000';
  }
  if (!number) {
    if (digit === '0') {
      return '0';
    }
    return `0.${zeroNum}`;
  }
  const FIL = String(toD(number / Math.pow(10, 18)));

  // const FIL = new BigNumber(number / Math.pow(10, 18)).toFixed();

  const index = FIL.indexOf('.');

  if (index > -1) {
    const n = FIL.slice(0, index);
    // 不够补0
    const d = `${FIL}${zeroNum}`.slice(index, index + sliceZero + 1);
    if (digit === '0') {
      return commaAdd(n);
    }
    return `${commaAdd(n)}${d}`;
  }
  // 如果保留0位 去除小数点
  if (digit === '0') {
    return commaAdd(FIL);
  }
  return `${commaAdd(FIL)}.${zeroNum}`;
};

// 传入数据库需要filecoin转换 转为18位
export const fileToEnd = (number: any) => {
  if (!number) return null;

  // console.log(new BigNumber(number * Math.pow(10, 18)).toFixed());

  // eslint-disable-next-line no-restricted-properties
  return new BigNumber(number).multipliedBy(Math.pow(10, 18)).toFixed();
};

/**
 * @msg: 获取图片大小
 * @param {string} url
 * @return:
 */
export const imgSize = (url: string): Promise<any> => {
  const imgObj = new Image();
  imgObj.src = url || '';
  return new Promise((resolve) => {
    imgObj.onload = () => {
      imgObj.onload = null;
      resolve({ width: imgObj.width, height: imgObj.height });
    };
  });
};

// 通过message 跳转到三方浏览器 默认 FIL
export const dropThirdBrowser = (tx: string, type?: string) => {
  if (!type) {
    shell.openExternal(`https://filfox.info/zh/message/${tx}`);
  }
  if (type === 'BTC') {
    shell.openExternal(`https://filfox.info/zh/message/${tx}`);
  }
  if (type === 'USDT') {
    shell.openExternal(`https://filfox.info/zh/message/${tx}`);
  }
};

// T转换成P
export const tToP = (t: number) => {
  if (!t) return '0.000';
  const p: number = t / 1024;
  const index = p.toString().indexOf('.');
  if (index > -1) {
    return p.toString().slice(0, index + 5);
  }
  return p;
};

// 手机号加密
export const phoneEncryption = (p: string) => {
  if (p.length < 7) return p;
  return `${p.slice(0, 3)}***${p.slice(-4)}`;
};
