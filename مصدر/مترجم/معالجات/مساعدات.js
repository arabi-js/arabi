/* 
 * this file contains some helper functions imported in more than module
 */

import handler from "../مدخل";

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

export function getRandomName() {
  return new Date().getTime().toString(32);
}

