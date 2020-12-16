// @flow

import handler from '../مدخل';
import { addToScope } from '../../مساعدات';
import { _constructor } from '../../babel-parser/src/keywords-map';
import { type Handler } from '../../أنواع.js';

export const classHandler: Handler = {
  types: [
    'ClassDeclaration', 'ClassExpression'
  ],
  handle(node, indent=handler.indent, addEOL=true /* passed from ExportNamedDeclaration */) {
    // node.id, superClass, body
    let id = node.id ? ' ' + handler(node.id, '') : '';
    let superClass = node.superClass ? ' extends ' + handler(node.superClass, '') : '';
    let code = indent + `class${id}${superClass} {` + handler.nl;
    let classBody = [];
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
        let propCode = handler.indent + `${_static}${_private}${key} = ${value}` + handler.eol;
        classBody.push(propCode);
      } else if (n.type === 'ClassMethod' || n.type === 'ClassPrivateMethod') {
        // key, id, static, generator, async, kind, computed
        let methodCode;
        let _static = n.static ? 'static ' : '';
        let _async = n.static ? 'async ' : '';
        let _gen = n.generator ? '*' : '';
        // this line is useless, as it while handling n.key
        // let _private = n.type === 'ClassPrivateMethod' ? '#' : '';
        let prefix = n.kind === 'method' ? '' : n.kind + ' ';
        let key = handler(n.key, '');
        key = (n.computed ? `[${key}]`: key);

        handler.functionDepth++;
        handler.scope.startClosure();
        // add params to scope
        // AssignmentPattern adds to scope internally
        n.params.map((p) => p.type !== 'AssignmentPattern' && addToScope(p));

        let declarator = `${_static}${_async}${prefix}${_gen}${key}`;
        declarator = declarator === _constructor ? 'constructor' : declarator;
        methodCode = handler.indent + `${declarator}(${n.params.map((p) => handler(p, '')).join(', ')}) `;
        methodCode += handler(n.body, '');

        handler.functionDepth--;
        handler.scope.endClosure();
        classBody.push(methodCode + handler.nl);
      } else handler.error(n, 'Unexpected "' + n.type + '" inside the class body');
    }

    handler.decreaseIndent();
    code += classBody.join('') + handler.voidline + handler.indent + '}';
    addEOL && node.type === 'ClassDeclaration' && (
      code = handler.voidline + code + handler.nl + handler.voidline
    );
    return code;
  },
};
