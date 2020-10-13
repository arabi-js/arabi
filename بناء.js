#!node

const fs = require('fs');
const path = require('path');
const pegjs = require('pegjs');

const DEST = './مصدر';
const OUTPUT_FILE = path.resolve(DEST, './محلل.js');

function generateFromGrammar() {
  return pegjs.generate(
    fs.readFileSync('./قواعد.pegjs').toString('utf8'), {
      output: 'source',
      format: 'commonjs'
    });
}

function generateTheLib(){
  (!fs.existsSync(DEST) && fs.mkdirSync(DEST));
  const generatedCode = generateFromGrammar();
  fs.writeFileSync(OUTPUT_FILE, generatedCode);
}

generateTheLib();
