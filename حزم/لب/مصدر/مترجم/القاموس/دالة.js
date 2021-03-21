// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { addToScope } from '../../مساعدات';
import { type Translator } from '../../أنواع';

function translateArrowFunction(node, indent = manager.indent) {
  let _async = node.async ? 'async ' : '';
  // a new blockScope is created automatically
  // as fn.body.type === "BlockStatement"
  manager.scope.startClosure();

  let code = indent + _async + `(${node.params.map((p) => translate(p, '')).join(', ')}) => `;

  // add params to scope
  // the assignment expression is adding to scope while handling it
  addToScope(node.params.filter((p) => p.type !== 'AssignmentPattern'));

  code += translate(node.body, '');
  // close the closure of this function
  manager.scope.endClosure();
  return code;
}

export const functionTranslator: Translator = {
  types: ['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'],
  translate(node, indent = manager.indent) {
    if (node.type === 'ArrowFunctionExpression') return translateArrowFunction(node, indent);

    let _async = node.async ? 'async ' : '';
    let _generator = node.generator ? '*' : '';
    let _name = node.id?.name || '';

    node.type === 'FunctionDeclaration' && manager.scope.addFunction(_name);
    // a new blockScope is created automatically
    // as fn.body.type === "BlockStatement"
    manager.scope.startClosure();
    manager.functionDepth++;

    // the declaration syntax
    let code =
      _async +
      'function' +
      _generator +
      ' ' +
      _name +
      `(${node.params.map((p) => translate(p, '')).join(', ')}) `;

    // add params to scope
    // the assignment expression is adding to scope while handling it
    addToScope(node.params.filter((p) => p.type !== 'AssignmentPattern'));

    code += translate(node.body, '');

    manager.functionDepth--;
    // close the closure of this function
    manager.scope.endClosure();

    node.type === 'FunctionDeclaration' &&
      node.body.type === 'BlockStatement' &&
      (code = manager.voidline + code + manager.voidline);

    return code;
  }
};
