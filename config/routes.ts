export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  // {
  //   path: '/ownHomePage',
  //   name: '主页',
  //   locales: false,
  //   icon: 'smile',
  //   component: './OwnHomePage',
  //   access: 'canOwnHomePage',
  // },
  {
    path: '/homePage',
    name: '主页',
    locales: false,
    icon: 'smile',
    component: './HomePage',
  },
  {
    path: '/homePage/createPlatform',
    name: '创建平台',
    hideInMenu: true,
    // locales: false,
    icon: 'smile',
    component: './HomePage/CreatePlatform',
  },
  {
    path: '/homePage/editPlatform',
    name: '编辑平台',
    hideInMenu: true,
    icon: 'smile',
    component: './HomePage/EditPlatform',
  },
  {
    path: '/order',
    name: '订单',
    icon: 'smile',
    component: './Order',
    access: 'platformPage',
  },
  {
    path: '/commodity',
    name: '商品',
    icon: 'smile',
    component: './AgencyCommodity',
    access: 'platformPage',
  },
  {
    path: '/commodity/addCommodity',
    name: '新增商品',
    hideInMenu: true,
    icon: 'smile',
    component: './AgencyCommodity/AddCommodity',
    access: 'platformPage',
  },
  {
    path: '/commodity/checkEditCommodity',
    name: '商品详情',
    hideInMenu: true,
    icon: 'smile',
    component: './AgencyCommodity/CheckEditCommodity',
    access: 'platformPage',
  },
  {
    path: '/order/createOrder',
    hideInMenu: true,
    name: '创建订单',
    icon: 'smile',
    component: './Order/CreateOrder',
    access: 'platformPage',
  },
  {
    path: '/order/checkOrder',
    hideInMenu: true,
    name: '订单详情',
    icon: 'smile',
    component: './Order/CheckOrder',
    access: 'platformPage',
  },
  {
    path: '/settlement',
    name: '结算',
    icon: 'smile',
    access: 'platformPage',
    routes: [
      {
        path: '/settlement',
        redirect: '/settlement/staySettlement',
      },
      {
        path: '/settlement/staySettlement',
        name: '待结算',
        icon: 'smile',
        component: './StaySettlement',
      },
      {
        path: '/settlement/staySettlement/userCheck',
        hideInMenu: true,
        name: '用户收益明细',
        icon: 'smile',
        component: './SettlementDetail/UserCheck',
      },
      {
        path: '/settlement/staySettlement/agencyCheck',
        hideInMenu: true,
        name: '商务收益明细',
        icon: 'smile',
        component: './SettlementDetail/AgencyCheck',
      },
      {
        path: '/settlement/staySettlement/platformCheck',
        hideInMenu: true,
        name: '平台收益明细',
        icon: 'smile',
        component: './SettlementDetail/PlatformCheck',
      },
      {
        path: '/settlement/settled',
        name: '结算单',
        icon: 'smile',
        component: './Settlement',
      },
      {
        path: '/settlement/settled/userStatementCheck',
        hideInMenu: true,
        name: '用户收益明细',
        icon: 'smile',
        component: './SettlementDetail/UserCheck',
      },
      {
        path: '/settlement/settled/agencyStatementCheck',
        hideInMenu: true,
        name: '商务收益明细',
        icon: 'smile',
        component: './SettlementDetail/AgencyCheck',
      },
      {
        path: '/settlement/settled/platformStatementCheck',
        hideInMenu: true,
        name: '平台收益明细',
        icon: 'smile',
        component: './SettlementDetail/PlatformCheck',
      },
      // {
      //   path: '/settlement/deductSubsidy',
      //   name: '扣补',
      //   hideInMenu: true,
      //   icon: 'smile',
      //   component: './Settlement/tabComponent/Statements/DeductSubsidy',
      //   access: 'platformPage',
      // },
    ],
  },
  {
    path: '/pay',
    name: '支付',
    icon: 'smile',
    component: './Pay',
    access: 'platformPage',
  },
  // owner 平台 支付审核
  {
    path: '/ownerPay',
    name: '支付',
    icon: 'smile',
    component: './OwnerPay',
    access: 'canOwnHomePage',
  },
  {
    path: '/userData',
    name: '用户',
    icon: 'smile',
    component: './UserData',
    access: 'platformPage',
  },
  {
    path: '/userData/userDetail',
    name: '用户详情',
    hideInMenu: true,
    icon: 'smile',
    component: './UserData/UserDetail',
    access: 'platformPage',
  },
  {
    path: '/userData/userDetail/userBasic',
    name: '基本信息',
    hideInMenu: true,
    icon: 'smile',
    component: './UserData/UserBasic',
    access: 'platformPage',
    routes: [
      {
        path: '/userData/userDetail/userBasic',
        redirect: '/userData/userDetail/userBasic/basicSet',
      },
      {
        path: '/userData/userDetail/userBasic/basicSet',
        name: '基本设置',
        hideInMenu: true,
        // icon: 'smile',
        component: './UserData/UserBasic/BasicSet',
      },
      {
        path: '/userData/userDetail/userBasic/safetySet',
        name: '安全设置',
        hideInMenu: true,
        // icon: 'smile',
        component: './UserData/UserBasic/SafetySet',
      },
    ],
  },
  {
    path: '/inviteCommission',
    name: '商务',
    icon: 'smile',
    component: './InviteCommission',
    access: 'platformPage',
  },
  {
    path: '/hashRate',
    name: '存储',
    icon: 'smile',
    access: 'platformPage',
    component: './HashRate',
  },
  {
    path: '/operation',
    name: '运营',
    icon: 'smile',
    routes: [
      { path: '/operation', redirect: '/operation/notice' },
      {
        path: '/operation/notice',
        name: '公告',
        icon: 'smile',
        component: './Notice',
        access: 'platformPage',
      },
      // {
      //   path: '/operation/banner',
      //   name: 'Banner',
      //   icon: 'smile',
      //   component: './Banner',
      // },
      // {
      //   path: '/operation/airDrop',
      //   name: '空投',
      //   icon: 'smile',
      //   component: './AirDrop',
      // },
      {
        path: '/operation/notice/addNotice',
        hideInMenu: true,
        name: '新建公告',
        icon: 'smile',
        component: './Notice/AddNotice',
        access: 'platformPage',
      },
      {
        path: '/operation/notice/editNotice',
        hideInMenu: true,
        name: '编辑公告',
        icon: 'smile',
        component: './Notice/EditNotice',
        access: 'platformPage',
      },
      {
        path: '/operation/flash',
        name: '快讯',
        icon: 'smile',
        component: './Flash',
        access: 'platformPage',
      },
      {
        path: '/operation/flash/addFlash',
        hideInMenu: true,
        name: '新建快讯',
        icon: 'smile',
        component: './Flash/AddFlash',
        access: 'platformPage',
      },
      {
        path: '/operation/flash/editFlash',
        hideInMenu: true,
        name: '编辑快讯',
        icon: 'smile',
        component: './Flash/EditFlash',
        access: 'platformPage',
      },
      // {
      //   path: '/operation/banner/addBanner',
      //   hideInMenu: true,
      //   name: '添加Banner',
      //   icon: 'smile',
      //   component: './Banner/AddBanner',
      // },
      // {
      //   path: '/operation/banner/editBanner',
      //   hideInMenu: true,
      //   name: '编辑Banner',
      //   icon: 'smile',
      //   component: './Banner/EditBanner',
      // },
      {
        path: '/operation/bindRelation',
        name: '绑定关系',
        icon: 'smile',
        component: './BindRelation',
        access: 'canOwnHomePage',
      },
      {
        path: '/operation/profitesStatistics',
        name: '收益统计',
        icon: 'smile',
        component: './ProfitesStatistics',
        access: 'canOwnHomePage',
      },
      {
        path: '/operation/customerWithdrawCompleteList',
        name: '平台用户提现',
        icon: 'smile',
        component: './CustomerWithdrawCompleteList',
        access: 'canOwnHomePage',
      },
      {
        path: '/operation/customerExpensesList',
        name: '补扣',
        icon: 'smile',
        component: './ExpensesTransform',
        access: 'canOwnHomePage',
      },
      {
        path: '/operation/newestSettlementList',
        name: '平台最新结算单',
        icon: 'smile',
        component: './NewestSettlementList',
        access: 'canOwnHomePage',
      },
    ],
  },
  {
    path: '/platform',
    name: '平台',
    icon: 'smile',
    // component: './PlatformSet',
    access: 'platformPage',
    routes: [
      { path: '/platform', redirect: '/platform/agreement' },
      {
        path: '/platform/platformSet',
        name: '平台设置',
        icon: 'smile',
        component: './PlatformSet',
      },
      // {
      //   path: '/platform/service',
      //   name: '客服',
      //   icon: 'smile',
      //   component: './Service',
      // },
      // {
      //   path: '/platform/capital',
      //   name: '统计',
      //   icon: 'smile',
      //   component: './Capital',
      // },
      {
        path: '/platform/agreement',
        name: '协议条款',
        icon: 'smile',
        component: './Agreement',
      },
      {
        path: '/platform/agreement/editAgreement',
        name: '编辑',
        hideInMenu: true,
        icon: 'smile',
        component: './Agreement/EditAgreement',
      },
      {
        path: '/platform/agreement/createAgreement',
        name: '创建',
        hideInMenu: true,
        icon: 'smile',
        component: './Agreement/CreateAgreement',
      },
      {
        path: '/platform/widthdrawRecord',
        name: '提现记录',
        icon: 'smile',
        component: './WidthdrawRecord',
      },
      {
        path: '/platform/withdrawAddress',
        name: '提现地址',
        icon: 'smile',
        component: './WithdrawAddress',
      },
      // {
      //   path: '/platform/administrator',
      //   name: '管理员',
      //   icon: 'smile',
      //   component: './Administrator',
      // },
    ],
  },
  {
    path: '/appUpload',
    name: '平台及APP迭代',
    icon: 'smile',
    component: './AppUpload',
    access: 'canOwnHomePage',
  },
  {
    path: '/independentNode',
    name: '独立节点',
    icon: 'smile',
    access: 'canOwnHomePage',
    routes: [
      {
        path: '/independentNode',
        redirect: '/independentNode/nodeUser',
      },
      {
        path: '/independentNode/nodeUser',
        name: '节点用户',
        icon: 'smile',
        component: './NodeUser',
      },
      {
        path: '/independentNode/withdraw',
        name: '平台提现',
        icon: 'smile',
        component: './IndependentNodeWithdraw',
      },
    ],
  },
  // {
  //   path: '/log',
  //   name: '日志',
  //   icon: 'smile',
  //   component: './Log',
  // },
  {
    path: '/',
    redirect: '/homePage',
  },
  {
    component: './404',
  },
];
