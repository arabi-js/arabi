import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';

function handleDoWhile(node, indent) {
  let code = indent + 'do ';
  code += handler(node.body, '');
  return code + ' while (' + handler(node.test, '') + ')' + handler.semi;
}

export const whileHandler: Handler = {
  types: ['WhileStatement', 'DoWhileStatement'],
  handle(node, indent = handler.indent) {
    if (node.type === 'DoWhileStatement') return handleDoWhile(node, indent);
    let code = indent + 'while (' + handler(node.test, '') + ') ';
    code += handler(node.body, '');
    return code;
  },
};
