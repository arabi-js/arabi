// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { type Translator } from '../../أنواع.js';

function handleForIn(node, indent) {
  // if > let name in iterable > body
  manager.scope.startBlockScope();

  // we want the following statements without a semi
  let semi = manager.eol;
  manager.eol = '';
  let left = translate(node.left, '');
  let right = translate(node.right, '');
  // return it back as it was
  manager.eol = semi;

  // let add some checkes for the loosy mode
  node.left.type === 'Identifier' && manager.scope.addVar(node.name);

  let code = indent + `for (${left} in ${right}) `;
  code += translate(node.body, '');

  manager.scope.endBlockScope();
  return code;
}

function handleForOf(node, indent) {
  // if > let name in iterable > body
  manager.scope.startBlockScope();

  // we want the following statements without a semi
  let semi = manager.eol;
  manager.eol = '';
  let left = translate(node.left, '');
  let right = translate(node.right, '');
  // return it back as it was
  manager.eol = semi;
  
  // let add some checkes for the loosy mode
  node.left.type === 'Identifier' && manager.scope.addVar(node.name);

  let code = indent + `for (${left} of ${right}) `;
  code += translate(node.body, '');

  manager.scope.endBlockScope();
  return code;
}

export const forTranslator: Translator = {
  types: ['ForStatement', 'ForOfStatement', 'ForInStatement'],
  translate(node, indent = manager.indent) {
    if (node.type === 'ForOfStatement') return handleForOf(node, indent);
    if (node.type === 'ForInStatement') return handleForIn(node, indent);
    
    // if > init, test, bodate > body
    manager.scope.startBlockScope();

    // we want the following statements without a semi
    let semi = manager.eol;
    manager.eol = '';
    let init = node.init ? translate(node.init, '') : '';
    let test = node.test ? translate(node.test, '') : '';
    let update = node.update ? translate(node.update, '') : '';
    // return it back as it was
    manager.eol = semi;

    let code = indent + `for (${init}; ${test}; ${update}) `;
    code += translate(node.body, '');
    
    manager.scope.endBlockScope();
    return code;
  },
};
