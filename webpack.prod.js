const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const common = require("./webpack.common.js");
const WorkboxPlugin = require('workbox-webpack-plugin'); // Import Workbox for PWA
const path = require("path");

module.exports = merge(common, {
    mode: "production", // Production mode for optimized output
    devtool: "hidden-source-map", // Source maps without revealing code

    output: {
        filename: 'bundle.[contenthash].js', // Output with content hash
        path: path.resolve(__dirname, 'dist'), // Output directory
        clean: true, // Clean before build
    },

    optimization: {
        minimize: true, // Enable minimization
        minimizer: [
            new TerserPlugin(), // Minimize JavaScript
            new CssMinimizerPlugin() // Minimize CSS
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css' // Extracted CSS file
        }),
        new WorkboxPlugin.GenerateSW({ // Generate service worker
            clientsClaim: true, // Claim clients immediately
            skipWaiting: true, // Activate new service worker immediately
        })
    ]
});
