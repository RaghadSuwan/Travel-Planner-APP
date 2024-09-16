const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin"); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: "./src/client/index.js",
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true, // لتحسين سرعة البناء باستخدام التخزين المؤقت
                    }
                }
            },
        ]
    },

    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
        minimize: true,
    },
    
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            inject: true, // تلقائيًا إدراج CSS و JS في HTML
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        }),
    ]
};
