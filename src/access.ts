/*
 * @Description: 鉴权
 * @Author: 尚夏
 * @Date: 2021-07-05 15:22:24
 * @LastEditTime: 2021-11-05 10:49:44
 * @FilePath: /mining-admin-desktop/src/access.ts
 */
/**
 * 鉴权
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

/**
 * @description: 监听 initialState 变化触发更新鉴权 重新加载路由菜单
 * platformId 切换分平台 对应的平台Id 会设入本地缓存
 * @param {object} initialState
 * @return {*}
 */
export default function access(initialState: { currentUser?: any; platformId?: any }): any {
  const { currentUser, platformId } = initialState || {};
  return {
    /**
     * @description: 平台页面是否展示方法 即鉴权
     * @param {*}
     * @return {*}
     */
    canOwnHomePage: (): boolean => {
      // 如果角色是CenterAdmin 主平台管理员 则进入后续判断
      if (currentUser && currentUser.userRole === 'CenterAdmin') {
        // 如果存在platformId 即表示已点击切换平台 则不展示
        if (platformId) {
          return false;
        }
        // 否则 展示
        return true;
      }
      // 不是CenterAdmin 主平台管理员 不展示
      return false;
    },
    /**
     * @description: 平台页面是否展示判断方法 即鉴权
     * @param {*}
     * @return {*}
     */
    platformPage: (): boolean => {
      // 存在登录信息 说明已登录 进入判断
      if (currentUser) {
        // 如果角色是PlatformAdmin 平台管理员 则展示
        if (currentUser && currentUser.userRole === 'PlatformAdmin') {
          return true;
        }
        // 如果角色是CenterAdmin 主平台管理员 则进入后续判断
        if (currentUser && currentUser.userRole === 'CenterAdmin') {
          // 如果存在platformId 即已点击切换平台 则展示
          if (platformId) {
            return true;
          }
          // 否则 不展示
          return false;
        }
        // 其他角色不展示
        return false;
      }
      //  未登录 不展示
      return false;
    },
    isCenterAdmin: (): boolean => {
      if (currentUser && currentUser.userRole === 'CenterAdmin') {
        return true;
      }
      return false;
    },
  };
}
