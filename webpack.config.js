const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
    mode:"development",
    entry: {
        main: path.resolve(__dirname, "./src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name]-bundle.js"
    },

    module:{
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use:{
                    loader:"babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: "asset/resource",
              },
            ],
    },
    //this is obviously for the dev server
    devServer: {
        static: {
        directory: path.join(__dirname, 'public'), // Use 'static' instead of 'contentBase' in newer versions
        },
  
        headers: {
            "Content-Type": "text/css"
        },
        compress: true,
        port: 3000,
        hot: true,
        open: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CaseSensitivePathsPlugin()
    ],  
}