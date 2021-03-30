#!node

const path = require('path');
const rimraf = require('rimraf');
const arabi = require('@arabi/core');
const arabiMaps = require('@arabi/maps');

// const code = fs.readFileSync('./examples/2.arabi', { encoding: 'utf8' });

const OUTPUT = path.resolve(__dirname, './خرج');

rimraf.sync(OUTPUT);

arabi.translate({
  input: path.resolve(__dirname, './دخل'),
  output: OUTPUT,
  entry: path.resolve(__dirname, './دخل/مدخل.جس'),
  // after building these ESModules, I want to run with node
  maps: arabiMaps.commonjs,
  globalObject: 'global'
});
