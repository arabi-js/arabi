import * as parser from '../babel-parser/src/';
import handler from './مجمع/مدخل.js';

// let parser = { parse() { console.log('parsing !!!') } }

export function translate(arabicCode) {
  return handler(parser.parse(arabicCode).body);
}

export { parser };
