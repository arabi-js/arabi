// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { type Translator } from '../../أنواع.js';

export const arrayTranslator: Translator = {
  types: ['ArrayExpression'],
  translate(node, indent = '') {
    let inline = node.loc.start.line === node.loc.end.line;
    let code = indent + '[' + (inline ? '' : manager.nl);
    if (!inline) manager.increaseIndent();
    for (let e of node.elements) {
      // we are not indenting at the begining
      // because we sill do it at the following line
      if (!e) { // e === null
        code += ','; continue;
      }
      let elmCode = translate(e, '');
      code += (inline ? '' : manager.indent) + elmCode;
      code += inline ? ', ' : ',' + manager.nl;
    }
    if (!inline) manager.decreaseIndent();
    return code + (inline ? ']' : manager.indent + ']');
  },
};
