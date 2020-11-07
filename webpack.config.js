const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CleanPlugin = require('webpack-clean-plugin');
let i = process.argv.indexOf('--mode');
let mode =
  process.env.MODE ||
  process.env.NODE_ENV ||
  (i > -1 ? process.argv[i + 1] : 'production');

let dev = mode === 'development' || mode === 'server';

module.exports = {
  devtool: dev ? 'source-map' : false,

  entry:
    mode === 'parser'
      ? './babel-parser/src'
      : {
          arjs: './مصدر/مدخل.js',
        },

  output:
    mode === 'parser'
      ? {
          filename: 'محلل.js',
          path: path.resolve(__dirname, './مصدر'),
          libraryTarget: 'commonjs',
        }
      : {
          filename: '[name].js',
          path: path.resolve(__dirname, './حزمة'),
          library: { 
            type: 'umd',
            name: '[name]',
          },
          globalObject:
            "(typeof global === 'object' ? global : typeof self === 'object' ? self : window)",
        },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          path.resolve(__dirname, 'مصدر/محلل.js'),
          path.resolve(__dirname, 'node_modules'),
        ],
      },
    ],
  },

  externals: [
    function ({ request }, callback) {
      if (
        mode === 'parser' && /^@babel\/runtime/.test(request) ||
        /^(?:path|fs)$/.test(request)
      ) {
        // Externalize to a commonjs module using the request path
        return callback(null, 'commonjs2 ' + request);
      }
      // Continue without externalizing the import
      callback();
    },
  ],

  plugins: [
    new CleanPlugin(),
    new webpack.DefinePlugin({
      TRANSLATOR_CODE: JSON.stringify(fs.readFileSync('./مصدر/مترجم/كود-المترجم.js', { encoding: 'utf8' })),
    })
  ],
};
