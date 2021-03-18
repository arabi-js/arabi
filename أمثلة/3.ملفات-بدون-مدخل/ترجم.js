#!node

const rimraf = require('rimraf');
const arabi = require('../../حزمة/arabi');
const arabiMaps = require('@arabi/maps');
const path = require('path');

// const code = fs.readFileSync('./examples/2.arabi', { encoding: 'utf8' });

const OUTPUT = path.resolve(__dirname, './خارج');
const INPUT = path.resolve(__dirname, './داخل');

rimraf.sync(OUTPUT);

arabi.translate({
  input: INPUT,
  output: OUTPUT,
  inputType: 'mixed',
  maps: arabiMaps.general 
});

