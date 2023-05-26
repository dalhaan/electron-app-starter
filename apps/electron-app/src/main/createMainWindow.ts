import path from "path";

import { BrowserWindow, nativeTheme } from "electron";

import { colors } from "../common/colors";

import { counterStore } from "./stores/counter-store";

export const createMainWindow = () => {
  const lightThemeBackground = "white";
  const darkThemeBackground = colors.almostBlack;

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 888,
    resizable: false,
    backgroundColor: nativeTheme.shouldUseDarkColors
      ? darkThemeBackground
      : lightThemeBackground,
    titleBarStyle: "hidden",
    trafficLightPosition: {
      x: 19,
      y: 18,
    },
    // transparent: true,
    // frame: false,
    // backgroundColor: "#00000000",
    // vibrancy: "under-window",
    // visualEffectState: "followWindow",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    show: false,
  });

  // Update window background colour on theme change.
  // Prevents seeing white background when resizing in dark mode.
  function updateTheme() {
    mainWindow.setBackgroundColor(
      nativeTheme.shouldUseDarkColors
        ? darkThemeBackground
        : lightThemeBackground
    );
  }

  nativeTheme.on("updated", updateTheme);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL + "/main-window.html");

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(
      path.join(
        __dirname,
        `../renderer/${MAIN_WINDOW_VITE_NAME}/main-window.html`
      )
    );
  }

  // Trick to prevent Electron from showing a blank screen at the start.
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("focus", () => {
    mainWindow.webContents.send("visibilityChange", "focus");
  });

  mainWindow.on("blur", () => {
    mainWindow.webContents.send("visibilityChange", "blur");
  });

  // Save reference to webContents to prevent it from being lost when it is destroyed
  const mainWindowWebContents = mainWindow.webContents;

  // Clean up listeners on window close
  // All stores that are used need to remove their listeners here
  mainWindow.webContents.on("destroyed", () => {
    // Remove all store listeners
    counterStore.removeListener(mainWindowWebContents);

    // Remove theme change listener
    nativeTheme.off("updated", updateTheme);
  });

  return mainWindow;
};
