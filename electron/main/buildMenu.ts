import { app, Menu } from 'electron'


export const setMenu = ()=> {
  const template = []
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
