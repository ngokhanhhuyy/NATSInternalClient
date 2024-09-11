import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    strictPort: true,
    proxy: {
      "^/api": {
        target: "http://localhost:5000/api",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => {
          const replacedPath = path.replace(/^\/api/, "");
          return replacedPath;
        },
      },
      "^/images": {
        target: "http://localhost:5000/images",
        changeOrigin: false,
        secure: false,
        ws: true,
        rewrite: (path) => {
          const replacedPath = path.replace(/^\/images/, "");
          return replacedPath;
        },
      },
    },
  },
});
