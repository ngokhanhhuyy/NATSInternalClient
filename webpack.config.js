/* eslint-disable no-undef */
import path from 'path';
import { fileURLToPath } from 'url';
import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';

// Load environment variables from .env files
// eslint-disable-next-line no-unused-vars
const env = dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
}).parsed || {};

// Construct the process.env object with the necessary variables
const envKeys = {
  'process.env': JSON.stringify(
    Object.keys(env).reduce((acc, key) => {
      acc[key] = env[key];
      return acc;
    }, { NODE_ENV: process.env.NODE_ENV || 'development' })
  ),
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  target: 'web',  // Ensures the build is intended for a browser environment
  mode: process.env.NODE_ENV || 'development', // Switch to 'production' for production builds
  entry: './src/main.ts', // Adjust this if your entry file is different
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/views': path.resolve(__dirname, 'src/views'),
      '@/composables': path.resolve(__dirname, 'src/composables'),
      '@/component': path.resolve(__dirname, 'src/component'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@requestDtos': path.resolve(__dirname, 'src/services/dtos/requestDtos'),
      '@responseDtos': path.resolve(__dirname, 'src/services/dtos/responseDtos'),
      '@enums': path.resolve(__dirname, 'src/services/dtos/enums'),
      '@forms': path.resolve(__dirname, 'src/components/formInputs'),
      '@layouts': path.resolve(__dirname, 'src/views/layouts'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // Transpile without type checking for faster builds
              appendTsSuffixTo: [/\.vue$/], // Ensure .vue files are processed as TypeScript
              happyPackMode: true, // Improves build speed with ts-loader in Webpack},
            }
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: [
          'vue-style-loader',{
            loader: 'css-loader',
            options: {
              esModule: false
            }
          }
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/inline', // This will automatically handle image assets
      }
      
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/assets/index.html',
      filename: 'index.html',
      excludeChunks: ['main'], // Ensure that any CSS from `main.css` is excluded
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // CSS filename template
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // Explicitly define the hydration mismatch details flag
    }),
  ],
  devServer: {
    allowedHosts: "all",
    // static: {
    //   directory: path.resolve(__dirname, 'src/assets'), // Replaces contentBase
    // },
    historyApiFallback: true,
    open: true,
    hot: true,
    port: 5173,
    host: "0.0.0.0",
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' },
        secure: false,
        ws: true,
      },
      {
        context: ['/images'],
        target: 'http://localhost:5000',
        pathRewrite: { '^/images': '/images' },
        changeOrigin: true,
        secure: false,
      }
    ],
  },
};
