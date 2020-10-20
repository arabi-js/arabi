import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';
import { addToScope } from './مساعدات';

function handleArrowFunction(node, indent = handler.indent) {
  let _async = node.async ? 'async ' : '';

  // a new blockScope is created automatically
  // as fn.body.type === "BlockStatement"
  handler.scope.startClosure();

  let code =
    indent +
    _async +
    `(${node.params.map((p) => handler(p, '')).join(', ')}) => `;

  // add params to scope
  node.params.map((p) =>
    addToScope(p.type === 'BinaryExpression' ? /* operator "=" */ p.left : p)
  );

  code += handler(node.body, '');

  // close the closure of this function
  handler.scope.endClosure();

  return code;
}

export const functionHandler: Handler = {
  types: [
    'FunctionExpression',
    'FunctionDeclaration',
    'ArrowFunctionExpression',
  ],
  handle(node, indent = handler.indent) {
    if (node.type === 'ArrowFunctionExpression')
      return handleArrowFunction(node, indent);

    let _async = node.async ? 'async ' : '';
    let _generator = node.generator ? '*' : '';
    let _name = node.id?.name || '';

    node.type === 'FunctionDeclaration' && handler.scope.addFunction(_name);
    // a new blockScope is created automatically
    // as fn.body.type === "BlockStatement"
    handler.scope.startClosure();

    // the declaration syntax
    let code =
      _async +
      'function' +
      _generator +
      ' ' +
      _name +
      `(${node.params.map((p) => handler(p, '')).join(', ')}) `;

    // add params to scope
    node.params.map((p) =>
      addToScope(p.type === 'BinaryExpression' ? /* operator "=" */ p.left : p)
    );

    code += handler(node.body, '');

    // close the closure of this function
    handler.scope.endClosure();
    return code;
  },
};
