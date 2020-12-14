// @flow

import handler from '../مدخل';
import { addToScope } from '../../مساعدات';
import { type Handler } from '../../أنواع.js';

export const objectHandler: Handler = {
  types: ['ObjectPattern', 'ObjectExpression', 'ObjectProperty', 'ObjectMethod'],
  handle(node, indent=handler.indent) {
    if (node.type === 'ObjectProperty') {
      // TODO: node.decorators
      let key = handler(node.key, '');
      key = (node.computed ? `[${key}]`: key);
      return node.shorthand
        ? key
        : key + ': ' + handler(node.value, '')
    } else if (node.type === 'ObjectMethod') {
      let prefix, key, method;
      let _async = node.async ? 'async ' : '';
      let _generator = node.generator ? '*' : '';
      prefix = node.kind === 'method' ? '' : node.kind + ' ';
      key = handler(node.key, '');
      key = (node.computed ? `[${key}]`: key);

      handler.functionDepth++;
      handler.scope.startClosure();
      // add params to scope
      // AssignmentPattern adds to scope internally
      node.params.map((p) => p.type !== 'AssignmentPattern' && addToScope(p));

      method = `${_async}${_generator}${key} (${node.params.map((p) => handler(p, '')).join(', ')}) `;
      method += handler(node.body, '');

      handler.functionDepth--;
      handler.scope.endClosure();
      return indent + prefix + method; 
    }

    let inline = node.loc.start.line === node.loc.end.line;
    let code = indent + '{' + (inline ? '' : handler.nl);
    if (!inline) handler.increaseIndent();
    for (let p of node.properties) {
      let propCode = handler(p, '');
      code += (inline ? '' : handler.indent) + propCode;
      code += inline ? ', ' : ',' + handler.nl;
    }
    if (!inline) handler.decreaseIndent();
    return code + (inline ? '}' : handler.indent + '}');
  },
};
