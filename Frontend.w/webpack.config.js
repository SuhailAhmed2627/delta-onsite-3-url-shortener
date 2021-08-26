/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
   const isProduction = env === "production";
   return {
      entry: "./src/App.jsx",
      output: {
         path: path.resolve(__dirname, "build"),
         publicPath: "/",
         filename: "bundle.js",
      },
      resolve: {
         alias: {
            components: path.resolve(__dirname, "src"),
         },
         extensions: [".js", ".jsx"],
      },
      devServer: {
         contentBase: "./build",
         historyApiFallback: true,
      },
      module: {
         rules: [
            {
               test: /\.(js|jsx)$/,
               exclude: /node_modules/,
               use: ["babel-loader", "eslint-loader"],
            },
            {
               test: /\.css$/,
               use: ["style-loader", "css-loader"],
            },
            {
               test: /\.(jpg|png)$/,
               use: {
                  loader: "url-loader",
               },
            },

            {
               test: /\.(woff|woff2|eot|ttf|otf)$/i,
               type: "asset/resource",
            },
         ],
      },
      plugins: [
         new HtmlWebpackPlugin({
            template: path.resolve("./index.html"),
         }),
      ],
      devtool: isProduction ? "source-map" : "inline-source-map",
   };
};
