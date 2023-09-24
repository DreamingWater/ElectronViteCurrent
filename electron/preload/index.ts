

// Mine
import {ipcRenderer,contextBridge}  from 'electron'



const closeWindow = () => {
  ipcRenderer.invoke('WindowClose')
}
const minWindow = () => {
  ipcRenderer.invoke('WindowMini')
}
const maxWindow = async () => {
  let result = await ipcRenderer.invoke('WindowMax')
  return result
  };

contextBridge.exposeInMainWorld('RenderApi', {
  closeWindow,
  minWindow,
  maxWindow,
  handleCounter:(callback) => ipcRenderer.on('shutdown_background', callback)     // 监听main进程传来的信号
})

