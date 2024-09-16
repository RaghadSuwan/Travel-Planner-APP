const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'Client',
        clean: true,
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(), // لتفعيل Hot Module Replacement
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true, // تفعيل Hot Module Replacement
        open: true, // فتح المتصفح تلقائيًا
        port: 8080, // تحديد المنفذ
    },

    optimization: {
        minimize: true,
    },
});
