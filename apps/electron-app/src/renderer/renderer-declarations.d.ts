import type { IpcHandlers } from "../main/ipc";

declare global {
  interface Window {
    electronAPI: // IPC invoke handler types
    IpcHandlers & {
      // Window events
      openSecondWindow: () => void;

      // IPC one-way listener types
      getStore: (name: string) => void;
      onStoreChange: (name: string, callback: (state: any) => void) => void;
      updateStore: (name: string, state: any) => void;
      onWindowVisiblityChange: (
        callback: (value: "focus" | "blur") => void
      ) => void;
    };
  }
}

export {};
