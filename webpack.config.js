const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    entry: './src/index.ts', // your main TS entry
    devtool: isProd ? false : 'source-map', // no source map in production
    module: {
      rules: [
        { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
        { test: /\.(png|jpg|gif|webp|mp3|wav|ogg|json)$/i, type: 'asset/resource' },
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
    //   new CopyPlugin({
    //     patterns: [
    //       { from: 'src/assets', to: 'assets' }, // copy all assets to dist/assets
    //     ],
    //   }),
    //   ...(isProd
    //     ? [
    //         new BrotliPlugin({
    //           asset: '[path].br[query]',
    //           test: /\.(js|css|html|png|mp3|wav|ogg)$/,
    //           threshold: 10240,
    //           minRatio: 0.8,
    //         }),
    //       ]
    //     : []),
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
};
