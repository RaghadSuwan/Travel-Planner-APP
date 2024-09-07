const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    // Entry point for the application
    entry: path.join(__dirname, 'src/client/index.js'),

    // Set the mode to development for unminified code and detailed error messages
    mode: 'development',

    // Source map for debugging with fast rebuilds
    devtool: 'eval-source-map',

    // Detailed build stats for better insight into the build process
    stats: 'detailed',

    output: {
        // Output directory for the bundled files
        path: path.resolve(__dirname, 'dist'),
        // Bundle filename format
        filename: '[name].bundle.js',
    },

    module: {
        rules: [
            {
                // Apply Babel transpilation to .js files
                test: /\.js$/,
                exclude: /node_modules/, // Exclude dependencies from transpilation
                use: 'babel-loader',
            },
            {
                // Process .scss files into CSS
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    'css-loader', // Translates CSS into CommonJS
                    'sass-loader', // Compiles Sass to CSS
                ],
            },
        ],
    },

    plugins: [
        // Generates an HTML file with the bundled assets injected
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/client/views/index.html'),
            filename: 'index.html',
        }),

        // Extracts CSS into separate files
        new MiniCssExtractPlugin({
            filename: '[name].styles.css', // CSS filename format
            chunkFilename: '[id].chunk.css', // CSS chunk filename format
        }),

        // Cleans up the output directory before each build
        new CleanWebpackPlugin({
            dry: true, // Simulates the removal of files
            verbose: true, // Outputs logs for the clean process
            cleanStaleWebpackAssets: true, // Removes stale assets
            protectWebpackAssets: false, // Allows removal of the entire output directory
        }),

        // Generates a service worker to cache assets for offline use
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true, // Takes control of the page as soon as the service worker is active
            skipWaiting: true, // Forces the waiting service worker to become active
        }),

        // Enables hot module replacement for a better development experience
        new webpack.HotModuleReplacementPlugin(),
    ],

    devServer: {
        // Serve static files from the 'dist' directory
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true, // Enable hot module replacement
        compress: true, // Enable gzip compression
        port: 8080, // Dev server port
        open: true, // Automatically opens the browser on server start
    },
};
