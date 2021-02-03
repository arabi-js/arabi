#!node

const path = require('path');
const fs = require('fs');
const arabi = require('../../حزمة/arabi');
const arabiMaps = require('@arabi/maps');

// const code = fs.readFileSync('./examples/2.arabi', { encoding: 'utf8' });

const OUTPUT = path.resolve(__dirname, './donut.js');

const map = arabiMaps.commonjs;

map.global['عملية'] = ['process', {
  خارج: ['stdout', { اكتب: 'write' }],
}];

// delete the exsiting file
fs.unlinkSync(OUTPUT);

arabi.translate({
  input: path.resolve(__dirname, './طارة.جس'),
  output: OUTPUT,
  maps: map,
  globalObject: "global"
});
