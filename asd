#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const arCode = fs.readFileSync('./أمثلة/مثال-1.جس', { encoding: 'utf8' });

const arjs = require('./حزمة/arjs.js');

// const tree = arjs.parser.parse(arCode, { sourceType: "unambigious", createParenthesizedExpressions: true });
// console.log(JSON.stringify(tree.program.body[0], null, 2));

const translatedCode = arjs.translate(arCode, null, { sourceType: 'module', createParenthesizedExpressions: true });
console.log(translatedCode);
