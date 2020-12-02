import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';

export const objectHandler: Handler = {
  types: ['ObjectPattern', 'ObjectExpression', 'ObjectProperty', 'ObjectMethod'],
  handle(node, indent=handler.indent) {
    if (node.type === 'ObjectProperty') {
      // TODO: node.decorators
      let key = handler(p.key, '');
      key = (node.computed ? `[${key}]`: key);
      p.shorthand
        ? key
        : key + ': ' + handler(p.value, '')
    } else if (node.type === 'ObjectMethod') {
      let prefix, key, method;
      let _async = node.async ? 'async ' : '';
      let _generator = node.generator ? '*' : '';
      prefix = node.kind === 'method' ? '' : node.kind + ' ';
      key = handler(p.key, '');
      key = (node.computed ? `[${key}]`: key);

      handler.scope.startClosure();
      // add params to scope
      // AssignmentPattern adds to scope internally
      node.params.map((p) => p.type !== 'AssignmentPattern' && addToScope(p));

      method = `${_async}${_generator}${key} (${node.params.map((p) => handler(p, '')).join(', ')}) `;
      method += handler(node.body, '');

      handler.scope.endClosure();
      return indent + prefix + method; 
    }

    let inline = node.loc.start.line === node.loc.end.line;
    let code = indent + '{' + (inline ? '' : '\n');
    if (!inline) handler.increaseIndent();
    for (let p of node.properties) {
      let propCode = handler(p, '');
      code += (inline ? '' : handler.indent) + propCode;
      code += inline ? ', ' : ',\n';
    }
    if (!inline) handler.decreaseIndent();
    return code + (inline ? '}' : handler.indent + '}');
  },
};
