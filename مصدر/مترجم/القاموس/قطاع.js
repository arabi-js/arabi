// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { type Translator } from '../../أنواع.js';

export const blockTranslator: Translator = {
  types: ['BlockStatement'],
  translate(
    node,
    indent = manager.indent,
    addScope = true /* this param is for me only not the other handlers */
  ) {
    let inline = node.loc.start.line === node.loc.end.line;

    // open block statement
    let vl = indent === '' ? '' : manager.voidline;
    let code = (vl + indent) + (inline ? '{ ' : '{' + manager.nl);
    addScope && manager.scope.startBlockScope();
    !inline && manager.increaseIndent();

    // add the inside code
    let eol = manager.eol;
    inline && (manager.eol = '; ');
    code += translate(node.body, inline ? '' : manager.indent);
    manager.eol = eol;

    // close block statement
    !inline && manager.decreaseIndent();
    addScope && manager.scope.endBlockScope();
    code += inline ? ' }' : manager.indent + '}'
      + manager.nl + vl;
    return code;
  },
};
