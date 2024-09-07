const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    // Entry point for the client-side application
    entry: path.resolve(__dirname, 'src/client/index.js'),
    mode: 'production',

    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
        filename: '[name].[contenthash].bundle.js', // Bundle filename with content hash for caching
    },

    module: {
        rules: [
            {
                test: /\.js$/, // Target all JavaScript files
                exclude: /node_modules/, // Exclude third-party dependencies
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // Transpile ES6+ to ES5
                        plugins: ['@babel/plugin-transform-runtime'] // Enable re-use of Babel's injected helper code
                    }
                }
            },
            {
                test: /\.scss$/, // Target all SCSS files
                exclude: /node_modules/, // Exclude third-party dependencies
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    'css-loader', // Translates CSS into CommonJS modules
                    'sass-loader' // Compiles Sass to CSS
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/client/views/index.html'), // HTML template file
            filename: 'index.html', // Output HTML file
            minify: { // Minification options for production
                removeComments: true, // Remove comments to reduce file size
                collapseWhitespace: true, // Remove whitespace for a smaller file
            },
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].styles.css', // Output CSS filename with content hash
            chunkFilename: '[id].[contenthash].chunk.css' // Output chunk filename for async chunks
        }),

        new CleanWebpackPlugin({
            verbose: true, // Output logs for cleaning process
            cleanStaleWebpackAssets: true, // Automatically remove stale assets
            protectWebpackAssets: false, // Allow the removal of the entire output directory
            cleanOnceBeforeBuildPatterns: ['**/*'], // Clean all files in the output directory before a new build
        }),

        new WorkboxPlugin.GenerateSW({
            clientsClaim: true, // Take control of the page as soon as the service worker is active
            skipWaiting: true, // Activate the new service worker immediately
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // Limit cache size to 5MB
        }),
    ],

    optimization: {
        splitChunks: {
            chunks: 'all', // Split all types of chunks for better caching
            minSize: 20000, // Minimum chunk size before splitting
            maxSize: 70000, // Maximum chunk size before additional splitting
        },
        runtimeChunk: 'single', // Extract runtime code into a single file to improve long-term caching
    }
};
