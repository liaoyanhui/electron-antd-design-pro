/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-05 15:22:24
 * @LastEditTime: 2022-04-13 18:04:21
 * @FilePath: /mining-admin-desktop/config/defaultSettings.ts
 */
import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const { REACT_APP_ENV } = process.env;

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#327DF4',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '',
  pwa: false,
  logo: REACT_APP_ENV == 'pro' ? './logo.svg' : '/logo.svg',
  iconfontUrl: '',
  // headerHeight: '12px'
};

export default Settings;
