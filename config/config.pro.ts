/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-08-09 13:51:33
 * @LastEditTime: 2022-01-21 10:19:44
 * @FilePath: /mining-admin-desktop/config/config.pro.ts
 */
import { defineConfig } from 'umi';

export default defineConfig({
  // mock: false,
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {
      // target: ['web', 'electron-renderer'],
    },
  },
  define: {
    // APP_TYPE: APP_TYPE || '',
    // 'process.env.app_type': 'pro',
    // 'process.env.apiUrl': 'https://api.yunjieipfs.com/fil/admin',
    // API_URL: 'https://api.yunjieipfs.com/fil/admin',
    API_URL: 'https://api.cloudworldhk.com/fil/admin',
    // API_URL: 'http://192.168.50.224:8080/fil/admin',
  },
  // mfsu: {},
  // webpack5: {
  //   // lazyCompilation: {},
  // },
});
