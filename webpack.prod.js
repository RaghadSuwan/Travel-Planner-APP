const { merge } = require("webpack-merge"); // Import merge function to combine configurations
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Import plugin to extract CSS into separate files
const TerserPlugin = require("terser-webpack-plugin"); // Import plugin to minimize JavaScript
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Import plugin to minimize CSS
const common = require("./webpack.common.js"); // Import common configuration
const WorkboxPlugin = require('workbox-webpack-plugin'); // Import Workbox for PWA support
const path = require("path"); // Import path module for handling file paths

module.exports = merge(common, {
    mode: "production", // Set mode to production for optimized output
    devtool: "hidden-source-map", // Enable source maps without exposing source code

    output: {
        filename: 'bundle.[contenthash].js', // Output filename with content hash for cache busting
        path: path.resolve(__dirname, 'dist'), // Output directory for the bundle
        clean: true, // Clean the output directory before each build
    },

    optimization: {
        minimize: true, // Enable minimization of output files
        minimizer: [
            new TerserPlugin(), // Use TerserPlugin to minimize JavaScript
            new CssMinimizerPlugin() // Use CssMinimizerPlugin to minimize CSS
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css' // Extracted CSS filename with content hash
        }),
        new WorkboxPlugin.GenerateSW({ // Generate a service worker for caching
            clientsClaim: true, // Claim existing clients immediately
            skipWaiting: true, // Activate the new service worker immediately
        })
    ]
});
