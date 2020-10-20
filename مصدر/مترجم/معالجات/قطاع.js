import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';

export const blockHandler: Handler = {
  types: ['BlockStatement'],
  handle(
    node,
    indent = handler.indent,
    addScope = true /* this param is for me only not the other handlers */
  ) {
    let inline = node.loc.start.line === node.loc.end.line;

    // open block statement
    let code = indent + (inline ? '{ ' : '{\n');
    addScope && handler.scope.startBlockScope();
    !inline && handler.increaseIndent();

    // add the inside code
    code += handler(node.body, inline ? '' : handler.indent);

    // close block statement
    !inline && handler.decreaseIndent();
    addScope && handler.scope.endBlockScope();
    code += inline ? ' }' : '\n' + handler.indent + '}';
    return code;
  },
};
