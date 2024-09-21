const { merge } = require("webpack-merge"); // Import merge function to combine configurations
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Plugin to extract CSS into separate files
const TerserPlugin = require("terser-webpack-plugin"); // Plugin to minimize JavaScript
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Plugin to minimize CSS
const common = require("./webpack.common.js"); // Import common configuration
const WorkboxPlugin = require('workbox-webpack-plugin'); // Plugin for service worker (PWA support)
const path = require("path"); // Import path module for handling file paths

module.exports = merge(common, {
    mode: "production", // Set mode to production for optimized output
    devtool: "hidden-source-map", // Generate source maps but keep them hidden

    output: {
        filename: 'bundle.[contenthash].js', // Output filename with content hash for caching
        path: path.resolve(__dirname, 'dist'), // Output directory for the bundle
        clean: true, // Clean the output directory before each build
    },

    optimization: {
        minimize: true, // Enable minimization of output files
        minimizer: [
            new TerserPlugin(), // Minimize JavaScript files
            new CssMinimizerPlugin() // Minimize CSS files
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css', // Extracted CSS filename with content hash
        }),
        new WorkboxPlugin.GenerateSW({ // Generate a service worker for caching
            clientsClaim: true, // Take control of the page as soon as the SW is activated
            skipWaiting: true, // Skip the waiting phase and activate the SW immediately
        })
    ]
});
