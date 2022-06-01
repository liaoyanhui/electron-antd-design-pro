/*
 * @Description: 
 * @Author: 尚夏
 * @Date: 2021-07-05 15:32:02
 * @LastEditTime: 2022-05-30 10:42:56
 * @FilePath: /mining-admin-desktop/electron/main.js
 */

// 引入electron并创建一个Browserwindow
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const pkg = require('./package.json');

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;
// if (
//   process.env.NODE_ENV === 'development' ||
//   process.env.DEBUG_PROD === 'true'
// ) {
//   require('electron-debug')();
// }

function createWindow() {
  // 创建浏览器窗口,宽高自定义
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 840,
    minWidth: 1280,
    minHeight: 760,
    webPreferences: {
      // enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      // nodeIntegrationInWorker: true,
      // webSecurity: false, // 禁用浏览器安全策略
    }
  });


  if (pkg.env === 'dev') { // 开发环境
    mainWindow.loadURL('http://192.168.6.196:8000/');
    mainWindow.webContents.openDevTools({ mode: "bottom" })
  } else if (pkg.env === 'pro') { // 线上环境
    mainWindow.loadURL(path.join('file://', __dirname, '/dist/index.html'));
  } else {
    mainWindow.loadURL('http://192.168.6.196:8000/');
    mainWindow.webContents.openDevTools({ mode: "bottom" })
  }



  // 打开开发者工具，默认不打开
  // mainWindow.webContents.openDevTools({ mode: "bottom" })

  // 关闭window时触发下列事件.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow);

// 所有窗口关闭时退出应用.
app.on('window-all-closed', () => {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
});

// 你可以在这个脚本中续写或者使用require引入独立的js文件.