const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name]-bundle.js",
        publicPath:"/",
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
    devServer: {
        static: {
        directory: path.join(__dirname, 'public'),
        publicPath:"/",
        },
        compress: true,
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:"pixcel academy",
            template:"./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],  
}