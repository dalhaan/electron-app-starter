import path, { resolve } from "path";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  build: {
    rollupOptions: {
      input: path.join(__dirname, "./second-window.html"),
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/renderer"),
      "~/common": path.resolve(__dirname, "src/common"),
      "@org-name/common": path.resolve(
        __dirname,
        "../../lib/common/src/index.ts"
      ),
    },
  },
});
