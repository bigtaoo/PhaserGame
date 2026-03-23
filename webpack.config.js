const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
            { test: /\.(png|jpg|gif|mp3|wav|ogg)$/i, type: 'asset/resource' },
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
        ],
    },
    resolve: { extensions: ['.ts', '.js'] },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|png|mp3)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
    devServer: {
        static: './dist',
        hot: true,
        open: true,
    }
};
