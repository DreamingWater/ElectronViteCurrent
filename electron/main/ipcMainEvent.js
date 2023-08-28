import {ipcMain,BrowserWindow,dialog } from 'electron'

export const ipcMainEvent = () =>{
    // New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
    const childWindow = new BrowserWindow({
      webPreferences: {
        preload:preload,
        nodeIntegration: true,
        contextIsolation: false,
      },
    })
  
    if (process.env.VITE_DEV_SERVER_URL) {
      childWindow.loadURL(`${url}#${arg}`)
    } else {
      childWindow.loadFile(indexHtml, { hash: arg })
    }
  })
  
  ipcMain.handle('WindowMini', (event) => {
    BrowserWindow.fromWebContents(event.sender)?.minimize();
  })
  ipcMain.handle('WindowMax', (event) => {
    if (BrowserWindow.fromWebContents(event.sender)?.isMaximized()) {
        BrowserWindow.fromWebContents(event.sender)?.restore();
        return { status: false };
      } else {
        BrowserWindow.fromWebContents(event.sender)?.maximize();
        return { status: true };
      }
  })
  ipcMain.handle('WindowClose', (event) => {
    BrowserWindow.fromWebContents(event.sender)?.minimize();
    BrowserWindow.fromWebContents(event.sender)?.close();
  })
}  