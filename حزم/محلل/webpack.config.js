const path = require('path');
const CleanPlugin = require('webpack-clean-plugin');

let mode =
  process.argv[process.argv.indexOf('--mode') + 1] || 'production';


let dev = mode === 'development';

module.exports = {
  devtool: dev ? 'source-map' : false,
  target: "node",
  entry: path.resolve(__dirname, './مصدر/index.js'),
  output: {
    path: path.resolve(__dirname, 'توزيعة'),
    libraryTarget: "commonjs",
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ],
  },
  plugins: [ new CleanPlugin() ],
  externals: [ /^@babel\/runtime/ ],
};
