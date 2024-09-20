const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
    mode: "production", // Set mode to 'production' for optimized output
    devtool: "hidden-source-map", // Source maps but without revealing the actual code in production

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i, // Match Sass/SCSS files
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    "css-loader", // Translate CSS into CommonJS
                    "sass-loader" // Compile Sass to CSS
                ]
            }
        ]
    },

    output: {
        filename: 'bundle.[contenthash].js', // Output file with a unique content hash for cache busting
        path: path.resolve(__dirname, 'dist'), // Output directory
        clean: true, // Clean the output directory before every build
    },

    optimization: {
        minimize: true, // Enable minification of both JS and CSS
        minimizer: [
            new TerserPlugin(), // Minimize JavaScript files
            new CssMinimizerPlugin() // Minimize CSS files
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css' // Extracted CSS file with content hash
        })
    ]
});
