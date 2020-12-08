#!node

const rimraf = require('rimraf');
const arjs = require('../../حزمة/arjs');
const path = require('path');

// const code = fs.readFileSync('./examples/2.arjs', { encoding: 'utf8' });

const OUTPUT = path.resolve(__dirname, './خارج');
const INPUT = path.resolve(__dirname, './داخل');

rimraf.sync(OUTPUT);

console.log(arjs.translate({
  input: INPUT,
  output: OUTPUT,
  moduleType: 'mixed',
}));

