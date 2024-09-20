// Import necessary dependencies
const webpack = require("webpack");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
    mode: "development", // Set mode to 'development' for better debugging and performance during dev
    devtool: "source-map", // Enable source maps for easier debugging of code in the browser
    devServer: {
        static: path.resolve(__dirname, 'dist'), // Serve content from the 'dist' directory
        port: 8080, // The development server will run on port 8080
        hot: true, // Enable hot reloading for immediate updates in the browser
        open: true, // Automatically open the browser when the server starts
        client: {
            overlay: true, // Show errors/warnings in the browser window
        },
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i, // Match Sass/SCSS files
                use: [
                    "style-loader", // Inject CSS into the DOM
                    "css-loader",   // Translate CSS into CommonJS
                    "sass-loader"   // Compile Sass to CSS
                ]
            }
        ]
    },
    output: {
        filename: 'bundle.js', // Name of the output bundle file
        path: path.resolve(__dirname, 'dist'), // Output directory
        clean: true, // Clean the output directory before every build
    },
});
