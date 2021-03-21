// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { type Translator } from '../../أنواع.js';
import { keywordsMap } from '@arabi/maps';
import { getIds } from '../../مساعدات';

const { _let, _const, _var } = keywordsMap;

function addToScope(id, type) {
  const _ids = getIds(id);
  if (type === 'lex') manager.scope.addLexicals(_ids);
  else manager.scope.addVars(_ids);
}

export const declarationTranslator: Translator = {
  types: ['VariableDeclaration'],
  translate(node, indent = manager.indent, addEOL = true /* passed from ExportNamedDeclaration */) {
    const kind =
      node.kind === _let
        ? 'let'
        : node.kind === _const
        ? 'const'
        : node.kind === _var
        ? 'var'
        : null;
    if (!kind) manager.error(node, 'unknow variable decalrations kind');

    function handleDeclaration(dec) {
      let decCode = translate(dec.id, '') + (dec.init ? ' = ' + translate(dec.init, '') : '');
      if (kind === 'let' || kind === 'const') addToScope(dec.id, 'lex');
      else addToScope(dec.id, 'var');
      return decCode;
    }

    let alignIndent = new Array(kind.length).fill(' ').join('') + ' ';
    let decs = node.declarations
      .map(handleDeclaration)
      .join(',' + manager.nl + manager.indent + alignIndent);

    let eol = addEOL ? manager.eol : '';
    return indent + kind + ' ' + decs + eol;
  }
};
