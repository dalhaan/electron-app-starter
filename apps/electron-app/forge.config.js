/** @type {import('@electron-forge/shared-types').ForgeConfig} */
const config = {
  // packagerConfig: {
  //   icon: "./assets/logo",
  // },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-vite",
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: "src/main/main.ts",
            config: "vite.main.config.mjs",
          },
          {
            entry: "src/main/preload.ts",
            config: "vite.preload.config.mjs",
          },
        ],
        renderer: [
          {
            name: "main_window",
            config: "vite.main-window.config.mjs",
          },
          {
            name: "second_window",
            config: "vite.second-window.config.mjs",
          },
        ],
      },
    },
  ],
};

module.exports = config;
