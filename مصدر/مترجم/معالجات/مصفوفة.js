import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';

export const arrayHandler: Handler = {
  types: ['ArrayExpression'],
  handle(node, indent = '') {
    let inline = node.loc.start.line === node.loc.end.line;
    let code = indent + '[' + (inline ? '' : '\n');
    if (!inline) handler.increaseIndent();
    for (let e of node.elements) {
      // we are not indenting at the begining
      // because we sill do it at the following line
      if (!e) { // e === null
        code += ','; continue;
      }
      let elmCode = handler(e, '');
      code += (inline ? '' : handler.indent) + elmCode;
      code += inline ? ', ' : ',\n';
    }
    if (!inline) handler.decreaseIndent();
    return code + (inline ? ']' : handler.indent + ']');
  },
};
