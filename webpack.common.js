const htmlWebpackPlugin = require("html-webpack-plugin"); // Plugin to generate an HTML file from a template
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Plugin to clean the output directory before each build
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Plugin to minimize CSS files

module.exports = {
    entry: "./src/client/index.js", // Entry point where webpack starts bundling

    module: {
        rules: [
            {
                test: /\.js$/, // Match JavaScript files
                exclude: /node_modules/, // Exclude files in the 'node_modules' folder
                loader: "babel-loader" // Use Babel to transpile modern JavaScript
            },
        ]
    },

    optimization: {
        minimizer: [
            `...`, // Keep default minimizers
            new CssMinimizerPlugin(), // Minimize CSS files
        ],
        minimize: true, // Enable minification of the output
    },

    plugins: [
        new htmlWebpackPlugin({
            template: "./src/client/views/index.html", // Path to the HTML template
            filename: "./index.html" // Name of the generated HTML file
        }),
        new CleanWebpackPlugin({
            dry: false, // Enable actual deletion of files
            verbose: true, // Log the cleaning process to the console
            cleanStaleWebpackAssets: true, // Remove outdated assets
            protectWebpackAssets: false, // Allow removal of webpack-specific assets
        }),
    ]
};
