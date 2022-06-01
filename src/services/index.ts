/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/*
 * @Description: umi_request
 * @Author: 尚夏
 * @Date: 2021-07-29 10:19:53
 * @LastEditTime: 2022-05-27 10:38:23
 * @FilePath: /mining-admin-desktop/src/services/index.ts
 */

import { stringify } from 'qs';
import { request } from '@/utils/request';
import { request_third } from '@/utils/request_third';
import { getStore } from '@/utils/utils';
// import { request } from 'umi';

// 获取当前平台id
const getPlatformId = () => {
  const platformId = getStore('platformId');
  if (!platformId) {
    const userInfo = JSON.parse(getStore('userInfo') || '{}');
    const user: any = userInfo;
    return user.platformIds[0];
  }
  return platformId;
};

const formDataInit = (params: any) => {
  const formData = new FormData();
  for (const i in params) {
    formData.append(i, params[i]);
  }
  return formData;
};

/** 登录 */
export const AuthService = {
  // 发送验证码
  sendVerificationCodeBySms: async (options: { data: Record<string, unknown> }) => {
    return request(`/v1/security/verification/sms/send`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 登录
  signinByMobile: async (options: Record<string, unknown>) => {
    return request(`/v1/auth/signin/mobile`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 登出
  signout: async () => {
    return request(`/v1/auth/signout`, {
      method: 'POST',
    });
  },
};

/** 用户 */
export const CustomerService = {
  // 用户列表
  getCustomerList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/customers/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 超级账号下获取用户列表
  getOwnCustomerList: async (platformId?: string) => {
    return request(`/v1/platforms/${platformId}/customers/list`, {
      method: 'GET',
    });
  },
  // 通过id查询用户
  getCustomerById: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/customers/${params.id}`, {
      method: 'GET',
    });
  },
  // 创建用户
  createCustomer: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/customers/create`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 编辑用户
  editCustomer: async (params: Record<string, unknown>, options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/customers/${params.id}/edit`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 绑定推荐人
  rebindCustomerReferrer: async (id: any, params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/customers/${id}/referrer/rebind`, {
      method: 'POST',
      params: { ...params },
    });
  },
  // 停用用户
  stopCustomerOrders: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/customer/${params.id}/stop`, {
      method: 'GET',
    });
  },
  // 协商用户结算金额 /platforms/{platformId:\d+}/filecoin/customer/{Id:\d+}/clearing/fee
  customerClearingFee: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/customer/${params.id}/clearing/fee`, {
      method: 'POST',
      ...(options || {}),
    });
  },
};

/** 超级平台 */
export const OwnerService = {
  // 平台列表
  getPlatformList: async () => {
    return request(`/v1/owner/platforms/list`, {
      method: 'GET',
    });
  },
  // 创建平台
  createPlatform: async (options: Record<string, unknown>) => {
    return request(`/v1/owner/platforms/create`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // app迭代记录
  fetchAppReleaseList: async () => {
    return request(`/v1/owner/app/releases/list`, {
      method: 'GET',
    });
  },
  // 创建App版本
  createAppRelease: async (options: Record<string, unknown>) => {
    return request(`/v1/owner/app/releases/create`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 编辑app
  editAppRelease: async (Id: string, options: Record<string, unknown>) => {
    return request(`/v1/owner/app/releases/${Id}/edit`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 上传APK
  uploadAndroidReleaseApk: async (Id: string, params: Record<string, unknown>) => {
    return request(`/v1/owner/app/releases/${Id}/android/upload`, {
      method: 'POST',
      data: formDataInit(params),
    });
  },
  // app发布
  publishAppRelease: async (Id: string) => {
    return request(`/v1/owner/app/releases/${Id}/publish`, {
      method: 'POST',
    });
  },
  // 设置平台参数
  settingPlatform: async (params: Record<string, unknown>, options: Record<string, unknown>) => {
    return request(`/v1/owner/platforms/${params.id}/setting/edit`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 迁移账号
  rebindCustomerToPlatform: async (Id: string, params: Record<string, unknown>) => {
    return request(`/v1/owner/platforms/${Id}/customer/rebind`, {
      method: 'POST',
      params: { ...params },
    });
  },

  // owner 提现列表
  getFilecoinWithdrawList: async (params: Record<string, unknown>) => {
    return request(`/v1/owner/filecoin/withdraw/apply/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // owner 提现列表 状态是已支付
  getFilecoinWithdrawCompleteList: async (params: Record<string, unknown>) => {
    return request(`/v1/owner/filecoin/withdraw/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // owner 审核通过
  processFilecoinWithdraw: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(`/v1/owner/filecoin/withdraw/${params.withdrawNo}/process`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // owner 审核不通过
  refuseFilecoinWithdraw: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(`/v1/owner/filecoin/withdraw/${params.withdrawNo}/refuse`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // owner 打币
  completeFilecoinWithdraw: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(`/v1/owner/filecoin/withdraw/${params.withdrawNo}/complete`, {
      method: 'POST',
      ...(options || {}),
    });
  },

  // 平台主页 统计
  getOwnerPlatformFileCoinStatitics: async () => {
    return request(`/v1/owner/platforms/filecoin/statitics`, {
      method: 'GET',
    });
  },

  // owner下 各个平台收益
  getOwnerPlatformFileCoinProfitesList: async (options: Record<string, unknown>) => {
    return request(`/v1/owner/filecoin/profites/list`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 获取平台下提现成功的列表
  getOwnerPlatformCustomerFileCoinWithdrawCompleteList: async (params: Record<string, unknown>) => {
    return request(`/v1/owner/filecoin/customer/withdraw/list`, {
      method: 'GET',
      params: { ...params },
    });
  },

  // 获取节点用户
  getOwnerCustomerNode: async (params: Record<string, unknown>) => {
    return request(`/v1/owner/customer/independent/node/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 获取owner下所有用户
  getOwnerCustomerList: async (params: Record<string, unknown>) => {
    return request(`/v1/owner/platforms/customers/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 添加节点用户
  addOwnerCustomerNode: async (options: Record<string, unknown>) => {
    return request(`/v1/owner/customer/independent/node/add`, {
      method: 'POST',
      ...(options || {}),
    });
  },

  // 编辑节点用户
  editOwnerCustomerNode: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(`/v1/owner/customer/independent/node/${params.id}/edit`, {
      method: 'POST',
      ...(options || {}),
    });
  },

  // 停用节点用户
  finishOwnerCustomerNode: async (params: Record<string, unknown>) => {
    return request(`/v1/owner/customer/independent/node/${params.id}/finish`, {
      method: 'GET',
    });
  },

  // 提现记录
  customerNodeWithdrawList: async (params: Record<string, unknown>) => {
    return request(`/v1/owner/customer/independent/node/withdraw/list`, {
      method: 'GET',
      params: { ...params },
    });
  },

  // 节点提现 审核通过
  customerNodeWithdrawProcess: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(`/v1/owner/customer/independent/node/withdraw/${params.withdrawNo}/process`, {
      method: 'POST',
      ...(options || {}),
    });
  },

  // 节点提现 审核拒绝
  customerNodeWithdrawRefuse: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(`/v1/owner/customer/independent/node/withdraw/${params.withdrawNo}/refuse`, {
      method: 'POST',
      ...(options || {}),
    });
  },

  // 节点提现 审核通过 已打币
  customerNodeWithdrawComplete: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(`/v1/owner/customer/independent/node/withdraw/${params.withdrawNo}/complete`, {
      method: 'POST',
      ...(options || {}),
    });
  },

  // 扣补
  getCustomerExpensesList: async (params: Record<string, unknown>) => {
    return request(`/v1/owner/customer/expenses/list`, {
      method: 'GET',
      params: { ...params },
    });
  },

  // 添加费用记录
  addCustomerExpenses: async (options: Record<string, unknown>) => {
    return request(`/v1/owner/customer/expenses/add`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 获取用户余额
  // /owner/customer/avaiable
  getCustomerAvaiable: async (params: Record<string, unknown>) => {
    return request(`/v1/owner/customer/avaiable/${params.customerId}`, {
      method: 'GET',
    });
  },

  // 各个平台最新的结算单数据
  getNewestSettlementList: async () => {
    return request(`/v1/owner/settlement/newest/list`, {
      method: 'GET',
    });
  },
};

/** 平台 */
export const PlatformService = {
  // 平台首页数据
  getPlatformFileCoinStatitics: async () => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/statitics`, {
      method: 'GET',
    });
  },
  // 单个平台信息
  getPlatformById: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${params.id}`, {
      method: 'GET',
    });
  },
  // 编辑平台
  editProfile: async (params: Record<string, unknown>, options: Record<string, unknown>) => {
    return request(`/v1/platforms/${params.id}/edit`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 绑定平台提现地址
  bindWithdrawAddress: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/security/withdraw/fil/address/bind`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 提现
  widthdrawApply: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/withdraw/platform/apply`, {
      method: 'POST',
      ...(options || {}),
    });
  },
};

/** 订单 */
export const OrderService = {
  // 获取订单列表
  getOrderList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/orders/list?${stringify(params)}`, {
      method: 'GET',
    });
  },
  // 获取单个订单
  getOrderById: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/orders/${params.id}`, {
      method: 'GET',
    });
  },
  // 取消订单
  cancelOrder: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/orders/${params.id}/cancel`, {
      method: 'POST',
    });
  },
  // 确认已支付
  completeOrderPayment: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/orders/${params.id}/sale/payment/complete`, {
      method: 'POST',
    });
  },
  // 确认支付所需的订单封装成本
  createFilecoinSealCostPayment: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/payment/order/filecoin/seal/cost/create`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 确认已支付质押币(包括gas费消耗)
  editOrderSealCostRequired: async (orderId: number, params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/orders/${orderId}/seal/cost/edit`, {
      method: 'POST',
      params: { ...params },
    });
  },
  // 开始封装
  startOrderSealing: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/orders/${params.id}/sealing/start`, {
      method: 'POST',
    });
  },
  // 确认已支付质押币(包含gas费)
  completeOrderSealCostPayment: async (params: Record<string, unknown>) => {
    return request(
      `/v1/platforms/${getPlatformId()}/orders/${params.id}/seal/cost/payment/complete`,
      {
        method: 'POST',
      },
    );
  },
  // 封装成本
  getSealCostForOrder: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/payment/order/filecoin/seal/cost`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 封装结束 全部算力已交付运行
  startOrderMining: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/orders/${params.id}/mining/start`, {
      method: 'POST',
    });
  },
  // 停止订单
  stopOrder: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/order/stop`, {
      method: 'POST',
      ...(options || {}),
    });
  },
};
/** 货币 */
export const PaymentService = {
  // 订单法币支付明细
  getOrderFiatPaymentList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/payment/order/fiat/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // filcoin封装支付明细
  getFilecoinSealCostPaymentList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/payment/order/filecoin/seal/cost/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 获取数字货币支付明细
  getOrderCyrptoPaymentList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/payment/order/crypto/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // // 充值列表
  // getFilecoinSealCostPaymentList: async (params: Record<string, unknown>) => {
  //   return request(`/v1/platforms/${getPlatformId()}/payment/order/filecoin/seal/cost/list`, {
  //     method: 'GET',
  //     params: { ...params },
  //   });
  // },
  // 创建法币支付明细
  createOrderFiatPayment: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/payment/order/fiat/create`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  createOrderCryptoPayment: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/payment/order/crypto/create`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 修改质押 或者 gas消耗数量
  editSealCostPayment: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/seal/cost/edit`, {
      method: 'POST',
      ...(options || {}),
    });
  },
};
/** 公告 */
export const NoticeService = {
  // 获取公告列表
  getNoticeList: async () => {
    return request(`/v1/platforms/${getPlatformId()}/notices/list`, {
      method: 'GET',
    });
  },
  // 创建公告
  createNotice: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/notices/create`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 修改公告
  editNotice: async (params: Record<string, unknown>, options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/notices/${params.id}/edit`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 发布公告
  publishNotice: async (params: Record<string, unknown>) => {
    // /platforms/{platformId}/notices/{Id}/publish
    return request(`/v1/platforms/${getPlatformId()}/notices/${params.id}/publish`, {
      method: 'POST',
    });
  },
  // 撤回公告
  revokeNotice: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/notices/${params.id}/revoke`, {
      method: 'POST',
    });
  },
};

/** 快讯 */
export const FlashService = {
  // 获取快讯列表
  getFlashList: async () => {
    return request(`/v1/platforms/${getPlatformId()}/flash/list`, {
      method: 'GET',
    });
  },
  // 创建快讯
  createFlash: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/flash/create`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 修改快讯
  editFlash: async (params: Record<string, unknown>, options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/flash/${params.id}/edit`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 发布快讯
  publishFlash: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/flash/${params.id}/publish`, {
      method: 'POST',
    });
  },
  // 撤回快讯
  revokeFlash: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/flash/${params.id}/revoke`, {
      method: 'POST',
    });
  },
};

/** 协议 */
export const AgreementService = {
  // 获取协议列表
  getAgreementList: async () => {
    return request(`/v1/platforms/${getPlatformId()}/agreements/list`, {
      method: 'GET',
    });
  },
  // 根据协议Id 获取协议
  getAgreementById: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/agreements/${params.id}`, {
      method: 'GET',
    });
  },
  // 编辑协议
  editAgreement: async (params: Record<string, unknown>, options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/agreements/${params.id}/edit`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 创建协议
  createAgreement: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/agreements/create`, {
      method: 'POST',
      ...(options || {}),
    });
  },
};
/** 平台提现记录 */
export const WithdrawRecord = {
  // 提现记录列表
  getFilecoinWithdrawList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/withdraw/platform/apply/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 提现成功记录列表
  getFilecoinWithdrawCompleteList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/withdraw/platform/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
};

/** 支付 */
export const FilecoinService = {
  // 提现列表
  getFilecoinWithdrawList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/withdraw/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 审核通过
  processFilecoinWithdraw: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/withdraw/${params.id}/process`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 审核不通过
  refuseFilecoinWithdraw: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/withdraw/${params.id}/refuse`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 打币
  completeFilecoinWithdraw: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/withdraw/${params.id}/complete`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 返回单个存储
  getFilecoinStorageById: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/storage`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 返回存储列表
  getFilecoinStorageList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/storage/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 返回Filecoin结算单 用户
  getFilecoinSettlementList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/settlement/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 返回Filecoin结算单 平台
  getFilecoinPlatformSettlementList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/settlement/platform/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 返回Filecoin结算单 商务
  getFilecoinReferrerSettlementList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/settlement/refferrer/list`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 新增封装存储
  addFilecoinSealedStorage: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/storage/sealed/add`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 返回Filecoin 结算单订单明细 用户
  getFilecoinSettlement: async (settlementNo: any, params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/settlement/${settlementNo}`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 返回Filecoin 结算单订单明细 商务
  getFilecoinReferrerSettlement: async (settlementNo: any, params: Record<string, unknown>) => {
    return request(
      `/v1/platforms/${getPlatformId()}/filecoin/settlement/${settlementNo}/refferrer`,
      {
        method: 'GET',
        params: { ...params },
      },
    );
  },
  // 返回Filecoin 结算单订单明细 平台
  getFilecoinPlatformSettlement: async (settlementNo: any, params: Record<string, unknown>) => {
    return request(
      `/v1/platforms/${getPlatformId()}/filecoin/settlement/${settlementNo}/platform`,
      {
        method: 'GET',
        params: { ...params },
      },
    );
  },
  // // 手动创建结算单
  // createFilecoinSettlement: async (options: Record<string, unknown>) => {
  //   return request(`/v1/platforms/${getPlatformId()}/filecoin/settlement/create`, {
  //     method: 'POST',
  //     ...(options || {}),
  //   });
  // },
  // 手动创建结算单inday
  createFilecoinSettlementInDay: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/filecoin/settlement/day/create`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 获取Filecoin全网24小时平均单T收益
  getFilecoinMiningEfficiency: async (params: Record<string, unknown>) => {
    return request(`/v1/filecoin/network/mining/efficiency`, {
      method: 'GET',
      params: { ...params },
    });
  },
  // 确认并发放
  confirmFilecoinSettlement: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(
      `/v1/platforms/${getPlatformId()}/filecoin/settlement/${params.settlementNo}/confirm`,
      {
        method: 'POST',
        ...(options || {}),
      },
    );
  },
  // 撤销待结算单
  discardedFilecoinSettlement: async (params: Record<string, unknown>) => {
    return request(
      `/v1/platforms/${getPlatformId()}/filecoin/settlement/${params.settlementNo}/discarded`,
      {
        method: 'GET',
      },
    );
  },
};

/** 商品 */
export const ProductService = {
  // 商品列表
  getProducts: async () => {
    return request(`/v1/platforms/${getPlatformId()}/products/list`, {
      method: 'GET',
    });
  },
  // 修改商品状态
  changeProductState: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/products/${params.id}/state/change`, {
      method: 'POST',
      params: { state: params.state },
    });
  },
  // 创建商品
  createProduct: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/products/create`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 获取商品
  getProductById: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/products/${params.id}`, {
      method: 'GET',
    });
  },
  // 编辑商品
  editProduct: async (params: Record<string, unknown>, options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/products/${params.id}/edit`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 创建订单
  purchaseProduct: async (params: Record<string, unknown>, options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/products/${params.id}/purchase`, {
      method: 'POST',
      ...(options || {}),
    });
  },
};

