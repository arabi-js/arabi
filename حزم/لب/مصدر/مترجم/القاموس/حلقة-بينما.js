// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { type Translator } from '../../أنواع.js';

function handleDoWhile(node, indent) {
  let code = indent + 'do ';
  code += translate(node.body, '');
  return code + ' while (' + translate(node.test, '') + ')' + manager.eol;
}

export const whileTranslator: Translator = {
  types: ['WhileStatement', 'DoWhileStatement'],
  translate(node, indent = manager.indent) {
    if (node.type === 'DoWhileStatement') return handleDoWhile(node, indent);
    let code = indent + 'while (' + translate(node.test, '') + ') ';
    code += translate(node.body, '');
    return code;
  }
};
