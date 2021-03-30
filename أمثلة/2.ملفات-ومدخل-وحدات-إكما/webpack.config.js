const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './خرج/مدخل.جس.js'),
  devtool: 'source-map',
  mode: 'development',
  output: {
    filename: './حزمة.js',
    path: path.resolve(__dirname, 'حزمة')
  }
};
