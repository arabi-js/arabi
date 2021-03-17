const path = require('path');
const fs = require('fs');
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

  entry: {
    // arabi: './مدخل.js',
    arabi: path.resolve(__dirname, './مصدر/مدخل.js'),
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
    new CleanPlugin(),
    new webpack.ProgressPlugin(),
    analyze && new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()
  ].filter(Boolean),

  externals: [ /^@babel\/runtime/ ],
};

let es6ModuleTranslationPath = path.resolve(__dirname, 'مصدر/أكواد/أكواد-ترجمة-الوحدة.مخطوطة_إكما6.js');
let comModuleTranslationPath = path.resolve(__dirname, 'مصدر/أكواد/أكواد-ترجمة-الوحدة.جس-الشائعة.js');
let es6ModuleTranslationCode = fs.readFileSync(es6ModuleTranslationPath, { encoding: 'utf8' });
let comModuleTranslationCode = fs.readFileSync(comModuleTranslationPath, { encoding: 'utf8' });

// it is the same replaceIndent in @arabi/translate/build.js
function replaceIndents(s) {
  return s.replace(/^( {2})+/gm, (m)=>new Array(m.length/2+1).fill('').join('_@_@indent@_@_'));
}

es6ModuleTranslationCode = JSON.stringify(replaceIndents(es6ModuleTranslationCode));
comModuleTranslationCode = JSON.stringify(replaceIndents(comModuleTranslationCode));

module.exports.plugins.push(new webpack.DefinePlugin({
  ES6_MODULE_TRANSLATION_CODE: es6ModuleTranslationCode,
  COMMONJS_MODULE_TRANSLATION_CODE: comModuleTranslationCode
}));
