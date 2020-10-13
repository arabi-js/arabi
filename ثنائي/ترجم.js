#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const arjsFile = process.env.FILENAME || process.argv[2];

if (!arjsFile) {
  console.error('لم يتم حديد ملف!\nno file specified!');
  return
}

ajsFile = path.resolve(__dirname, arjsFile);

const arabicCode = fs.readFileSync(arjsFile, { encoding: 'utf8' });
const arjs = require('../حزمة/arjs');
const jsCode = arjs.translate(arabicCode);

console.log(jsCode);