/** 相册 */
export const AlbumService = {
  // 创建相册
  createAlbum: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/albums/create`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 上传图片
  uploadPhoto: async (options: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/photos/upload`, {
      method: 'POST',
      ...(options || {}),
    });
  },
  // 删除图片
  deletePhoto: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/photos/${params.id}/delete`, {
      method: 'POST',
    });
  },
};

/** 推荐人 */
export const ReferrerService = {
  // 返回推荐人下的顾客列表
  getReferrerCustomerList: async (params: Record<string, unknown>) => {
    return request(`/v1/platforms/${getPlatformId()}/referrer/${params.id}/customer/list`, {
      method: 'GET',
    });
  },
  // 返回推荐人列表
  getReferrerList: async () => {
    return request(`/v1/platforms/${getPlatformId()}/referrer/list`, {
      method: 'GET',
    });
  },
  // 设置推荐人佣金比例
  setReferrerCommission: async (
    params: Record<string, unknown>,
    options: Record<string, unknown>,
  ) => {
    return request(
      `/v1/platforms/${getPlatformId()}/referrer/${params.id}/commission?${stringify(
        options.data,
      )}`,
      {
        method: 'POST',
      },
    );
  },
};

/** filscan 节点数据 */
export const Node = {
  NodeDetail: async (params: Record<string, unknown>, options: Record<string, unknown>) => {
    return request_third('https://api.filscan.io:8700/rpc/v1', {
      method: 'POST',
      params: { ...params },
      ...(options || {}),
    });
  },
};
