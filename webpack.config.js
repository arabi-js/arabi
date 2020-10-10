const path = require('path');
const CleanPlugin = require('webpack-clean-plugin')

module.exports = {
  entry: {
    arjs: "./مصدر/مدخل.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./حزمة"),
    library: "[name]",
    libraryTarget: "umd",
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

