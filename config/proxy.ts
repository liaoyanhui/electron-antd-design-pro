/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-05 15:22:24
 * @LastEditTime: 2022-05-30 10:42:26
 * @FilePath: /mining-admin-desktop/config/proxy.ts
 */
/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/v1': {
      // target: 'http://192.168.50.110/fil/admin/v1',
      target: 'http://192.168.6.196:8080/fil/admin/v1',
      // target: 'http://192.168.50.66:80/fil/admin/v1',
      // target: 'https://api.cloudworldhk.com/fil/admin/v1',
      // target: 'http://192.168.50.224:8080/fil/admin/v1',
      // target: 'https://api.yunjieipfs.com/fil/admin/v1',
      changeOrigin: true,
      pathRewrite: { '^/v1': '' },
    },
    // '/filscan': {
    //   target: 'https://api.filscan.io:8700/rpc/v1',
    //   changeOrigin: true,
    //   pathRewrite: { '^/filscan': '' },
    // },
  },
  // test: {
  //   '/api/': {
  //     target: 'https://preview.pro.ant.design',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  // },
  // pro: {
  //   '/api/': {
  //     target: 'your pre url',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  // },
};
