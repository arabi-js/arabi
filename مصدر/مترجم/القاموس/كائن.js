// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { addToScope } from '../../مساعدات';
import { type Translator } from '../../أنواع.js';

export const objectTranslator: Translator = {
  types: ['ObjectPattern', 'ObjectExpression', 'ObjectProperty', 'ObjectMethod'],
  translate(node, indent=manager.indent) {
    if (node.type === 'ObjectProperty') {
      // TODO: node.decorators
      let key = translate(node.key, '');
      key = (node.computed ? `[${key}]`: key);
      return node.shorthand
        ? key
        : key + ': ' + translate(node.value, '')
    } else if (node.type === 'ObjectMethod') {
      let prefix, key, method;
      let _async = node.async ? 'async ' : '';
      let _generator = node.generator ? '*' : '';
      prefix = node.kind === 'method' ? '' : node.kind + ' ';
      key = translate(node.key, '');
      key = (node.computed ? `[${key}]`: key);

      manager.functionDepth++;
      manager.scope.startClosure();
      // add params to scope
      // AssignmentPattern adds to scope internally
      node.params.map((p) => p.type !== 'AssignmentPattern' && addToScope(p));

      method = `${_async}${_generator}${key} (${node.params.map((p) => translate(p, '')).join(', ')}) `;
      method += translate(node.body, '');

      manager.functionDepth--;
      manager.scope.endClosure();
      return indent + prefix + method; 
    }

    let inline = node.loc.start.line === node.loc.end.line;
    let code = indent + '{' + (inline ? '' : manager.nl);
    if (!inline) manager.increaseIndent();
    for (let p of node.properties) {
      let propCode = translate(p, '');
      code += (inline ? '' : manager.indent) + propCode;
      code += inline ? ', ' : ',' + manager.nl;
    }
    if (!inline) manager.decreaseIndent();
    return code + (inline ? '}' : manager.indent + '}');
  },
};
