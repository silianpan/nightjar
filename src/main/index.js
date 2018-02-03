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
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 快捷键
  globalShortcut.register('Alt+X', () => {
    mainWindow.show();
  })

  //系统托盘右键菜单
  var trayMenuTemplate = [
    {
        label: '退出',
        click: function () {
            //ipc.send('close-main-window');
             app.quit();
        }
    }
  ];

  //系统托盘图标目录
  appTray = new Tray(path.join(__dirname, '../../build/icons/icon.ico'));

  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  appTray.setToolTip('QR Code Scan Tool');

  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);

  appTray.on('click', function () { // 左键单击时显示窗口
    mainWindow.show();
  });

  ipcMain.on('closeWindow', function() {
    // closeWindow  可自己随意定义
    app.quit()
  });
  ipcMain.on('minimize', function() {
    //minimize 可自己随意定义
    mainWindow.hide()
  });
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
