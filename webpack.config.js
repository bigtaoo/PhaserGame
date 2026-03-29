const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const webpack = require('webpack');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const targetPlatform = env.TARGET || 'web';

  if (targetPlatform === 'wechat')
  {
    return {
      target: 'web',
      mode: isProd ? 'production' : 'development',
      entry: './src/wechatIndex.ts',
      devtool: false, // no source maps in WeChat
      module: {
        rules: [
          { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
          {
            test: /\.(png|jpg|gif|webp|mp3|wav|ogg|json)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'assets/[name][ext]', // keep names for WeChat
            },
          },
          // ✅ remove CSS loaders! WeChat subcontext/game does not support style-loader
        ],
      },
      resolve: { extensions: ['.ts', '.js'] },
      output: {
        filename: 'game.js',
        path: path.resolve(__dirname, 'wechatbuild'),
        clean: true,
        libraryTarget: 'commonjs2', // required for WeChat
        publicPath: '', 
      },
      plugins: [
        new webpack.DefinePlugin({
          TARGET: JSON.stringify(targetPlatform),
        }),
      ],
      optimization: {
        minimize: false, // no minify for WeChat
        splitChunks: false,
        runtimeChunk: false,
      },
    }
  }
  else
  {
    return {
      target: 'web',
      mode: isProd ? 'production' : 'development',
      entry: './src/index.ts', // your main TS entry
      devtool: isProd ? false : 'source-map', // no source map in production
      module: {
        rules: [
          { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
          { test: /\.(png|jpg|gif|webp|mp3|wav|ogg|json)$/i, type: 'asset/resource',
            generator: {
              filename: targetPlatform === 'wechat'
                ? 'assets/[name][ext]'  // keep original names
                : 'assets/[name].[contenthash][ext]' // hash for web
            }
          },
          { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
        ],
      },
      resolve: { extensions: ['.ts', '.js'] },
      output: {
        filename: 'bundle.js', // main bundle
        path: path.resolve(__dirname, 'dist'),
        clean: true, // clean old files
      },
      plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new webpack.DefinePlugin({
          TARGET: JSON.stringify(targetPlatform)
        }),
      ],
      devServer: {
        static: [
          { directory: path.join(__dirname, 'dist') , publicPath: '/'},   // serve built files
          { directory: path.join(__dirname, 'src/assets'), publicPath: '/assets' }, // serve source assets for dev
        ],
        hot: true,
        open: true,
        port: 8080,
      },
      optimization: {
        minimize: isProd, // minify for production
      },
    };
  }
};
