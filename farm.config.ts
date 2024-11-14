import { defineConfig } from '@farmfe/core';
import Vue from '@vitejs/plugin-vue';
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  vitePlugins: [
    Vue(),
    vueJsx(),
  ],
  compilation: {
    resolve: {
      alias: {
        'pinia': 'pinia/dist/pinia.mjs', // Try targeting the main entry file explicitly
        '@': './src',
        '@models': './src/models',
        '@requestDtos': './src/services/dtos/requestDtos',
        '@responseDtos': './src/services/dtos/responseDtos',
        '@enums': './src/services/dtos/enums',
        '@forms': './src/components/formInputs',
        '@layouts': './src/views/layouts',
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000/api',
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/images': {
        target: 'http://localhost:5000/images',
        changeOrigin: false,
        secure: false,
        ws: true,
        pathRewrite: (path) => path.replace(/^\/images/, ''),
      },
    },
  },
});