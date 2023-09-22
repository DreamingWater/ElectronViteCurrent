import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { setMenu} from './buildMenu'
import { ipcMainEvent } from './ipcMainEvent'

//显示菜单栏
setMenu()
// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
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

let win: BrowserWindow | null = null
let startWin: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml =  join(__dirname, '../../electron/loader.html')      // 启动动画
async function createWindow() {
  win = new BrowserWindow({
    width:1150,
    height:750,
    frame: false, // 隐藏标题栏和窗口控制按钮
    // title: 'Main window',
    // icon: join(process.env.PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload:preload,
      // preload: path.resolve(__dirname, './preload/preload.js'),
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: true,
    },
    show:false
  })

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools()
  } else {
    // win.loadURL(url)
    win.loadFile(indexHtml)
  }

  // ready-to-show之后显示界面
  win.on('ready-to-show',()=>{
      win.show()
      startWin.destroy();
  })
  
  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
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
  startWin.loadURL(indexHtml);
  startWin.show();
  startWin.setAlwaysOnTop(true);
  // 延迟1秒可以根据情况后续调快，= =，就相当于个，sleep吧，就那种。 = =。。。
  setTimeout(() => {
    createWindow();
  }, 1000);
}
app.whenReady().then(loadingWindow)

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
    loadingWindow()
  }
})


// ipcMain Event
ipcMainEvent();
