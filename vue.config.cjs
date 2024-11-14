const path = require('path');
const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = {
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .loader('ts-loader')
      .end();
  },
  publicPath: "/absproxy/5173",
  configureWebpack: {
    entry: './src/main.ts',
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true, // Enable if you are using Options API
        __VUE_PROD_DEVTOOLS__: false, // Disable Vue devtools in production
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          app: {
            chunks: 'all',
            name: 'main',
            test: /[\\/]src[\\/](.*)[\\/]/,
          },
          flagIcons: {
            chunks: 'all',
            name: 'flagIcons',                
            //test: /[\\/]node_modules[\\/]@coreui[\\/]((icons).*)[\\/]/,
            test: /[\\/]node_modules[\\/]@coreui[\\/]icons[\\/]js[\\/]((flag).*)[\\/]/,
          },
          freeIcons: {
            chunks: 'all',
            name: 'freeIcons',                
            //test: /[\\/]node_modules[\\/]@coreui[\\/]((icons).*)[\\/]/,
            test: /[\\/]node_modules[\\/]@coreui[\\/]icons[\\/]js[\\/]((free).*)[\\/]/,
          },
          brandIcons: {
            chunks: 'all',
            name: 'brandIcons',                
            test: /[\\/]node_modules[\\/]@coreui[\\/]icons[\\/]js[\\/]((brand).*)[\\/]/,
          },
          vendors: {
            chunks: 'all',
            name: 'vendors',
            test: /[\\/]node_modules[\\/]@coreui[\\/]((?!icons).*)[\\/]/,
          },
          // Merge all the CSS into one file
          styles: {
            name: 'styles',
            test: /\.s?css$/,
            chunks: 'all',
            minChunks: 1,
            reuseExistingChunk: true,
            enforce: true,
          }
        }
      },
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js', '.vue' ],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@models': path.resolve(__dirname, 'src/models'),
        '@requestDtos': path.resolve(__dirname, 'src/services/dtos/requestDtos'),
        '@responseDtos': path.resolve(__dirname, 'src/services/dtos/responseDtos'),
        '@enums': path.resolve(__dirname, 'src/services/dtos/enums'),
        '@forms': path.resolve(__dirname, 'src/components/formInputs'),
        '@layouts': path.resolve(__dirname, 'src/views/layouts'),
        '@/composables': path.resolve(__dirname, 'src/composables'),
        '@/component': path.resolve(__dirname, 'src/component'),
        '@/stores': path.resolve(__dirname, 'src/stores'),
        '@errors': path.resolve(__dirname, 'src/errors'),
        '@router': path.resolve(__dirname, 'src/router'),
      },
    },
  },
  devServer: {
    allowedHosts: 'all',
    port: 5173,
    client: {
      webSocketURL: 'ws://0.0.0.0:0'
    },
    hot: true,
    liveReload: false,
    proxy: {
      '^/api': {
        target: 'http://localhost:5000/api',
        changeOrigin: true,
        secure: true,
        ws: true,
        pathRewrite: { '^/api': '' },
      },
      '^/images': {
        target: 'http://localhost:5000/images',
        changeOrigin: false,
        secure: false,
        ws: true,
        pathRewrite: { '^/images': '' },
      },
    },
  },
};