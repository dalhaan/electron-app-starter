import path from "path";

import { BrowserWindow, nativeTheme } from "electron";

import { counterStore } from "@/stores/counter-store";
import { colors } from "~/common/colors";

export const createSecondWindow = async (mainWindow: BrowserWindow) => {
  const lightThemeBackground = "white";
  const darkThemeBackground = colors.almostBlack;

  // Create the import window
  const secondWindow = new BrowserWindow({
    parent: mainWindow,
    width: 660,
    height: 611,
    minWidth: 660,
    minHeight: 611,
    resizable: true,
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
    secondWindow.setBackgroundColor(
      nativeTheme.shouldUseDarkColors
        ? darkThemeBackground
        : lightThemeBackground
    );
  }

  nativeTheme.on("updated", updateTheme);

  // and load the import window
  if (SECOND_WINDOW_VITE_DEV_SERVER_URL) {
    secondWindow.loadURL(
      SECOND_WINDOW_VITE_DEV_SERVER_URL + "/second-window.html"
    );

    // Open the DevTools.
    // importWindow.webContents.openDevTools();
  } else {
    await secondWindow.loadFile(
      path.join(
        __dirname,
        `../renderer/${SECOND_WINDOW_VITE_NAME}/second-window.html`
      )
    );
  }

  // Trick to prevent Electron from showing a blank screen at the start.
  secondWindow.on("ready-to-show", () => {
    secondWindow.show();
  });

  secondWindow.on("focus", () => {
    secondWindow.webContents.send("visibilityChange", "focus");
  });

  secondWindow.on("blur", () => {
    secondWindow.webContents.send("visibilityChange", "blur");
  });

  // Save reference to webContents to prevent it from being lost when it is destroyed
  const secondWindowWebContents = secondWindow.webContents;

  // Clean up listeners on window close
  // All stores that are used need to remove their listeners here
  secondWindow.webContents.on("destroyed", () => {
    // Remove all store listeners
    counterStore.removeListener(secondWindowWebContents);

    // Remove theme change listener
    nativeTheme.off("updated", updateTheme);
  });

  return secondWindow;
};
