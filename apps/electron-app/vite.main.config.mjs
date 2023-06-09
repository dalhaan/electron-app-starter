import { resolve } from "path";

import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/main"),
      "~/common": resolve(__dirname, "src/common"),
      "@org-name/common": resolve(__dirname, "../../lib/common/src/index.ts"),
      "@org-name/node": resolve(__dirname, "../../lib/node/src/index.ts"),
    },
  },
});
