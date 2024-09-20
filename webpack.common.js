const path = require('path'); // Import path module for handling file paths
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin to generate HTML files
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Plugin to clean output directory
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Plugin to minimize CSS files

module.exports = {
    entry: "./src/client/index.js", // Entry point for the application

    module: {
        rules: [
            {
                test: /\.js$/, // Regex to test JavaScript files
                exclude: /node_modules/, // Exclude dependencies from processing
                loader: "babel-loader" // Use Babel to transpile JavaScript
            },
            {
                test: /\.s[ac]ss$/i, // Regex to test SCSS/SASS files
                use: [
                    "style-loader", // Inject CSS into the DOM
                    "css-loader", // Convert CSS into JavaScript
                    "sass-loader" // Compile SCSS/SASS to CSS
                ]
            }
        ]
    },

    optimization: {
        minimizer: [
            `...`, // Use default minimizers provided by Webpack
            new CssMinimizerPlugin(), // Minimize CSS files
        ],
        minimize: true, // Enable output minimization
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html", // Path to the HTML template
            filename: "./index.html" // Output filename for the generated HTML
        }),
        new CleanWebpackPlugin({
            dry: false, // Perform actual cleaning of the output directory
            verbose: true, // Log details of the cleaning process
            cleanStaleWebpackAssets: true, // Remove outdated assets
            protectWebpackAssets: false, // Allow cleaning of webpack assets
        })
    ]
};
