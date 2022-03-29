const { ipcRenderer, contextBridge } = require('electron');

const WINDOW_API = {
  
  onNewJSON: (callback) => ipcRenderer.on("new_json", callback),
  terminateProcess: (pid) => {
    ipcRenderer.invoke('terminateProcess', pid)}
}
contextBridge.exposeInMainWorld("api", WINDOW_API);
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});

