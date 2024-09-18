const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8080,
        hot: true,
        open: true,
        client: {
            overlay: true,
        },
    },
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
        clean: true,
    },
});
