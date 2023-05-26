import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  // IPC one-way functions
  getStore: (name: string) => {
    ipcRenderer.send(`SYNCSTORE:${name}:GET`);
  },
  onStoreChange: (name: string, callback: (state: any) => void) => {
    ipcRenderer.on(`SYNCSTORE:${name}:ONCHANGE`, (_, state) => callback(state));
  },
  updateStore: (name: string, state: any) => {
    ipcRenderer.send(`SYNCSTORE:${name}:UPDATE`, state);
  },
  onWindowVisiblityChange: (callback: (value: "focus" | "blur") => void) =>
    ipcRenderer.on("visibilityChange", (_, value) => callback(value)),
});
