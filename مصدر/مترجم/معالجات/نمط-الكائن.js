import handler from "../مدخل";
import { type Handler } from '../../أنواع.js';

export const objectHandler: Handler = {
  test(node) {
    return node.type === "ObjectPattern" || node.type === "ObjectExpression";
  },
  handle(node, indent='') {
    let inline = node.loc.start.line === node.loc.end.line;
    let code = indent + "{" + (inline ? '' : '\n');
    if(!inline) handler.increaseIndent();
    for (let p of node.properties) { 
      let propCode = p.shorthand ? handler(p.key, '') : handler(p.key, '') + ": " + handler(p.value, '');
      code += (inline ? "" : handler.indent) + propCode;
      code += inline ? ", " : ",\n" ;
    }
    if(!inline) handler.decreaseIndent();
    return code + (inline ? "}" : handler.indent + "}");
  },
};
