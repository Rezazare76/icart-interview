/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const port = process.env.PORT || 3001;
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    fallback: {
      buffer: require.resolve("buffer/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext]",
          // filename: "images/[name][ext]",
        },
      },
      {
        test: /\.svg$/i,
        type: "asset/inline",
      },
      {
        test: /\.webp$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: "./src/favicon.ico",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    // new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public", "icart-nft.jpg"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "public", "downloadable"),
          to: path.resolve(__dirname, "dist/proposal"),
        },
        {
          from: path.resolve(
            __dirname,
            "public",
            "google8c5861222ae306a8.html"
          ),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "public", "logo.png"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],
  devServer: {
    host: "localhost",
    port: port,
    historyApiFallback: true,
    hot: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
