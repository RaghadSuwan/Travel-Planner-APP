// Import necessary dependencies
const common = require("./webpack.common.js"); // Import the common webpack configuration
const { merge } = require("webpack-merge"); // Utility to merge multiple webpack configurations
const path = require("path"); // Node.js module for working with file and directory paths
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Import the CSS minimizer plugin

module.exports = merge(common, {
    mode: "development", // Set mode to 'development' for better debugging and build speed
    devtool: "source-map", // Generate source maps to facilitate debugging

    module: {
        // Rules to process files
        rules: [
            {
                // Process Sass/SCSS files and convert them to CSS
                test: /\.s[ac]ss$/i, // Match .sass and .scss files
                use: [
                    "style-loader", // Injects CSS into the DOM via <style> tags
                    "css-loader", // Resolves @import and url() paths in CSS
                    "sass-loader" // Compiles Sass/SCSS to standard CSS
                ]
            }
        ]
    },

    output: {
        filename: 'bundle.js', // Name of the bundled JavaScript file
        path: path.resolve(__dirname, 'dist'), // Output directory for the build files
        libraryTarget: 'var', // Export the library in a variable format
        library: 'Client', // Name of the global variable holding the exported library
        clean: true, // Clean the output directory before each build
    },

    optimization: {
        minimize: true, // Enable file minimization for optimized builds
        minimizer: [
            // Extend existing minimizers
            new CssMinimizerPlugin(), // Minimize CSS output
        ],
    },
});