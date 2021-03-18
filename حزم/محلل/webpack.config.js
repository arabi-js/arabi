const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('webpack-clean-plugin');

let mode =
  process.argv[process.argv.indexOf('--mode') + 1] || 'production';

let dev = mode === 'development';

module.exports = {
  devtool: dev ? 'source-map' : false,
  target: "node",

  entry: path.resolve(__dirname, './src/index.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "commonjs",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
    ],
  },

  plugins: [
    new CleanPlugin(),
    new webpack.ProgressPlugin(),
  ],

  externals: [ /^@babel\/runtime/ ],
};
