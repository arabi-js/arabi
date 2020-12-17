// @flow

/* 
 * this file contains some helper functions imported in more than module
 */

import fs from 'fs';
import path from 'path';
import manager from './مترجم/مدير-الترجمة'; 
import arabiTranslate from '@arabi/translate';
import { stringify as thatStringify } from 'flatted';
import { isIdentifierName } from './babel-parser/src/helper-validator-identifier/identifier';
import type { Codes } from './أنواع';

export function addToScope(ids, type: "lex" | "var") {
  const _ids = Array.isArray(ids)
    ? ids.map(i=>getIds(i)).flat(1) // return array of ids, rather than array of arrays
    : getIds(ids);
  if (type === 'lex') manager.scope.addLexicals(_ids);
  else manager.scope.addVars(_ids);
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

export function stringify(obj) {
  if (
    typeof obj !== 'object' &&
    typeof obj !== 'function' ||
    obj === null
  ) return JSON.stringify(obj); // it is literal
  if (manager.enableParseStringified)
    return `${manager.parseStringifiedFunctionName}(${JSON.stringify(thatStringify.apply(thatStringify, arguments))})`;
  else
    return thatStringify.apply(thatStringify, arguments);
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
    (!manager.options.patterns || test(manager.options.patterns, fpath)) &&
    (!manager.options.ignores || !test(manager.options.ignores, fpath))
  );
}

export function testGlobal(fpath) {
  return (
    !manager.options.globalIgnores || !test(manager.options.globalIgnores, fpath)
  );
}

export function checkInput(p) {
  if (!fs.existsSync(p)) manager.error("Invalid Option", "input doesn't exists:", p);
}

export function checkOutput(p) {
  if (
    fs.existsSync(p) &&
    !(fs.statSync(p).isDirectory() && !fs.readdirSync(p))
  )
    // something exists in the path of options.output, and is not a void dir
    manager.error("Invalid Option", "can't overwrite an existing file or un-empty dir:", p);
}

export function resolve(r, v) {
  if (r instanceof Function) return r(v);
  if (typeof r === 'string') return r;
  throw 'unexpected resolver, it has to be either string, function!';
}

export function walk(dir) {
  let tree = { path: dir, dirs: [], files: [] };
  let list = fs.readdirSync(dir, { withFileTypes: true });
  for (let i = 0; i < list.length; i++) {
    let p = list[i];
    let _p = path.resolve(dir, p.name);
    if (p.isDirectory()) {
      tree.dirs.push(walk(_p));
    } else if (testGlobal(_p)) {
      // it is the file that passed the test
      tree.files.push(_p);
    }
  }
  return tree;
}

export function log() {
  if (manager.options.debug) console.log(log.indent, ...arguments);
}

log.increaseIndent = () => log.indentCount++;
log.decreaseIndent = () => log.indentCount--;
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
  translatorCode: arabiTranslate.code,
  translateRequireCode: arabiTranslate.translateRequireCode,
  // eslint-disable-next-line no-undef
  es6ModuleTranslationCode: ES6_MODULE_TRANSLATION_CODE,
  // eslint-disable-next-line no-undef
  commonjsModuleTranslationCode: COMMONJS_MODULE_TRANSLATION_CODE,
}, {
  get(t, p) {
    return t[p].replace(/_@_@indent@_@_/g, manager.options.indent)
      .split('\n').map(l=>manager.__lineHead+l).join('\n');
  }
})

export function getTranslatorCode() {
  if (manager.options.runtime) {
    manager.addTopImport('@arabi/translate', ['translate', manager.translatorFunctionName]);
    return;
  }
  return codes.translatorCode;
}

export function getTranslateRequireCode() {
  if (manager.options.runtime) {
    manager.addTopImport('@arabi/translate', ['translateRequire', manager.translateRequireFunctnionName]);
    return;
  }
  return codes.translateRequireCode;
}

export function getVarsTranslatorCode(map) {
  let code = [], prototypes = [];
  for (let p in map) {
    let c, m = map[p];
    if (typeof m === 'string') c = getMemberFromGlobal(m); 
    else {
      let __enName = m[0];
      let __map = m[1];
      let __options = Object.assign({},m[2]);
      __enName = getMemberFromGlobal(__enName);
      if (__options?.constructMap) prototypes.push(getPrototypeTranslator(__enName, __map, __options));
      if (__options && Object.keys(__options).length === 1) __options = null;
      if (__map || __options)
        c = `${manager.translatorFunctionName}(${__enName}, ${stringify(__map)}, ${stringify(__options)})`; 
      else c = __enName;
    }
    code.push(manager.indent + `var ${p} = ${c}` + manager.eol);
  }
  // keep the code stacked,,, but add void line peparation
  // between prototype specifiers function
  return code.join('') + prototypes.join(manager.voidline);
}

