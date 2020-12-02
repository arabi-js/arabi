import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';

export const classHandler: Handler = {
  types: [
    'ClassDeclaration', 'ClassExpression'
  ],
  handle(node, indent=handler.indent) {
    // node.id, superClass, body
    let id = node.id ? ' ' + handler(node.id, '') : '';
    let superClass = node.superClass ? ' extends ' + handler(node.superClass, '') : '';
    let code = indent + `class${id}${superClass} {\n`;
    handler.increaseIndent();
    
    // n.body.type === 'ClassBody'
    for (let n of node.body.body) {
      if(n.type === 'ClassProperty' || n.type === 'ClassPrivateProperty') {
        // key, value, static, computed
        let key = handler(n.key, '');
        let value = handler(n.value, '');
        let _private = n.type === 'ClassPrivateProperty' ? '#' : '';
        let _static = n.static ? 'static ' : '';
        key = n.computed ? `[${key}]` : key;
        code += handler.indent + `${_static}${_private}${key} = ${value}` + handler.semi;
      } else if (n.type === 'ClassMethod' || n.type === 'ClassPrivateMethod') {
        // key, id, static, generator, async, kind, computed
        let method;
        let _static = n.static ? 'static ' : '';
        let _async = n.static ? 'async ' : '';
        let _gen = n.generator ? '*' : '';
        let _private = n.type === 'ClassPrivateMethod' ? '#' : '';
        let prefix = n.kind === 'method' ? '' : n.kind + ' ';
        let key = handler(p.key, '');
        key = (n.computed ? `[${key}]`: key);

        handler.scope.startClosure();
        // add params to scope
        // AssignmentPattern adds to scope internally
        n.params.map((p) => p.type !== 'AssignmentPattern' && addToScope(p));

        method = `${_static}${_async}${prefix}${_gen}${_private}${key}(${n.params.map((p) => handler(p, '')).join(', ')}) `;
        method += handler(n.body, '');

        handler.scope.endClosure();
        return indent + method; 

      } else throw 'Unexpected "' + n.type + '" inside the class body';
    }

    handler.decreaseIndent();
    return code + '\n' + handler.indent + '}';
  },
};
