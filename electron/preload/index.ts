

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
})