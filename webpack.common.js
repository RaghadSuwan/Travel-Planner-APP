const path = require('path'); // Import path module for handling file paths
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin to generate HTML files
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Plugin to clean the output directory
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Plugin to minimize CSS files

module.exports = {
    entry: "./src/client/index.js", // Entry point for the application

    module: {
        rules: [
            {
                test: /\.js$/, // Test for JavaScript files
                exclude: /node_modules/, // Exclude node_modules from being processed
                loader: "babel-loader" // Use Babel loader to transpile JavaScript files
            },
            {
                test: /\.s[ac]ss$/i, // Test for SCSS/SASS files
                use: [
                    "style-loader", // Injects CSS into the DOM
                    "css-loader", // Translates CSS into CommonJS modules
                    "sass-loader" // Compiles SCSS/SASS into CSS
                ]
            }
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'all', // Enable code splitting for all chunks
        },
        minimizer: [
            `...`, // Default Webpack minimizers
            new CssMinimizerPlugin(), // Minimize CSS files
        ],
        minimize: true, // Enable file minimization for smaller output
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html", // Path to HTML template
            filename: "./index.html" // Output filename for the generated HTML
        }),
        new CleanWebpackPlugin({
            dry: false, // Actually perform the cleaning of the output directory
            verbose: true, // Log cleaning actions
            cleanStaleWebpackAssets: true, // Remove outdated assets
            protectWebpackAssets: false, // Allow cleaning Webpack assets
        })
    ]
};
