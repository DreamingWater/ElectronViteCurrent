import { app, BrowserWindow, shell, Menu, ipcMain } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import windowStateKeeper from 'electron-window-state'
// 调试
import { installExtension, VUEJS_DEVTOOLS } from '@tomjs/electron-devtools-installer';
// import electronDevtoolsInstaller, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'
// import { session } from 'electron'
// import {resolve} from "path";

// import { spawn } from 'child_process';  // 启动python进程
const { execFile } = require("cross-spawn");
// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer

// Menu

const setMenu = ()=> {
  const template = []
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
// setMenu();



//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
let child:any;
let win: BrowserWindow | null = null
// let win: BrowserWindow | null = null
let startWin: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')
// const indexHtml =  join(__dirname, '../../electron/loader.html')      // 启动动画
async function createWindow() {
  // let script_file = join('exeFiles', 'management.exe');
  // child = execFile(script_file);
  // let script = join('exeFiles', 'management.exe')
  // child = require('child_process').execFile(script)
  // child.on('error', (err) => {
  //   console.log('Spawn error: ', err);
  // });
  // child.on('exit', (code, signal) => {
  //   console.log('Child process exited with code: ', code);
  //   console.log('Child process exited with signal: ', signal);
  // });
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 800,
  });

  win = new BrowserWindow({
    width:mainWindowState.width,
    height:mainWindowState.height,
    x:mainWindowState.x,
    y:mainWindowState.y,
    // frame: false, // 隐藏标题栏和窗口控制按钮
    // title: 'LaserController',
    // icon: join(process.env.PUBLIC, 'favicon.ico'),
    webPreferences: {
      // preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
    show:false,
  })
  mainWindowState.manage(win);
  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)

    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
    // win.webContents.openDevTools()
    // win.loadURL(join(process.env.PUBLIC, 'loader.html'))
  }

  win.on('ready-to-show',()=>{
    startWin.destroy();
    win.show();
  })
  win.on('close', (event) => {
    // 阻止窗口直接关闭
    event.preventDefault();
    // 发送消息给渲染进程
    win.webContents.send('shutdown_background', '');
    // 延迟一段时间后关闭窗口
    setTimeout(() => {
    // 停止正在运行的子进程或服务
    if (child) {
      child.kill();
    }
      win.destroy();
    }, 1000); // 延迟1秒后关闭窗口
  });
  // win.webContents.on('WindowMini', (event) => {
  //   BrowserWindow.fromWebContents(event.sender)?.minimize();
  // })


  // win.webContents.on('will-navigate', (event, url) => { }) #344
}
// 加载窗口函数 loadingURL: string
async function  loadingWindow() {
  startWin =  new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    skipTaskbar: true,
    transparent: true,
    resizable: false,
    webPreferences: { experimentalFeatures: true },
  });
  
  //startWin.loadURL('http://baidu.com');
  startWin.loadURL(join(process.env.PUBLIC, 'loader.html'));
  startWin.show();
  startWin.setAlwaysOnTop(true);

 

  
  // 延迟2秒可以根据情况后续调快，= =，就相当于个，sleep吧，就那种。 = =。。。
  setTimeout(() => {
    createWindow();
  }, 1000);
}
// 程序开始时候启动loading 效果
app.whenReady().then(() => {
  installExtension(VUEJS_DEVTOOLS) // equals to installExtension("nhdogjmejiglipccpnnnanhbledajbpd")
      .then(ext => console.log(`Added Extension:  ${ext.name}`))
      .catch(err => console.log('An error occurred: ', err));
  // try{
  //   electronDevtoolsInstaller(VUEJS_DEVTOOLS).then((name) =>
  //     console.log(`Added Extension: ${name}`)).catch((err) => console.log('An error occurred: ', err))
  //   }catch (err){
  //       console.log('Unable to install `vue-devtools`: \n', err)
  // }
  loadingWindow();
  // session.defaultSession.loadExtension(
  //     resolve(__dirname, "../../extentions/devtools/6.6.1_0"),
  //     { allowFileAccess: true,}
  // )
})
// app.whenReady().then(loadingWindow)
// app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})


// 使用ipcMain.on方法监听 renderer-send 事件
ipcMain.on("WindowMini", (event) => {
  BrowserWindow.fromWebContents(event.sender)?.minimize();

});

// New window example arg: new windows url

ipcMain.on('WindowMax', (event) => {
  if (BrowserWindow.fromWebContents(event.sender)?.isMaximized()) {
      BrowserWindow.fromWebContents(event.sender)?.restore();
      return { status: false };
    } else {
      BrowserWindow.fromWebContents(event.sender)?.maximize();
      return { status: true };
    }
})
ipcMain.on('WindowClose', (event) => {

  // win?.webContents.send('shutdown_background', '');
  setTimeout(()=>{
    BrowserWindow.fromWebContents(event.sender)?.minimize();
    BrowserWindow.fromWebContents(event.sender)?.close();
  },1000)
})