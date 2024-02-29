

// Mine
// import {ipcRenderer,contextBridge}  from 'electron'
//
//
// contextBridge.exposeInMainWorld('RenderApi', {
//   closeWindow:()=>  ipcRenderer.send('WindowClose'),
//   minWindow:()=>  ipcRenderer.send('WindowMini'),
//   maxWindow:(result)=>  ipcRenderer.send('WindowMax',result),
//   handleCounter:(callback) => ipcRenderer.on('shutdown_background', callback)     // 监听main进程传来的信号
// })
//

const { ipcRenderer } = require('electron');
// function closeWindow() {
//   ipcRenderer.send('WindowClose');
// }
//
// export function minWindow() {
//   ipcRenderer.send('WindowMini');
// }
// function maxWindow(result) {
//   ipcRenderer.send('WindowMax', result);
// }
// function handleCounter(callback) {
//   ipcRenderer.on('shutdown_background', callback);
// }
window.myAPI = {
  closeWindow: () => ipcRenderer.send('WindowClose'),
  minWindow: () => ipcRenderer.send('WindowMini'),
  maxWindow: (result) => ipcRenderer.send('WindowMax', result),
  handleCounter: (callback) => ipcRenderer.on('shutdown_background', callback)
};