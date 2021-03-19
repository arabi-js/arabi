#!node

const path = require('path');
const rimraf = require('rimraf');
const arabi = require('@arabi/core');
const arabiMaps = require("@arabi/maps");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

// const code = fs.readFileSync('./examples/2.arabi', { encoding: 'utf8' });

const env = process.env.NODE_ENV;
const OUTPUT = path.resolve(__dirname, './خارج');

rimraf.sync(OUTPUT);
arabi.translate({
  input: path.resolve(__dirname, './داخل'),
  output: OUTPUT,
  entry: path.resolve(__dirname, './داخل/مدخل.جس'),
  maps: arabiMaps.window,
}, /* parserOptions */ {
  // babel-parser options,,, enable using privates inside classes
  plugins: [
    "classProperties",
    "classPrivateMethods",
    "classPrivateProperties",
  ],
});
