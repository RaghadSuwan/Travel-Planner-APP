// Import necessary dependencies
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin"); // Plugin to generate an HTML file from a template
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Plugin to clean the output directory before each build
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Plugin to minimize CSS files

module.exports = {
    // Entry point of the application, where webpack starts the bundling process
    entry: "./src/client/index.js",

    module: {
        // Rules to specify how different types of files should be processed
        rules: [
            {
                // Process JavaScript files using Babel
                test: /\.js$/, // Match all .js files
                exclude: /node_modules/, // Exclude files in the node_modules directory
                loader: "babel-loader" // Use Babel to transpile modern JavaScript to a compatible version
            },
        ]
    },

    optimization: {
        minimizer: [
            `...`, // Retain existing minimizers (e.g., for JavaScript)
            new CssMinimizerPlugin(), // Minimize CSS files to reduce file size
        ],
        minimize: true, // Enable minimization of the output files (both JS and CSS)
    },

    plugins: [
        new htmlWebpackPlugin({
            template: "./src/client/views/index.html", // Path to the HTML template to use
            filename: "./index.html" // Name of the output HTML file
        }),
        new CleanWebpackPlugin({
            dry: false, // If false, actually delete files rather than just simulating
            verbose: true, // Log the process of cleaning files to the console
            cleanStaleWebpackAssets: true, // Remove outdated assets from the output directory
            protectWebpackAssets: false, // Allow removal of webpack-specific assets
        }),
    ]
}