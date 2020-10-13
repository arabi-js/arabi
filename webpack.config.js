const path = require('path');
const CleanPlugin = require('webpack-clean-plugin')

let mode = process.env.MODE || (i = process.argv.indexOf('--mode')) ? process.argv[i+1] : null || 'production';

module.exports = {
  devtool: mode === 'development' ? 'source-map' : false,

  entry: {
    arjs: "./مصدر/مدخل.js",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./حزمة"),
    libraryTarget: "umd",
    library: "[name]",
    globalObject: "(typeof global === 'object' ? global : typeof self === 'object' ? self : window)",
  },

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },

  plugins: [
    new CleanPlugin()
  ]
};

