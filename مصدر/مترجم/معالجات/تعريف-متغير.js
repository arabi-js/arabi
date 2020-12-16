// @flow

import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';
import { _let, _const, _var } from '../../babel-parser/src/keywords-map';
import { getIds } from '../../مساعدات';

function addToScope(id, type) {
  const _ids = getIds(id);
  if (type === 'lex') handler.scope.addLexicals(_ids);
  else handler.scope.addVars(_ids);
}

export const declarationHandler: Handler = {
  types: ['VariableDeclaration'],
  handle(node, indent=handler.indent, addEOL=true /* passed from ExportNamedDeclaration */) {
    const kind =
      node.kind === _let
        ? 'let'
        : node.kind === _const
        ? 'const'
        : node.kind === _var
        ? 'var'
        : null;
    if (!kind) handler.error(node, 'unknow variable decalrations kind');

    function handleDeclaration(dec) {
      let decCode = handler(dec.id, '') + (dec.init ? ' = ' + handler(dec.init, '') : '');
      if (kind === 'let' || kind === 'const') addToScope(dec.id, 'lex');
      else addToScope(dec.id, 'var');
      return decCode
    }

    let alignIndent = new Array(kind.length).fill(' ').join('') + ' ';
    let decs =
      node.declarations
      .map(handleDeclaration)
      .join(',' + handler.nl + handler.indent + alignIndent);

    let eol = addEOL ? handler.eol : '';
    return indent + kind + ' ' + decs + eol;
  },
};
