const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CleanPlugin = require('webpack-clean-plugin');

// I dont't know the babel-loader is not working for
// the files inside node_modules, it is working with the
// right options they are passed explicitly
const babelOptions = require('./.babelrc');

let mode = process.argv[process.argv.indexOf('--mode') + 1] || 'production';

let dev = mode === 'development';

module.exports = {
  devtool: dev ? 'source-map' : false,
  target: 'node',
  entry: { arabi: path.resolve(__dirname, './مصدر/مدخل.js') },
  output: {
    path: path.resolve(__dirname, 'حزمة'),
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader', options: babelOptions },
      },
    ],
  },
  plugins: [new CleanPlugin()],
  externals: [/^@babel\/runtime/],
};

let es6ModuleTranslationPath = path.resolve(__dirname, 'مصدر/أكواد/أكواد-ترجمة-الوحدة.مخطوطة_إكما6.js');
let comModuleTranslationPath = path.resolve(__dirname, 'مصدر/أكواد/أكواد-ترجمة-الوحدة.جس-الشائعة.js');
let es6ModuleTranslationCode = fs.readFileSync(es6ModuleTranslationPath, { encoding: 'utf8' });
let comModuleTranslationCode = fs.readFileSync(comModuleTranslationPath, { encoding: 'utf8' });

// it is the same replaceIndent in @arabi/translate/build.js
function replaceIndents(s) {
  return s.replace(/^( {2})+/gm, (m) => new Array(m.length / 2 + 1).fill('').join('_@_@indent@_@_'));
}

es6ModuleTranslationCode = JSON.stringify(replaceIndents(es6ModuleTranslationCode));
comModuleTranslationCode = JSON.stringify(replaceIndents(comModuleTranslationCode));

module.exports.plugins.push(
  new webpack.DefinePlugin({
    ES6_MODULE_TRANSLATION_CODE: es6ModuleTranslationCode,
    COMMONJS_MODULE_TRANSLATION_CODE: comModuleTranslationCode,
  })
);
