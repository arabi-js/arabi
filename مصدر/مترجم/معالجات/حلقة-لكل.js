// @flow

import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';

function handleForIn(node, indent) {
  // if > let name in iterable > body
  handler.scope.startBlockScope();

  // we want the following statements without a semi
  let semi = handler.semi;
  handler.semi = '';
  let left = handler(node.left, '');
  let right = handler(node.right, '');
  // return it back as it was
  handler.semi = semi;

  // let add some checkes for the loosy mode
  node.left.type === 'Identifier' && handler.scope.addVar(node.name);

  let code = indent + `for (${left} in ${right}) `;
  code += handler(node.body, '');

  handler.scope.endBlockScope();
  return code;
}

function handleForOf(node, indent) {
  // if > let name in iterable > body
  handler.scope.startBlockScope();

  // we want the following statements without a semi
  let semi = handler.semi;
  handler.semi = '';
  let left = handler(node.left, '');
  let right = handler(node.right, '');
  // return it back as it was
  handler.semi = semi;
  
  // let add some checkes for the loosy mode
  node.left.type === 'Identifier' && handler.scope.addVar(node.name);

  let code = indent + `for (${left} of ${right}) `;
  code += handler(node.body, '');

  handler.scope.endBlockScope();
  return code;
}

export const forHandler: Handler = {
  types: ['ForStatement', 'ForOfStatement', 'ForInStatement'],
  handle(node, indent = handler.indent) {
    if (node.type === 'ForOfStatement') return handleForOf(node, indent);
    if (node.type === 'ForInStatement') return handleForIn(node, indent);
    
    // if > init, test, bodate > body
    handler.scope.startBlockScope();

    // we want the following statements without a semi
    let semi = handler.semi;
    handler.semi = '';
    let init = node.init ? handler(node.init, '') : '';
    let test = node.test ? handler(node.test, '') : '';
    let update = node.update ? handler(node.update, '') : '';
    // return it back as it was
    handler.semi = semi;

    let code = indent + `for (${init}; ${test}; ${update}) `;
    code += handler(node.body, '');
    
    handler.scope.endBlockScope();
    return code;
  },
};
