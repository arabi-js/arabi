const path = require('path');
const babelOptions = require('./babel.config.js');

module.exports = {
  entry: path.resolve(__dirname, './خرج/مدخل.جس.js'),
  devtool: 'source-map',
  mode: 'development',
  output: {
    filename: './حزمة.js',
    path: path.resolve(__dirname, 'حزمة')
  },
  module: {
    rules: [
      {
        test: /.*\.js/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        },
        exclude: /node_modules|@arabi\/translate/
      }
    ]
  }
};
