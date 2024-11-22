const path = require("path");
const rspack = require("@rspack/core");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  devtool: false,
  entry: "./src/main.ts",output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/", // Ensure all assets are served from the root
    filename: "[name].[hash].js",
  },
  optimization: {
    splitChunks: false
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts", "tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@models": path.resolve(__dirname, "src/models"),
      "@requestDtos": path.resolve(__dirname, "src/services/dtos/requestDtos"),
      "@responseDtos": path.resolve(__dirname, "src/services/dtos/responseDtos"),
      "@enums": path.resolve(__dirname, "src/services/dtos/enums"),
      "@forms": path.resolve(__dirname, "src/components/formInputs"),
      "@layouts": path.resolve(__dirname, "src/views/layouts"),
      "@/composables": path.resolve(__dirname, "src/composables"),
      "@/component": path.resolve(__dirname, "src/component"),
      "@/stores": path.resolve(__dirname, "src/stores"),
      "@errors": path.resolve(__dirname, "src/errors"),
      "@router": path.resolve(__dirname, "src/router"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Add these loaders
        type: "javascript/auto",
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type: "asset",
      },
    ],
  },
  experiments: {
    css: false,
  },
  plugins: [
    new VueLoaderPlugin(),
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, "src/assets/index.html"),
      inject: "body",
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
    }),
  ],
  devServer: {
    allowedHosts: "all",
    port: 5173,
    historyApiFallback: true,
    static: "./src/assets",
    headers: {
      "Allow-Control-Allow-Origin": "*",
      "Allow-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Allow-Control-Allow-Headers": "Content-Type,Authorization",
    },
    hot: true,
    liveReload: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:5000",
        changeOrigin: true,
        pathRewrite: { "^/api": "/api" },
        secure: false,
        ws: true,
      },
      {
        context: ["/images"],
        target: "http://localhost:5000",
        pathRewrite: { "^/images": "/images" },
        changeOrigin: true,
        secure: false,
      },
      {
        context: ["/proxyWebsocket"],
        target: "http://localhost:5175",
        changeOrigin: true,
        pathRewrite: { "^/proxyWebsocket": "/proxyWebsocket" },
        secure: false,
        ws: true,
      }
    ]
  }
};