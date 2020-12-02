const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('webpack-clean-plugin');

let i,
  mode =
    process.env.MODE ||
    process.env.NODE_ENV ||
    ((i = process.argv.indexOf('--mode')) > -1 ? process.argv[i + 1] : 'production')
;

let dev = mode === 'development';
let analyze = mode === 'analyze';

module.exports = {
  devtool: dev ? 'source-map' : false,
  target: "node",
  context: path.resolve(__dirname, 'مصدر'),
  entry: {
    arjs: './مدخل.js',
  },
  output: {
    path: path.resolve(__dirname, 'حزمة'),
    libraryTarget: "commonjs",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new CleanPlugin(),
    analyze && new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()
  ].filter(Boolean),
  externals: [ /^@babel\/runtime\-corejs/ ],
  // experiments: { topLevelAwait: true },

};


