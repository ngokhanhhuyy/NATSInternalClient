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
    proxy: {
      "^/api": {
        target: "http://localhost:5000/api",
        changeOrigin: false,
        secure: false,
        ws: true,
        rewrite: (path) => {
          console.log(path);
          return path.replace(/^\/api/, '');
        },
      },
      "^/images": {
        target: "http://localhost:5000/images",
        changeOrigin: false,
        secure: false,
        ws: true,
        rewrite: (path) => {
          console.log(path);
          return path.replace(/^\/images/, '');
        },
      },
    },
  },
});
