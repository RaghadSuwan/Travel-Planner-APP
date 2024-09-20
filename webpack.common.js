const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); 

module.exports = {
    entry: "./src/client/index.js", // Entry point for the application

    module: {
        rules: [
            {
                test: /\.js$/, // Process JavaScript files
                exclude: /node_modules/, // Exclude dependencies
                loader: "babel-loader" // Transpile JavaScript with Babel
            },
            {
                test: /\.s[ac]ss$/i, // Process SCSS/SASS files
                use: [
                    "style-loader", // Inject CSS into the DOM
                    "css-loader", // Convert CSS to JS
                    "sass-loader" // Compile SASS to CSS
                ]
            }
        ]
    },

    optimization: {
        minimizer: [
            `...`, // Use default minimizers
            new CssMinimizerPlugin(), // Minimize CSS files
        ],
        minimize: true, // Enable output minimization
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html", // HTML template
            filename: "./index.html" // Output filename
        }),
        new CleanWebpackPlugin({
            dry: false, // Actually clean the output directory
            verbose: true, // Log cleaning details
            cleanStaleWebpackAssets: true, // Remove outdated assets
            protectWebpackAssets: false, // Allow cleaning webpack assets
        })
    ]
};
