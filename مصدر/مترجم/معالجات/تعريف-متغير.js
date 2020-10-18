import handler from "../مدخل";
import { type Handler } from "../../أنواع.js";
import { _let, _const, _var } from "../../../babel-parser/src/keywords-map"
import { getIds } from './مساعدات'

function addToScope(id, type) {
  const _ids = getIds(id);
  if (type === 'lex') handler.scope.addLexicals(_ids);
  else handler.scope.addVars(_ids);
}

export const declarationHandler: Handler = {
  test(node) {
    return node.type === "VariableDeclaration";
  },
  handle(node, indent=handler.indent) {
    
    const kind =
      node.kind === _let
      ? "let"
      : node.kind === _const
      ? "const"
      : node.kind === _var
      ? "var"
      : null;
    if(!kind) throw "unknow variable decalrations kind";
    
    let code = indent + kind + " ";
    let dec = node.declarations.pop();


    function addDeclaration(dec) {
      if(kind === "let" || kind === "const") addToScope(dec.id, 'lex');
      else addToScope(dec.id, 'var');
      code += handler(dec.id) + (dec.init ? " = " + handler(dec.init, '') : "");
    }

    addDeclaration(dec);

    if (node.declarations.length > 1) {
      let alignIndent = new Array(kind.length).fill(" ").join("") + " ";
      while (node.declarations.length > 0) {
        dec = node.declarations.pop();
        code += handler.indent + alignIndent;
        addDeclaration(dec);
        code += node.declarations.length > 0 ? ",\n" : "";
      }
    }

    code += handler.semi; // this may be void string if depending on the options
    return code;
  },
};
