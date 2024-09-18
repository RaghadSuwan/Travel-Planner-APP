const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',  // ملف الدخول الرئيسي
    mode: 'development',  // وضع التطوير
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: './dist',  // المجلد الذي سيعرض الملفات
    },
    module: {
        rules: [
            {
                test: /\.js$/,  // معالجة ملفات JavaScript
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',  // استخدام Babel لتحويل الأكواد الحديثة
                },
            },
            {
                test: /\.scss$/,  // معالجة ملفات SCSS/CSS
                use: ['style-loader', 'css-loader', 'sass-loader'],  // تحميل ودعم ملفات الـ SCSS
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',  // مسار ملف HTML
            filename: './index.html',
        }),
    ],
};
