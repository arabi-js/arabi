#!node

const path = require('path');
const rimraf = require('rimraf');
const arjs = require('../../حزمة/arjs');

// const code = fs.readFileSync('./examples/2.arjs', { encoding: 'utf8' });

const OUTPUT = path.resolve(__dirname, './خارج');

rimraf.sync(OUTPUT);

debugger;
console.log(arjs.translate({
  input: path.resolve(__dirname, './داخل'),
  output: OUTPUT,
  entry: path.resolve(__dirname, './داخل/مدخل.جس'),
  moduleType: 'commonjs',
}));
