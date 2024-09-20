const webpack = require("webpack");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
    mode: "development", // Development mode for easier debugging
    devtool: "source-map", // Enable source maps
    devServer: {
        static: path.resolve(__dirname, 'dist'), // Serve from 'dist' directory
        port: 8080, // Development server port
        hot: true, // Enable hot module replacement
        open: true, // Open browser on server start
        client: {
            overlay: true, // Show errors/warnings in the browser
        },
    },
    output: {
        filename: 'bundle.js', // Bundle output filename
        path: path.resolve(__dirname, 'dist'), // Output directory
        clean: true, // Clean output directory before build
    },
});