export function getGlobalTranslatorCode(map) {
  let code = [], prototypes = [];
  for (let p in map) {
    let c, m = map[p];
    if (typeof m === 'string') c = getMemberFromGlobal(m);
    else {
      let __enName = m[0];
      let __map = m[1];
      let __options = m[2];
      __enName = getMemberFromGlobal(__enName);
      // here we have to define new properties with arabic names to the built-in prototypes such as Object.prototype 
      if (__options?.constructMap) prototypes.push(getPrototypeTranslator(__enName, __map, __options));
      if (__options && Object.keys(__options).length === 1) __options = null;
      if (__map || __options)
        c = `${manager.translatorFunctionName}(${__enName}, ${stringify(__map)}, ${stringify(__options)})`;
      else c = __enName;
    }
    code.push(manager.indent + `${manager.options.globalObject}[${stringify(p)}] = ${c}` + manager.eol);
  }
  // keep the code stacked,,, but add void line peparation
  // between prototype specifiers function
  return code.join('') + prototypes.join(manager.voidline);
}

export function getDeclareModuleTMapsCode() {
  let code = '';
  code += manager.indent + `${manager.options.globalObject}.__arabi__modules__tmap__ = ${stringify(manager.maps.modules)}` + manager.eol;
  return code;
}

export function getTopImportsCode() {
  let sources = Object.keys(manager.topImports);
  
  function getImportCode (source, specifiers) {
    let trans; // transformer
    let isModule = manager.options.sourceType === 'es6';
    if (isModule) trans = (i)=>i[0] === i[1] ? i[0] : `${i[0]} as ${i[1]}`;
    else trans = (i)=>i[0] === i[1] ? i[0] : `${i[0]}: ${i[1]}`;
    let imports = specifiers.map(trans).join(', ');
    
    let code = isModule ?
      `import { ${imports} } from ${stringify(source)}`:
      `const { ${imports} } = require(${stringify(source)})`;

    return manager.indent + code + manager.eol;
  }

  if (!sources.length) return null;
  return sources.map(s=>getImportCode(s, manager.topImports[s])).join('');
}

export function translateModule(_m) {
  let m = manager.maps.modules[_m];
  let enModuleName = typeof m === 'string' ? m : m[0]; 
  let filename = path.resolve(manager.tmodulesDir, enModuleName + '.arabi.js');
  let mtcode = manager.options.sourceType === 'es6' ? 
    codes.es6ModuleTranslationCode : codes.commonjsModuleTranslationCode;

  let code = mtcode
    .replace('MODULE_NAME', m[0])
    .replace('MODULE_MAP', stringify(m[1]))
    .replace('MAP_OPTIONS', stringify(m[2]));

  fs.writeFileSync(filename, code);
  return filename;
}

function getPrototypeTranslator(__enName, __map, __options) {
  // TODO: evaluate from @arabi/translate when `options.runtime`, it has to be has to be nearly isolated and independent;
  // TODO: take care of the properties' descriptor
  let constructMap = __options.constructMap;
  __options.constructMap = null;
  let prototypeCode = manager.indent + '(()=>{' + manager.nl;
  let protoVarName = '__the__proto__';
  manager.increaseIndent();
  prototypeCode += manager.indent + `var ${protoVarName} = ${__enName}.prototype` + manager.eol;

  for (let pp in constructMap) {
    let map = constructMap[pp];
    let descriptor;
    if (typeof map === 'string') {
      let _name = getMember("this", map);
      descriptor = [
        "{",
        `get: function(){ return ${_name} },`,
        `set: function(v){ return ${_name} = v },`,
        "}",
      ].join('');
    } else {
      let _name = map[0];
      let _map = map[1];
      let _options = map[2]; 
      _name = getMember("this", _name);
      // TODO: cache the translated value
      // add option to retranslate when [[set]] is executed
      descriptor = [
        "{",
        `get: function(){ return ${manager.translatorFunctionName}(${_name}, ${stringify(_map)}, ${stringify(_options)}) },`,
        `set: function(v){ return ${_name} = v },`,
        "}",
      ].join('');
    }
    prototypeCode += manager.indent +
      `Object.defineProperty(${protoVarName}, "${pp}", ${descriptor})` + manager.eol;
  }
  manager.decreaseIndent();
  // end of line and new line, so we may have a semicolon + \n + \n
  prototypeCode += manager.indent + '})()' + manager.eol;
  return prototypeCode;
}

function getMemberFromGlobal(name) {
  let isid = isIdentifierName(name);
  return isid ? name : getMember(manager.options.globalObject, name);
}

function getMember(obj, ...mem) {
  let memexpr = obj;
  while(mem.length) {
    let name = mem.shift();
    let isid = isIdentifierName(name);
    memexpr = memexpr + (isid ? '.' + name : `[${stringify(name)}]`);
  }
  return memexpr;
}
