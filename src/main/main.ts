/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import {PythonShell} from 'python-shell';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
var cmd = require('node-cmd')


export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};


var info_options = {
  pythonPath:"/usr/bin/python3",
  scriptPath:"src/format-data/"
  };
var JSONINFO;
var cpu_list = [];
function updateScreen(){

  cmd.run(
    'sudo python3 src/format-data/new_format_data.py',
    function(err, results){
      if (err) throw err;
      JSONINFO = results

      var return_JSON = JSON.parse(JSONINFO)
      cpu_list.push(return_JSON.total_cpu_percentage)
      
    }
  )

let graph_options = {
  pythonPath:"/usr/bin/python3",
  scriptPath:"src/format-data/",
  args:[cpu_list.toString()]

};




PythonShell.run("draw_cpu_graph.py", graph_options, (err,result)=>{
  if (err){
    console.log(err);
    throw(err);
  }
});

if (cpu_list.length > 20){
  cpu_list.shift()
}
}

updateScreen()
setInterval(updateScreen, 5000)
async function handleTerminateProcess(pid){
  
  var send_back = kill_process(pid)
  return send_back
}
//TODO Have to fix the sending of the terminate code to the front end
var terminate_code = -1
function kill_process(pid){
  let terminate_options = {
    pythonPath:"/usr/bin/python3",
    scriptPath:"src/format-data/",
    args:[pid.toString()]

  }
  PythonShell.run("kill_process.py", terminate_options, (err, result)=> {
    if (err){
      console.log(err);
    } 
    
    terminate_code = ( Number(result[0]))
  })
  console.log(terminate_code)
  return terminate_code
  
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    ipcMain.handle('terminateProcess', (err, results)=> {
      handleTerminateProcess(results)
    })
    createWindow();
    app.on('activate', () => {

      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
