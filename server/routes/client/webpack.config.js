const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      assetModuleFilename: "[name][ext]",
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Just Another Text Editor",
        filename: "index.html",
        template: "./index.html",
        favicon: "./favicon.ico",
      }),
      // new MiniCssExtractPlugin(),
      // new InjectManifest({
      //   swSrc: "./src-sw.js",
      // }),
      new WebpackPwaManifest({
        filename: "manifest.json",
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "Just Another Text Editor - Progressive Web Application",
        background_color: "#c0c0c0",
        theme_color: "#13293d",
        orientation: "portrait",
        display: "standalone",
        id: "/",
        start_url: ".",
        crossorigin: null, 
        inject: true,
        fingerprints: false,
        ios: true,
        publicPath: "/",
        includeDirectory: true,
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], 
            destination: path.join("images"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};
