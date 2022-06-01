<!--
 * @Description: readme.md
 * @Author: 尚夏
 * @Date: 2021-07-05 15:22:24
 * @LastEditTime: 2021-10-18 17:09:40
 * @FilePath: /mining-admin-desktop/README.md
-->

# 云界网络后台管理系统

## 项目地址

git clone git@github.com:bitchina-io/mining-admin-desktop.git

## 项目主要使用的技术

- **react.js**
- **antd design pro** 基于 umi react 的后台管理系统框架
- **electron** 一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架

## 本地运行项目

```bash
npm install
npm run dev # 启动项目 antd-design-pro 项目
npm run electron-start # 打开新的终端在项目内 启动 electron
# or
yarn
yarn dev # 启动项目 antd-design-pro 项目
yarn electron-start # 打开新的终端在项目内 启动 electron
```

---

## 打包项目

```bash
./build.sh pro # pro 表示打包的环境 可选择dev pro
```

---

## 给 server.sh 权限 并且运行

```bash
chmod +x build.sh
```
