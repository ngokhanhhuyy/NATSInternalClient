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
        target: "https://5000-idx-natsinternalnet-1721959394916.cluster-7ubberrabzh4qqy2g4z7wgxuw2.cloudworkstations.dev/api",
        changeOrigin: false,
        secure: false,
        ws: true,
        rewrite: (path) => {
          console.log(path);
          return path.replace(/^\/api/, '');
        },
      },
    }
  }
});
