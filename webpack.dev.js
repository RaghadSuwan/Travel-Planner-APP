const webpack = require("webpack"); // Import Webpack
const common = require("./webpack.common.js"); // Import common configuration
const { merge } = require("webpack-merge"); // Import merge function to combine configurations
const path = require("path"); // Import path module for handling file paths

module.exports = merge(common, {
    mode: "development", // Set mode to development for easier debugging
    devtool: "source-map", // Enable source maps for better error tracking
    devServer: {
        static: path.resolve(__dirname, 'dist'), // Serve static files from the 'dist' directory
        port: 8080, // Set the development server port
        hot: true, // Enable hot module replacement for live updates
        open: true, // Automatically open the browser when the server starts
        client: {
            overlay: true, // Show errors/warnings as an overlay in the browser
        },
    },
    output: {
        filename: 'bundle.js', // Name of the output bundle file
        path: path.resolve(__dirname, 'dist'), // Output directory for the bundle
        clean: true, // Clean the output directory before each build
    },
});
