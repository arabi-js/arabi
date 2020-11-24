/* 
 * this file contains some helper functions imported in more than module
 */

import fs from 'fs';
import path from 'path';
import handler from './مترجم/مدخل';
import arjsTranslate from 'arjs-translate';

export function addToScope(id, type: "lex" | "var") {
  const _ids = getIds(id);
  if (type === 'lex') handler.scope.addLexicals(_ids);
  else handler.scope.addVars(_ids);
}

export function getIds(id) {
  let _ids = [];
  switch(id.type) {
    case "Identifier":
      _ids.push(id.name);
      break;
    case "ObjectPattern":
      for(let p of id.properties) {
        _ids.concat(getIds(p.value));
      }
      break;
    case "ArrayPattern":
      for(let e of id.elements) {
        _ids.concat(getIds(e));
      }
      break;
  }
  return _ids;
}

/**
 * Check a string value to a tester such as :
 * RegExp or another string value or function receiving one arg.
 * You can pass array of testers, the result is true if one succeeded.
 */
export function test(t, v) {
  if (t instanceof Array) return typeof t.find(_=>test(_, v)) !== 'undefined';
  if (t instanceof Function) return t(v);
  if (t instanceof RegExp) return t.test(v);
  if (typeof t === 'string') return t === v;
  throw 'unexpected test, it has to be either string, regex, function, or even arry of the previous mentioned!';
}

export function resolve(r, v) {
  if (r instanceof Function) return r(v);
  if (typeof r === 'string') return r;
  throw 'unexpected resolver, it has to be either string, function!';
}

export function debug() {
  if (handler.options.debug) console.log(...arguments);
}

export function getRandomName() {
  return new Date().getTime().toString(32);
}

//// #########  generating code **********************************
//// #########  generating code **********************************
//// #########  generating code **********************************
//// #########  generating code **********************************

export const translatorCode = arjsTranslate.code;

export function getTranslatorCode() {
  return (handler.options.runtime ? (
    handler.options.moduleType === 'es6'
    ? "import { translate as __arjs__translate__ } from 'arjs-translate'"
    : "const { translate: __arjs__translate__ } = require('arjs-translate')"
  ) + handler.semi : translatorCode);
}

export function getVarsTranslatorCode(map) {
  let code = [];
  for (let p in map) {
    let v = 'string' === typeof map[p] ? map[p] : `__arjs__translate__(${map[p][0]}, ${JSON.stringify(map[p][1])})`; 
    code.push(`var ${p} = ${v}` + handler.semi);
  }
  return code.join('\n');
}

export function getGlobalTranslatorCode(map) {
  let code = [];
  for (let p in map) {
    let v = 'string' === typeof map[p] ? map[p] : `__arjs__translate__(${map[p][0]}, ${JSON.stringify(map[p][1])})`; 
    code.push(`${handler.options.globalObject}[${JSON.stringify(p)}] = ${v}` + handler.semi);
  }
  return code.join('\n');
}

export function translateModule(_m, outputDir) {
  m = handler.maps.modules[_m];
  let filename = path.resolve(outputDir, _m + '.arjs.js');
  let mtcode = handler.options.moduleType === 'es6' ? 
    arjsTranslate.es6ModuleTranslationCode : arjsTranslate.commonjsModuleTranslationCode;

  let code =
    mtcode
    .replace('MODULE_NAME', m[0])
    .replace('MODULE_MAP', JSON.stringify(m[1]));

  fs.writeFileSync(filename, code);
}

