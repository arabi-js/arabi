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

