import { app, BrowserWindow, Menu, Tray, ipcMain, globalShortcut } from 'electron' // eslint-disable-line
import { fail } from 'assert';
const electron = require('electron');
const path = require('path');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
let appTray = null;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    height: height,
    useContentSize: true,
    width: width,
    skipTaskbar: false,
    frame: true,
    autoHideMenuBar: true,
    title: '智影未来二维码桌面扫描版',
    fullscreen: true
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('minimize', function() {
    //minimize 可自己随意定义
    // mainWindow.hide()
  });

  // 快捷键
  globalShortcut.register('Alt+X', () => {
    // 窗口是否可见
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }

    // 窗口最小化切换
    // if (mainWindow.isMinimized()) {
    //   mainWindow.maximize();
    // } 
    // if (mainWindow.isMaximized()) {
    //   mainWindow.minimize();
    // }
  })

  // // windows系统托盘右键菜单
  // var trayMenuTemplate = [
  //   {
  //     label: '智影未来二维码桌面扫描版',
  //     click: function () {
  //       mainWindow.show();
  //     }
  //   },
  //   {
  //     label: '最小化',
  //     click: function () {
  //       mainWindow.minimize();
  //     }
  //   },
  //   {
  //       label: '退出',
  //       click: function () {
  //         //ipc.send('close-main-window');
  //         app.quit();
  //       }
  //   }
  // ];

  // //系统托盘图标目录
  // appTray = new Tray(path.join(__dirname, '../../build/icons/icon.ico'));

  // //图标的上下文菜单
  // const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  // //设置此托盘图标的悬停提示内容
  // appTray.setToolTip('智影未来二维码桌面扫描版');

  // //设置此图标的上下文菜单
  // appTray.setContextMenu(contextMenu);

  // appTray.on('click', function () { // 左键单击时显示窗口
  //   mainWindow.show();
  // });

  // ipcMain.on('closeWindow', function() {
  //   // closeWindow  可自己随意定义
  //   app.quit()
  // });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
