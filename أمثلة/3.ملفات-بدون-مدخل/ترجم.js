#!node

const rimraf = require('rimraf');
const arabi = require('@arabi/core');
const arabiMaps = require('@arabi/maps');
const path = require('path');

// const code = fs.readFileSync('./examples/2.arabi', { encoding: 'utf8' });

const OUTPUT = path.resolve(__dirname, './خرج');
const INPUT = path.resolve(__dirname, './دخل');

rimraf.sync(OUTPUT);

arabi.translate({
  input: INPUT,
  output: OUTPUT,
  inputType: 'mixed',
  maps: arabiMaps.general
});
