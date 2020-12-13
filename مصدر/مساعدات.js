/* 
 * this file contains some helper functions imported in more than module
 */

import fs from 'fs';
import path from 'path';
import handler from './مترجم/مدخل';
import arjsTranslate from 'arjs-translate';
import { stringify } from 'circular-json-es6';
import type { Codes } from './أنواع';

export function addToScope(ids, type: "lex" | "var") {
  const _ids = Array.isArray(ids)
    ? ids.map(i=>getIds(i)).flat(1) // return array of ids, rather than array of arrays
    : getIds(ids);
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

export function testFile(fpath) {
  return (
    (!handler.options.patterns || test(handler.options.patterns, fpath)) &&
    (!handler.options.ignores || !test(handler.options.ignores, fpath))
  );
}

export function testGlobal(fpath) {
  return (
    !handler.options.globalIgnores || !test(handler.options.globalIgnores, fpath)
  );
}

export function checkInput(p) {
  if (!fs.existsSync(p)) handler.error("Invalid Option", "input doesn't exists:", input);
}

export function checkOutput(p) {
  if (
    fs.existsSync(p) &&
    !(fs.statSync(p).isDirectory() && !fs.readdirSync(p))
  )
    // something exists in the path of options.output, and is not a void dir
    handler.error("Invalid Option", "can't overwrite an existing file or un-empty dir:", p);
}

export function resolve(r, v) {
  if (r instanceof Function) return r(v);
  if (typeof r === 'string') return r;
  throw 'unexpected resolver, it has to be either string, function!';
}

export function walk(dir) {
  let tree = { path: dir, dirs: [], files: [] };
  let list = fs.readdirSync(dir);
  for (let i = 0; i < list.length; i++) {
    let p = list[i];
    p = path.resolve(dir, p);
    if (fs.statSync(p).isDirectory()) {
      tree.dirs.push(walk(p));
    } else if (testGlobal(p)) {
      // it is the file that passed the test
      tree.files.push(p);
    }
  }
  return tree;
}

export function log() {
  if (handler.options.debug) console.log(log.indent, ...arguments);
}

log.increaseIndent = () => log.indentCount++;
log.decreaseIndent = () => log.indentCount++;
Object.defineProperty(log, 'indentCount', {
  get() { return this.__ic },
  set(v) {
    this.__ic = v;
    this.indent = new Array(v*2).fill(' ').join(''); 
  }
});
log.indentCount = 0;

export function getRandomName() {
  return new Date().getTime().toString(32);
}

// #########  generating code **********************************
// #########  generating code **********************************
// #########  generating code **********************************
// #########  generating code **********************************

export const codes: Proxy<Codes> = new Proxy({
  translatorCode: arjsTranslate.code,
  translateRequireCode: arjsTranslate.translateRequireCode,
  es6ModuleTranslationCode: ES6_MODULE_TRANSLATION_CODE,
  commonjsModuleTranslationCode: COMMONJS_MODULE_TRANSLATION_CODE,
}, {
  get(t, p) {
    return t[p].replace(/_@_@indent@_@_/g, handler.options.indent)
      .split('\n').map(l=>handler.__lineHead+l).join('\n');
  }
})

export function getTranslatorCode() {
  if (handler.options.runtime) {
    handler.arjsTranslateImports.push(['translate', handler.tfnName]);
    return;
  }
  return codes.translatorCode;
}

export function getTranslateRequireCode() {
  if (handler.options.runtime) {
    handler.arjsTranslateImports.push(['translateRequire', handler.trfnName]);
    return;
  }
  return codes.translateRequireCode;
}

export function getVarsTranslatorCode(map) {
  let code = [], prototypes = [];
  debugger;
  for (let p in map) {
    let v;
    if (typeof map[p] === 'string') v = map[p]; 
    else {
      let __enName = map[p][0];
      let __map = map[p][1];
      let __options = Object.assign({},map[p][2]);
      if (__options?.constructMap) prototypes.push(getPrototypeTranslator(__enName, __map, __options));
      if (__options && Object.keys(__options).length === 1) __options = null;
      if (__map || __options)
        v = 'string' === typeof map[p] ? map[p] : `${handler.tfnName}(${__enName}, ${stringify(__map)}, ${stringify(__options)})`; 
    }
    code.push(handler.indent + `var ${p} = ${v}` + handler.eol);
  }
  return code.join('') + prototypes.join('');
}

function getPrototypeTranslator(__enName, __map, __options) {
  // TODO: evaluate from arjs-translate when `options.runtime`, it has to be has to be nearly isolated and independent;
  // TODO: take care of the properties' descriptor
  let constructMap = __options.constructMap;
  __options.constructMap = null;
  let prototypeCode = handler.voidline + handler.indent + '(()=>{' + handler.nl;
  handler.increaseIndent();
  for (let pp in constructMap) {
    let pmap = constructMap[pp];
    let descriptor;
    if (typeof pmap === 'string') {
      descriptor = [
        "{",
        `get: function(){ return this["${pmap}"] },`,
        `set: function(v){ return this["${pmap}"] = v },`,
        "}",
      ].join('');
    } else {
      let _name = pmap[0];
      let _map = pmap[1];
      let _options = pmap[2]; 
      descriptor = [
        "{",
        `get: function(){ return ${handler.tfnName}(this["${_name}"], ${stringify(_map)}, ${stringify(_options)}) },`,
        `set: function(v){ return this["${_name}"] = v },`,
        "}",
      ].join('');
    }
    prototypeCode += handler.indent +
      `Object.defineProperty(${__enName}.prototype, "${pp}", ${descriptor})` + handler.eol;
  }
  handler.decreaseIndent();
  // end of line and new line, so we may have a semicolon + \n + \n
  prototypeCode += handler.indent + '})()' + handler.eol;
  return prototypeCode;
}

export function getGlobalTranslatorCode(map) {
  let code = [], prototypes = [];
  for (let p in map) {
    let c, m = map[p];
    if (typeof m === 'string') c = m;
    else {
      let __enName = m[0];
      let __map = m[1];
      let __options = m[2];
      // here we have to define new properties with arabic names to the built-in prototypes such as Object.prototype 
      if (__options?.constructMap) prototypes.push(getPrototypeTranslator(__enName, __map, __options));
      if (__options && Object.keys(__options).length === 1) __options = null;
      if (__map || __options) {
        c = `${handler.tfnName}(${__enName}, ${stringify(__map)}, ${stringify(__options)})`;
      } else c = enName;
    }
    code.push(handler.indent + `${handler.options.globalObject}["${p}"] = ${c}` + handler.eol);
  }
  return code.join('') + prototypes.join('');
}

export function getDeclareModuleTMapsCode() {
  let code = '';
  code += handler.indent + `${handler.options.globalObject}.__arjs__modules__tmap__ = ${stringify(handler.maps.modules)}` + handler.eol;
  return code;
}

export function getArjsTranslateImportCode() {
  if (handler.arjsTranslateImports.length) {
    let trans;
    let isModule = handler.options.moduleType === 'es6';
    if (isModule) trans = (i)=>i[0] === i[1] ? i[0] : `${i[0]} as ${i[1]}`;
    else trans = (i)=>i[0] === i[1] ? i[0] : `${i[0]}: ${i[1]}`;
    let imports = handler.arjsTranslateImports.map(trans).join(', ');
    
    let code = (
      !isModule ?
      `const { ${imports} } = require('arjs-translate')` : 
      `import { ${imports} } from 'arjs-translate'`
      );
    return handler.indent + code + handler.eol;
  }
}

export function translateModule(_m) {
  let m = handler.maps.modules[_m];
  let enModuleName = typeof m === 'string' ? m : m[0]; 
  let filename = path.resolve(handler.tmodulesDir, enModuleName + '.arjs.js');
  let mtcode = handler.options.moduleType === 'es6' ? 
    codes.es6ModuleTranslationCode : codes.commonjsModuleTranslationCode;

  let code = mtcode
    .replace('MODULE_NAME', m[0])
    .replace('MODULE_MAP', stringify(m[1]))
    .replace('MAP_OPTIONS', stringify(m[2]));

  fs.writeFileSync(filename, code);
  return filename;
}
