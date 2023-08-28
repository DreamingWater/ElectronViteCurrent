
import { ipcRenderer,contextBridge } from 'electron'

ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})

// const closeWindow = () => {
//   ipcRenderer.invoke('on-close-event')
// }




// contextBridge.exposeInMainWorld('MineRender', {
//   closeWindow
// })