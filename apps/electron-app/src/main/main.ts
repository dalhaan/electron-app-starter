import { EXAMPLE_COMMON_VARIABLE } from "@org-name/common";
import { EXAMPLE_MAIN_VARIABLE } from "@org-name/node";
import { app, BrowserWindow, ipcMain } from "electron";

import { createMainWindow } from "@/createMainWindow";
import { createSecondWindow } from "@/createSecondWindow";
import { initIpcHandlers } from "@/ipc";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  initIpcHandlers();

  console.log("Example @org-node/node variable", EXAMPLE_MAIN_VARIABLE);
  console.log("Example @org-node/common variable", EXAMPLE_COMMON_VARIABLE);

  const mainWindow = createMainWindow();

  // Open window event handlers

  ipcMain.on("OPEN_SECOND_WINDOW", async () => {
    const secondWindow = await createSecondWindow(mainWindow);
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
