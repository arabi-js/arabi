#!node

const path = require('path');
const rimraf = require('rimraf');
const arabi = require('@arabi/core');
const arabiMaps = require('@arabi/maps');

// const code = fs.readFileSync('./examples/2.arabi', { encoding: 'utf8' });

const OUTPUT = path.resolve(__dirname, './خرج');

rimraf.sync(OUTPUT);
arabi.translate(
  {
    input: path.resolve(__dirname, './دخل'),
    output: OUTPUT,
    entry: path.resolve(__dirname, './دخل/مدخل.جس'),
    maps: arabiMaps.window
  },
  /* parserOptions */ {
    // babel-parser options,,, enable using privates inside classes
    plugins: ['classProperties', 'classPrivateMethods', 'classPrivateProperties']
  }
);
