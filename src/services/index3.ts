/** Generate by swagger-axios-codegen */
// @ts-ignore
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-ignore
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(
  configs: IRequestConfig,
  resolve: (p: any) => void,
  reject: (p: any) => void,
): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(
  method: string,
  contentType: string,
  url: string,
  options: any,
): IRequestConfig {
  const configs: IRequestConfig = { ...options, method, url };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType,
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class AuthService {
  /**
   * 发送验证码短信
   */
  static sendVerificationCodeBySms(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/security/verification/sms/send';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 手机号登录
   */
  static signinByMobile(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/signin/mobile';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 登出
   */
  static signout(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/signout';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class OwnerService {
  /**
   * 创建平台, 需要Owner权限操作
   */
  static createPlatform(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/owner/platforms/create';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 创建app版本
   */
  static createAppRelease(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/owner/app/releases/create';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 编辑app版本
   */
  static editAppRelease(
    params: {
      /** 版本Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/owner/app/releases/{Id}/edit';
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 发布app版本
   */
  static publishAppRelease(
    params: {
      /** 版本Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/owner/app/releases/{Id}/publish';
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 撤消app版本发布
   */
  static revokePublishedAppRelease(
    params: {
      /** 版本Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/owner/app/releases/{Id}/revoke';
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * app新版本发布
   */
  static fetchAppReleaseList(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/owner/app/releases/list';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 上传android的apk文件
   */
  static uploadAndroidReleaseApk(
    params: {
      /** 版本Id */
      id: number;
      /**  */
      androidApk: any;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/owner/app/releases/{Id}/android/upload';
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'multipart/form-data', url, options);

      let data = null;
      data = new FormData();
      if (params['androidApk']) {
        if (Object.prototype.toString.call(params['androidApk']) === '[object Array]') {
          for (const item of params['androidApk']) {
            data.append('androidAPK', item as any);
          }
        } else {
          data.append('androidAPK', params['androidApk'] as any);
        }
      }

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 设置平台参数, 需要Owner权限操作
   */
  static settingPlatform(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/owner/platforms/{Id}/setting/edit';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 将某个平台下面的顾客绑定到新平台上去, 需要Owner权限操作
   */
  static rebindCustomerToPlatform(
    params: {
      /** 平台Id */
      id: number;
      /** 旧的平台下的顾客Id */
      customerId: number;
      /** 新的平台Id */
      newPlatformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/owner/platforms/{Id}/customer/rebind';
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { customerId: params['customerId'], newPlatformId: params['newPlatformId'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回所有平台列表
   */
  static getPlatformList(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/owner/platforms/list';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回所有平台列表
   */
  static getPlatformList1(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/list';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class PlatformService {
  /**
   * 编辑平台信息
   */
  static editProfile(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{Id}/edit';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回单个平台
   */
  static getPlatformById(
    params: {
      /** Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{Id}';
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class FilecoinService {
  /**
   * 获取Fil全网信息
   */
  static getFilecoinNetworkStatitics(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/filecoin/network';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 获取Filecoin全网24小时平均单T收益
   */
  static getFilecoinMiningEfficiency(
    params: {
      /** 获取哪一天的平均收益 */
      dayAt: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/filecoin/network/mining/efficiency';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { dayAt: params['dayAt'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回filecoin提现列表
   */
  static getFilecoinWithdrawList(
    params: {
      /** 平台Id */
      platformId: number;
      /** 过滤条件 */
      filterBy: string;
      /** 过滤值 */
      filter?: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/withdraw/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { filterBy: params['filterBy'], filter: params['filter'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回单条filecoin提现
   */
  static getFilecoinWithdrawLine(
    params: {
      /** 平台Id */
      platformId: number;
      /** 提现Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/withdraw/{Id}';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 提现审核通过, 状态置为待打币
   */
  static processFilecoinWithdraw(
    params: {
      /** 平台Id */
      platformId: number;
      /** 提现Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/withdraw/{Id}/process';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 已提现, 状态置为提现完成
   */
  static completeFilecoinWithdraw(
    params: {
      /** 平台Id */
      platformId: number;
      /** 提现Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/withdraw/{Id}/complete';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 拒绝提现
   */
  static refuseFilecoinWithdraw(
    params: {
      /** 平台Id */
      platformId: number;
      /** 提现Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/withdraw/{Id}/refuse';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回单个存储
   */
  static getFilecoinStorageById(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      orderId?: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/storage';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { orderId: params['orderId'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 新增封装存储
   */
  static addFilecoinSealedStorage(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      orderId?: number;
      /** 新增存储空间大小, 1代表1TiB存储 */
      storage?: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/storage/sealed/add';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { orderId: params['orderId'], storage: params['storage'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回存储列表
   */
  static getFilecoinStorageList(
    params: {
      /** 平台Id */
      platformId: number;
      /** 过滤条件 */
      filterBy: string;
      /** 过滤值 */
      filter?: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/storage/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { filterBy: params['filterBy'], filter: params['filter'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 手动创建结算单
   */
  static createFilecoinSettlement(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/settlement/create';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 手动创建结算单
   */
  static createFilecoinSettlementInDay(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/settlement/day/create';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 确认结算单, 发放收益
   */
  static confirmFilecoinSettlement(
    params: {
      /** 平台Id */
      platformId: number;
      /** 结算单号 */
      settlementNo: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/settlement/{settlementNo}/confirm';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{settlementNo}', params['settlementNo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回Filecoin结算单列表
   */
  static getFilecoinSettlementList(
    params: {
      /** 平台Id */
      platformId: number;
      /** 过滤条件 */
      filterBy: string;
      /** 过滤值 */
      filter?: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/settlement/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { filterBy: params['filterBy'], filter: params['filter'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回Filecoin单条结算单明细
   */
  static getFilecoinSettlement(
    params: {
      /** 平台Id */
      platformId: number;
      /** 结算单号 */
      settlementNo: string;
      /** 过滤条件 */
      filterBy: string;
      /** 过滤值 */
      filter?: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/settlement/{settlementNo}';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{settlementNo}', params['settlementNo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { filterBy: params['filterBy'], filter: params['filter'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回Filecoin结算平台结算明细列表
   */
  static getFilecoinPlatformSettlementList(
    params: {
      /** 平台Id */
      platformId: number;
      /** 过滤条件 */
      filterBy: string;
      /** 过滤值 */
      filter?: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/settlement/platform/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { filterBy: params['filterBy'], filter: params['filter'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回Filecoin结算单个平台结算明细
   */
  static getFilecoinPlatformSettlement(
    params: {
      /** 平台Id */
      platformId: number;
      /** 结算单号 */
      settlementNo: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/settlement/{settlementNo}/platform';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{settlementNo}', params['settlementNo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回Filecoin结算单, 推荐人结算明细列表
   */
  static getFilecoinReferrerSettlementList(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/settlement/refferrer/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回Filecoin结算单, 单条推荐人结算明细
   */
  static getFilecoinReferrerSettlement(
    params: {
      /** 平台Id */
      platformId: number;
      /** 结算单号 */
      settlementNo: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/filecoin/settlement/{settlementNo}/refferrer';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{settlementNo}', params['settlementNo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class AgreementService {
  /**
   * 返回所有协议列表
   */
  static getAgreementList(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/agreements/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回单条协议
   */
  static getAgreementById(
    params: {
      /** 平台Id */
      platformId: number;
      /** Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/agreements/{Id}';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 创建协议
   */
  static createAgreement(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/agreements/create';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 编辑协议
   */
  static editAgreement(
    params: {
      /** 平台Id */
      platformId: number;
      /** Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/agreements/{Id}/edit';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class NoticeService {
  /**
   * 获取单个平台
   */
  static getNoticeById(
    params: {
      /** 平台Id */
      platformId: number;
      /** Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/notices/{Id}';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 获取平台公告列表
   */
  static getNoticeList(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/notices/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 创建公告
   */
  static createNotice(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/notices/create';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 修改公告
   */
  static editNotice(
    params: {
      /** 平台Id */
      platformId: number;
      /** Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/notices/{Id}/edit';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 发布公告
   */
  static publishNotice(
    params: {
      /** 平台Id */
      platformId: number;
      /** Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/notices/{Id}/publish';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 撤回公告
   */
  static revokeNotice(
    params: {
      /** 平台Id */
      platformId: number;
      /** Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/notices/{Id}/revoke';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class AlbumService {
  /**
   * 创建相册
   */
  static createAlbum(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/albums/create';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 删除图片
   */
  static deletePhoto(
    params: {
      /** 平台Id */
      platformId: number;
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/photos/{Id}/delete';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 上传图片
   */
  static uploadPhoto(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/photos/upload';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class PhotoService {
  /**
   * 获取单个图片
   */
  static getPhotoById(
    params: {
      /** 平台Id */
      platformId: number;
      /** Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/photos/{Id}';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class CustomerService {
  /**
   * 返回单个顾客
   */
  static getCustomerById(
    params: {
      /** 平台Id */
      platformId: number;
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/customers/{Id}';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 创建顾客
   */
  static createCustomer(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/customers/create';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 绑定推荐人
   */
  static rebindCustomerReferrer(
    params: {
      /** 平台Id */
      platformId: number;
      /** 顾客Id */
      id: number;
      /** 推荐人顾客Id */
      referrerId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/customers/{Id}/referrer/rebind';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { referrerId: params['referrerId'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 编辑顾客
   */
  static editCustomer(
    params: {
      /** 平台Id */
      platformId: number;
      /** 顾客Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/customers/{Id}/edit';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回顾客列表
   */
  static getCustomerList(
    params: {
      /** 平台Id */
      platformId: number;
      /** 过滤条件 */
      filterBy: string;
      /** 过滤值 */
      filter?: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/customers/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { filterBy: params['filterBy'], filter: params['filter'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class ReferrerService {
  /**
   * 返回推荐人列表
   */
  static getReferrerList(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/referrer/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回单个推荐人
   */
  static getReferrerById(
    params: {
      /** 平台Id */
      platformId: number;
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/referrer/{Id}';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回推荐人下的顾客列表
   */
  static getReferrerCustomerList(
    params: {
      /** 平台Id */
      platformId: number;
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/referrer/{Id}/customer/list';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回设置推荐人佣金
   */
  static setReferrerCommission(
    params: {
      /** 平台Id */
      platformId: number;
      /**  */
      id: number;
      /**  */
      commissionRate: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/referrer/{Id}/commission';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { commissionRate: params['commissionRate'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class ProductService {
  /**
   * 创建商品
   */
  static createProduct(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/products/create';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回商品列表
   */
  static getProducts(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/products/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回单个商品
   */
  static getProductById(
    params: {
      /** 平台Id */
      platformId: number;
      /** 产品Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/products/{Id}';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 修改商品
   */
  static editProduct(
    params: {
      /** 平台Id */
      platformId: number;
      /** 产品Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/products/{Id}/edit';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 修改商品状态
   */
  static changeProductState(
    params: {
      /** 平台Id */
      platformId: number;
      /** 产品Id */
      id: number;
      /** 新的商品状态 */
      state: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/products/{Id}/state/change';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { state: params['state'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 创建订单
   */
  static purchaseProduct(
    params: {
      /** 平台Id */
      platformId: number;
      /** 产品Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/products/{Id}/purchase';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class OrderService {
  /**
   * 获取单个订单
   */
  static getOrderById(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/orders/{Id}';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回订单的列表
   */
  static getOrderList(
    params: {
      /** 平台Id */
      platformId: number;
      /** 过滤条件 */
      filterBy: string;
      /** 过滤值 */
      filter?: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/orders/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { filterBy: params['filterBy'], filter: params['filter'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 备注订单
   */
  static commentOrder(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/orders/{Id}/comment';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 取消订单
   */
  static cancelOrder(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/orders/{Id}/cancel';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 取消拒绝订单
   */
  static refuseCancelOrder(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/orders/{Id}/cancel/refuse';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 确认取消订单
   */
  static confirmCancelOrder(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/orders/{Id}/cancel/confirm';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 确认已支付质押币(包括gas费消耗)
   */
  static editOrderSealCostRequired(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      id: number;
      /** 实际需要的质押FIL数量 */
      pledgeAmount: number;
      /** 实际需要的Gas消耗FIL数量 */
      gasAmount: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/orders/{Id}/seal/cost/edit';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { pledgeAmount: params['pledgeAmount'], gasAmount: params['gasAmount'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 确认已支付
   */
  static completeOrderPayment(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/orders/{Id}/sale/payment/complete';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 确认已支付质押币(包括gas费消耗)
   */
  static completeOrderSealCostPayment(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/orders/{Id}/seal/cost/payment/complete';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 开始封装
   */
  static startOrderSealing(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/orders/{Id}/sealing/start';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 封装结束, 全部算力已交付运行
   */
  static startOrderMining(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/orders/{Id}/mining/start';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 算力合约运行周期, 到期结束
   */
  static finishOrder(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/orders/{Id}/finish';
      url = url.replace('{platformId}', params['platformId'] + '');
      url = url.replace('{Id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 获取订单封装成本
   */
  static getSealCostForOrder(
    params: {
      /** 平台Id */
      platformId: number;
      /** 订单Id */
      orderId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/payment/order/filecoin/seal/cost';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { orderId: params['orderId'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 确认支付所需的订单封装成本
   */
  static createFilecoinSealCostPayment(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/payment/order/filecoin/seal/cost/create';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class PaymentService {
  /**
   * 创建订单法币支付明细
   */
  static createOrderFiatPayment(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/payment/order/fiat/create';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回订单法币支付明细列表
   */
  static getOrderFiatPaymentList(
    params: {
      /** 平台Id */
      platformId: number;
      /** 过滤条件 */
      filterBy: string;
      /** 过滤值 */
      filter?: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/payment/order/fiat/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { filterBy: params['filterBy'], filter: params['filter'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 创建订单数字支付明细
   */
  static createOrderCryptoPayment(
    params: {
      /** 平台Id */
      platformId: number;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/payment/order/crypto/create';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回订单数字货币支付明细列表
   */
  static getOrderCyrptoPaymentList(
    params: {
      /** 平台Id */
      platformId: number;
      /** 过滤条件 */
      filterBy: string;
      /** 过滤值 */
      filter?: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/payment/order/crypto/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { filterBy: params['filterBy'], filter: params['filter'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   * 返回filecoin封装支付明细列表
   */
  static getFilecoinSealCostPaymentList(
    params: {
      /** 平台Id */
      platformId: number;
      /** 过滤条件 */
      filterBy: string;
      /** 过滤值 */
      filter?: string;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/platforms/{platformId}/payment/order/filecoin/seal/cost/list';
      url = url.replace('{platformId}', params['platformId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { filterBy: params['filterBy'], filter: params['filter'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export interface Error {
  /**  */
  code: string;

  /**  */
  message: string;
}

export interface FilecoinNetworkStatitics {
  /** FIL价格 */
  filPrice?: string;

  /** 全网算力 */
  networkStoragePower?: string;

  /** 最近24小时算力增长 */
  latest24hPowerGrowth?: string;

  /** 最近24小时挖矿效率 */
  latest24hEfficiencny?: string;

  /** 当前扇区质押量 */
  sectorInitialPledge?: string;

  /** 32G扇区Gas消耗 */
  gasUsedOf32GSector?: string;

  /** 32G扇区封装成本 */
  costOfSeal32GSector?: string;

  /** 64G扇区Gas消耗 */
  gasUsedOf64GSector?: string;

  /** 64G扇区封装成本 */
  costOfSeal64GSector?: string;
}

export interface AppRelease {
  /**  */
  Id?: number;

  /** 版本号 */
  version: string;

  /** app平台 */
  platform: EnumAppReleasePlatform;

  /**  */
  state?: EnumAppReleaseState;

  /** 更新内容 */
  releaseNotes: string;

  /** 下载链接 */
  downloadURL?: string;

  /** 已上传的安卓安装包文件名 */
  androidPackageFileName?: string;

  /** 备注 */
  comment?: string;

  /** 发布日期 */
  publishedAt?: Date;

  /** 创建日期 */
  createdAt?: Date;
}

export interface PlatformSetting {
  /** Filecoin算力产品平台服务费, 1代表千分之一 */
  filecoinStorageProductServiceFeePercent: number;

  /** 推荐人的默认佣金百分比 */
  referrerCommissionRate: number;

  /** 用户下单确认购买后的提示内容 */
  productPurchaseSpecifiction: string;
}

export interface Platform {
  /**  */
  Id?: number;

  /** 名称 */
  name?: string;

  /** 是否是自营平台 */
  isSelfOperated?: boolean;

  /** 是否是演示平台 */
  isDemoPlatform?: boolean;

  /** 平台介绍 */
  intro?: string;

  /** 平台App下载地址 */
  appDownloadPageURL?: string;

  /**  */
  carousels?: PhotoAlbum[];

  /** 订单支付方式(法币) */
  orderPaymethods?: FiatPayMethod[];

  /** 用户服务协议Id */
  userServiceAgreement?: Agreement;

  /** 隐私条款协议Id */
  privacyPolicyAgreement?: Agreement;

  /** IPFS分布式存储购买及服务托管协议Id */
  salesContractAndHostingServiceAgreement?: Agreement;

  /** 关于我们 */
  aboutUsAgreement?: Agreement;

  /** 联系客服 */
  customerServiceContact?: ContactDetails;

  /** 联系客服 */
  settings?: PlatformSetting;

  /** 创建时间 */
  createdAt?: Date;
}

export interface ContactDetails {
  /** 微信号 */
  wechatNumber?: string;

  /** 微信名片 */
  wechatBusinessCard?: string;

  /** 手机号 */
  mobile?: string;
}

export interface FiatPayMethod {
  /**  */
  icon?: string;

  /** 开户银行 */
  bankName?: string;

  /** 账户名称 */
  accountName?: string;

  /** 账户号码 */
  accountNo?: string;

  /** 备注 */
  comment?: string;
}

export interface Agreement {
  /**  */
  Id?: number;

  /** 标题 */
  title?: string;

  /** 内容 */
  content?: string;

  /** 创建时间 */
  createdAt?: Date;
}

export interface PhotoAlbum {
  /**  */
  Id?: number;

  /** 相册 */
  title?: string;

  /**  */
  Photos?: Photo[];

  /** 创建时间 */
  createdAt?: Date;
}

export interface Photo {
  /**  */
  Id?: number;

  /**  */
  mimeType?: EnumPhotoMimeType;

  /**  */
  height?: number;

  /**  */
  width?: number;

  /**  */
  data?: string;

  /** 创建时间 */
  createdAt?: Date;
}

export interface Notice {
  /**  */
  Id?: number;

  /** 标题 */
  title?: string;

  /** 内容 */
  content?: string;

  /** 弹窗显示 */
  displayPopup?: boolean;

  /** 是否需要确认我已阅读 */
  readConfirm?: boolean;

  /** 创建|发布|撤回 */
  state?: EnumNoticeState;

  /** 创建时间 */
  createdAt?: Date;

  /** 发布时间 */
  publishedAt?: Date;

  /** 撤回时间 */
  revokedAt?: Date;
}

export interface Product {
  /**  */
  Id?: number;

  /** 产品名称 */
  name: string;

  /** 销售方式, 目前只支持按存储单位销售 */
  saleMethod: EnumProductSaleMethod;

  /** 销售单位, 如果按存储单位销售值1代表1T存储 */
  saleUnit: number;

  /** 最小起售数量，值的意思与销售方式和销售单位相关 */
  minUnitsForSale: number;

  /** 库存数量，值的意思与销售方式和销售单位相关 */
  stockQty: number;

  /** 销售价或者现价，精确到人民币分, 数值1代表人民币1分 */
  price: number;

  /** 市场价或原价, 精确到人民币分，数值1代表人民币1分 */
  marketPrice: number;

  /** 平台服务费，1代表千分之一 */
  serviceFeePercent: number;

  /** 产品托管年限, 例如540天+540天 */
  hostingDays: number;

  /** 销售量 */
  salesVolume: number;

  /** 产品封面, PhotoId */
  cover: number;

  /** 产品PhotoAlbumId */
  photos: number;

  /** 产品营销关键词 */
  saleKeywords?: string[];

  /** 产品简介 */
  intro?: string;

  /** 产品详情 */
  description?: string;

  /** 产品状态 - 已创建|上架可销售状态|下架|内部销售,对外不可见|缺货不可销售|敬请期待不可销售|已取消 */
  state?: EnumProductState;

  /** 创建时间 */
  createdAt?: Date;

  /** 上架时间 */
  openedAt?: Date;

  /** 取消时间 */
  canceledAt?: Date;

  /** 完成时间 */
  finishedAt?: Date;
}

export interface Order {
  /**  */
  Id?: number;

  /** 订单编号 */
  orderNo?: string;

  /** 顾客Id */
  customerId?: number;

  /** 顾客备注名 */
  customerRemarksName?: number;

  /** 顾客手机号码 */
  customerMobile?: string;

  /** 产品名称 */
  productName?: string;

  /** 客户留言 */
  customerComment?: string;

  /** 平台服务费，1代表千分之一 */
  serviceFeePercent?: number;

  /** 销售方式, 目前只支持按存储单位销售 */
  saleMethod?: EnumOrderSaleMethod;

  /** 销售单位, 如果按存储单位销售值1代表1T存储 */
  saleUnit?: number;

  /** 订单成交价, 精确到人民币分，数值1代表人民币1分 */
  price?: number;

  /** 销售份数 */
  qty?: number;

  /** 实收总金额 */
  paidAmount?: number;

  /** 订单状态 - 待确认|待质押|待封装|封装中|挖矿中|已取消|取消等待后台确认|已结束 */
  state?: EnumOrderState;

  /** 订单的存储容量(可理解为算力), 1代表1T存储空间 */
  storage?: number;

  /** 订单的目前封装完的存储容量(可理解为已交付的算力), 1代表1T存储空间 */
  sealedStorage?: number;

  /** 预估需要的质押FIL数量 */
  estimatePledgeAmount?: number;

  /** 预估需要的Gas消耗FIL数量 */
  estimateGasAmount?: number;

  /** 实际需要的质押FIL数量, 如果后台管理员未设置此值, 则为null */
  pledgeAmount?: number;

  /** 实际需要的Gas消耗FIL数量, 如果后台管理员未设置此值, 则为null */
  gasAmount?: number;

  /** 取消原因 */
  cancelReason?: Date;

  /** 拒绝取消原因 */
  cancelRefuseReason?: string;

  /** 内部备注 */
  internalComment?: string;

  /** 子订单 */
  subOrders?: any | null[];

  /** 创建时间 */
  createdAt?: Date;

  /** 付款时间 */
  paidAt?: Date;

  /** 开挖时间 */
  mininingAt?: Date;

  /** 取消时间 */
  canceledAt?: Date;

  /** 挖矿服务结束时间 */
  finishedAt?: Date;
}

export interface OrderFiatPayment {
  /**  */
  Id?: number;

  /** 产品Id */
  productId?: number;

  /** 产品名称 */
  productName?: string;

  /** 订单Id */
  orderId?: number;

  /** 银行名称 */
  bankName?: string;

  /** 银行流水单号 */
  bankStatementNo?: string;

  /** 金额, 精确到分, 值1代表人民币1分 */
  amount?: number;

  /** 支付明细截图 */
  paymentScreenshots?: string;

  /** 备注 */
  comment?: string;

  /** 创建日期 */
  createdAt?: Date;
}

export interface OrderCryptoPayment {
  /**  */
  Id?: number;

  /** 产品Id */
  productId?: number;

  /** 产品名称 */
  productName?: string;

  /** 订单Id */
  orderId?: number;

  /** 数字货币代码 */
  currency?: EnumOrderCryptoPaymentCurrency;

  /** 数字货币金额 */
  amount?: number;

  /** 交易或消息Id */
  txOrMessageId?: string;

  /** 备注 */
  comment?: string;

  /** 创建日期 */
  createdAt?: Date;
}

export interface Customer {
  /**  */
  Id?: number;

  /** 昵称 */
  nickName?: string;

  /** 手机号 */
  mobile?: string;

  /** Fil提现地址 */
  filecoinlWithdrawAddress?: string;

  /** 推荐人Id */
  referrerCustomerId?: number;

  /** 推荐人名称 */
  referrerCustomerName?: string;

  /** 推荐人手机号 */
  referrerCustomerMobile?: string;

  /** 内部备注名 */
  internalRemarksName?: string;

  /** 描述信息 */
  description?: string;

  /** 创建时间 */
  createdAt?: Date;
}

export interface Referrer {
  /**  */
  Id?: number;

  /** 昵称 */
  nickName?: string;

  /** 手机号 */
  mobile?: string;

  /** 内部备注名 */
  internalRemarksName?: string;

  /** 返佣比例 */
  commissionRate?: number;

  /** 创建时间 */
  createdAt?: Date;
}

export interface FilecoinOrderSealCost {
  /** 订单Id */
  orderId?: number;

  /** 订单存储容量, 1代表1T存储 */
  orderStorage?: number;

  /** FIL支付地址 */
  paymentAddress?: string;

  /** 质押FIL数量 */
  pledgeAmount?: number;

  /** Gas消耗FIL数量 */
  gasAmount?: number;
}

export interface FilecoinSealCostPayment {
  /**  */
  Id?: number;

  /** 产品Id */
  productId?: number;

  /** 产品名称 */
  productName?: string;

  /** 顾客Id */
  customerId?: number;

  /** 顾客名称 */
  customerName?: string;

  /** 顾客手机号 */
  customerMobile?: string;

  /**  */
  orderId?: number;

  /** 订单编号 */
  orderNo?: string;

  /** 支付类型, 质押质|GAS费 */
  type?: EnumFilecoinSealCostPaymentType;

  /** 消息Id */
  messageId?: string;

  /** 支付地址 */
  toAddress?: string;

  /** 支付FIl数量 */
  amount?: number;

  /** 内部备注 */
  comment?: string;

  /** 创建时间 */
  createdAt?: Date;
}

export interface FilecoinWithdrawLine {
  /**  */
  Id?: number;

  /** 提现单号 */
  withdrawNo?: string;

  /** 顾客Id */
  customerId?: number;

  /** 顾客名称 */
  customerName?: string;

  /** 顾客手机号 */
  customerMobile?: string;

  /**  */
  state?: EnumFilecoinWithdrawLineState;

  /** 消息Id */
  messageId?: string;

  /** 提现地址 */
  toAddress?: string;

  /** 提现金额 */
  amount?: number;

  /** 拒绝原因, 备注 */
  refuseComment?: string;

  /** 内部后台备注 */
  internalComment?: string;

  /** 创建时间 */
  createdAt?: Date;

  /** 拒绝时间 */
  refusedAt?: Date;

  /** 完成时间 */
  completedAt?: Date;
}

export interface FilecoinStorage {
  /** 产品Id */
  productId?: number;

  /** 产品名称 */
  productName?: string;

  /** 顾客Id */
  customerId?: number;

  /** 顾客名称 */
  customerName?: string;

  /** 顾客手机号 */
  customerMobile?: string;

  /**  */
  orderId?: number;

  /** 订单编号 */
  orderNo?: string;

  /** 购买的存储空间大小, 值1代表1Tib */
  storage?: number;

  /** 购买的存储, 当前已封装的大小, 值1代表1Tib */
  sealedStorage?: number;

  /** 工作中|暂停|无效 */
  state?: EnumFilecoinStorageState;

  /** 创建时间 */
  createdAt?: Date;
}

export interface FilecoinSettlementLine {
  /** 结算单编号 */
  settlementNo?: string;

  /**  */
  customers?: object[];

  /** 结算单状态 */
  state?: EnumFilecoinSettlementLineState;

  /** 单T24小时理论收益 */
  latest24hMiningEfficiency?: string;

  /** 存储空间大小, 1代表1TiB存储 */
  storage?: number;

  /** 理论收益, 不扣手续费 */
  rewardAmount?: number;

  /** 结算收益, 用户实际所得的收益 */
  settledAmount?: number;

  /** 锁仓收益 */
  vestingAmount?: number;

  /** 解锁释放出的收益 */
  vestingUnlockAmount?: number;

  /** 平台收取的服务费 */
  serviceFeeAmount?: number;

  /** 结算单备注 */
  comment?: string;

  /** 结算时间 */
  settleDay?: Date;

  /** 创建时间 */
  createdAt?: Date;

  /** 确认时间 */
  confirmedAt?: Date;
}

export interface FilecoinSettlementPlatformLine {
  /** 结算单号 */
  settlementNo?: string;

  /** 存储空间大小, 1代表1TiB存储 */
  storage?: number;

  /** 结算收益, 平台实际所得的收益 */
  settledAmount?: number;

  /** 锁仓收益 */
  vestingAmount?: number;

  /** 解锁释放出的收益 */
  vestingUnlockAmount?: number;

  /** 产品列表 */
  products?: FilecoinSettlementPlatformProductLine[];

  /** 云界向平台收的服务费点数, 1代表千分之一 */
  serviceFeePercent?: number;

  /** 结算日期 */
  settleDay?: Date;
}

export interface FilecoinSettlementPlatformProductLine {
  /** 产品Id */
  productId?: string;

  /** 产品名称 */
  productName?: string;

  /** 存储空间大小, 1代表1TiB存储 */
  storage?: number;

  /** 每个产品结算收益, 平台实际所得的收益 */
  settledAmount?: number;

  /** 锁仓收益 */
  vestingAmount?: number;

  /** 解锁释放出的收益 */
  vestingUnlockAmount?: number;
}

export interface FilecoinSettlementReferrer {
  /** 结算单号 */
  settlementNo?: string;

  /** 存储空间大小, 1代表1TiB存储 */
  storage?: number;

  /** 结算收益, 用户实际所得的收益 */
  settledAmount?: number;

  /** 锁仓收益 */
  vestingAmount?: number;

  /** 解锁释放出的收益 */
  vestingUnlockAmount?: number;

  /** 每个推荐人的结算明细列表 */
  referrers?: FilecoinSettlementReferrerLine[];

  /** 结算日期 */
  settleDay?: Date;
}

export interface FilecoinSettlementReferrerLine {
  /** 结算单号 */
  settlementNo?: string;

  /** 推荐人Id */
  referrerId?: number;

  /** 推荐人名称 */
  referrerName?: string;

  /** 推荐人手机 */
  referrerMobile?: string;

  /** 存储空间大小, 1代表1TiB存储 */
  storage?: number;

  /** 结算收益, 用户实际所得的收益 */
  settledAmount?: number;

  /** 锁仓收益 */
  vestingAmount?: number;

  /** 解锁释放出的收益 */
  vestingUnlockAmount?: number;

  /** 产品列表 */
  customers?: FilecoinSettlementReferrerCustomerLine[];

  /** 结算日期 */
  settleDay?: Date;
}

export interface FilecoinSettlementReferrerCustomerLine {
  /** 顾客Id */
  customerId?: number;

  /** 顾客名称 */
  customerName?: string;

  /** 顾客手机号 */
  customerMobile?: string;

  /** 存储空间大小, 1代表1TiB存储 */
  storage?: number;

  /** 结算收益, 用户实际所得的收益 */
  settledAmount?: number;

  /** 锁仓收益 */
  vestingAmount?: number;

  /** 解锁释放出的收益 */
  vestingUnlockAmount?: number;
}

export enum UserRole {
  'CenterAdmin' = 'CenterAdmin',
  'PlatformAdmin' = 'PlatformAdmin',
  'MerchantAdmin' = 'MerchantAdmin',
}
export enum EnumAppReleasePlatform {
  'android' = 'android',
  'ios' = 'ios',
}
export enum EnumAppReleaseState {
  'created' = 'created',
  'confirmed' = 'confirmed',
  'revoked' = 'revoked',
}
export enum EnumPhotoMimeType {
  'image/gif' = 'image/gif',
  'image/jpeg' = 'image/jpeg',
  'image/png' = 'image/png',
  'image/svg+xml' = 'image/svg+xml',
}
export enum EnumNoticeState {
  'created' = 'created',
  'published' = 'published',
  'revoked' = 'revoked',
}
export enum EnumProductSaleMethod {
  'byStorage' = 'byStorage',
}
export enum EnumProductState {
  'created' = 'created',
  'opening' = 'opening',
  'soldOut' = 'soldOut',
  'internalOnSale' = 'internalOnSale',
  'outOfStock' = 'outOfStock',
  'comingSoon' = 'comingSoon',
  'finished' = 'finished',
  'canceled' = 'canceled',
}
export enum EnumOrderSaleMethod {
  'byStorage' = 'byStorage',
}
export enum EnumOrderState {
  'pending' = 'pending',
  'waitingForPledge' = 'waitingForPledge',
  'waitingForSeal' = 'waitingForSeal',
  'sealing' = 'sealing',
  'mining' = 'mining',
  'canceled' = 'canceled',
  'waitingCancelConfirmed' = 'waitingCancelConfirmed',
  'finished' = 'finished',
}
export enum EnumOrderCryptoPaymentCurrency {
  'USDT' = 'USDT',
  'BTC' = 'BTC',
}
export enum EnumFilecoinSealCostPaymentType {
  'pledge' = 'pledge',
  'gas' = 'gas',
}
export enum EnumFilecoinWithdrawLineState {
  'pending' = 'pending',
  'processing' = 'processing',
  'completed' = 'completed',
  'refused' = 'refused',
}
export enum EnumFilecoinStorageState {
  'created' = 'created',
  'working' = 'working',
  'stopped' = 'stopped',
  'deactivated' = 'deactivated',
}
export enum EnumFilecoinSettlementLineState {
  'created' = 'created',
  'confirmed' = 'confirmed',
  'discarded' = 'discarded',
}
