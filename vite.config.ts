import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@models": fileURLToPath(new URL("./src/models", import.meta.url)),
      "@requestDtos": fileURLToPath(new URL("./src/services/dtos/requestDtos", import.meta.url)),
      "@responseDtos": fileURLToPath(new URL("./src/services/dtos/responseDtos", import.meta.url)),
      "@enums": fileURLToPath(new URL("./src/services/dtos/enums", import.meta.url)),
      "@forms": fileURLToPath(new URL("./src/components/formInputs", import.meta.url)),
      "@layouts": fileURLToPath(new URL("./src/views/layouts", import.meta.url)),
    }
  },
  server: {
    strictPort: true,
    proxy: {
      "^/api": { // ^/api       ^/absproxy/5173/api
        target: "http://localhost:5000/api",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => {
          const replacedPath = path.replace(/^\/api/, "");
          return replacedPath;
        },
      },
      "^/images": { // ^/images       ^/absproxy/5173/images
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
