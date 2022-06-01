/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-23 17:40:54
 * @LastEditTime: 2021-08-13 09:52:55
 * @FilePath: /mining-admin-desktop/config/config.dev.ts
 */
/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-05 15:22:24
 * @LastEditTime: 2021-08-13 09:48:46
 * @FilePath: /mining-admin-desktop/config/config.dev.ts
 */
// https://umijs.org/config/
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
  // mfsu: {},
  // webpack5: {
  //   // lazyCompilation: {},
  // },
});
