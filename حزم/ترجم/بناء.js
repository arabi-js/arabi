const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, './مصدر/مدخل.js'); // source file
const indexDest = path.resolve(__dirname, './مصدر/مدخل-مبني.js'); // destination
const translatorPath = path.resolve(__dirname, './مصدر/مترجم.js');
const requirePath = path.resolve(__dirname, './مصدر/استدعي.js');
const indentPH = '_@'; // indent placeholder

let translatorContent = fs.readFileSync(translatorPath, { encoding: 'utf8' });
let requireContent = fs.readFileSync(requirePath, { encoding: 'utf8' });
requireContent = requireContent.split('\n');
requireContent.shift();
requireContent = requireContent.join('\n');

// this is the same function used in the webpack config of arjs: https://github.com/scicave/javascript-in-arabic/blob/%D8%B1%D8%A6%D9%8A%D8%B3%D9%8A/webpack.config.js
function replaceIndents(s) {
  return s.replace(/^(  )+/gm, (m)=>new Array(m.length/2+1).fill('').join(indentPH));
}

let translatorCodeStr = JSON.stringify(replaceIndents(translatorContent.replace('exports.default = ', '')));
let requireCodeStr = JSON.stringify(replaceIndents(requireContent.replace('exports.default = ', '')));

const indexCode = fs.readFileSync(indexPath, { encoding: 'utf8' })
  .replace('TRANSLATOR_CODE', translatorCodeStr)
  .replace('REQUIRE_CODE', requireCodeStr)
  .replace('INDENT_PLACEHOLDER', indentPH);

fs.writeFileSync(indexDest, indexCode);
