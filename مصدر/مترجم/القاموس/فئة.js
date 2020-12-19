// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { addToScope } from '../../مساعدات';
import { _constructor } from '../../babel-parser/src/keywords-map';
import { type Translator } from '../../أنواع.js';

export const classTranslator: Translator = {
  types: [ 'ClassDeclaration', 'ClassExpression' ],
  translate(
    node,
    indent = manager.indent,
    addEOL=true /* passed from ExportNamedDeclaration */
  ) {
    // node.id, superClass, body
    let id = node.id ? ' ' + translate(node.id, '') : '';
    let superClass = node.superClass ? ' extends ' + translate(node.superClass, '') : '';
    let code = indent + `class${id}${superClass} {` + manager.nl;
    let classBody = [];
    manager.increaseIndent();
    
    // n.body.type === 'ClassBody'
    for (let n of node.body.body) {
      if(n.type === 'ClassProperty' || n.type === 'ClassPrivateProperty') {
        // key, value, static, computed
        let key = translate(n.key, '');
        let value = translate(n.value, '');
        // let _private = n.type === 'ClassPrivateProperty' ? '#' : '';
        let _static = n.static ? 'static ' : '';
        key = n.computed ? `[${key}]` : key;
        let propCode = manager.indent + `${_static}${key} = ${value}` + manager.eol;
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
        let key = translate(n.key, '');
        key = (n.computed ? `[${key}]`: key);

        manager.functionDepth++;
        manager.scope.startClosure();
        // add params to scope
        // AssignmentPattern adds to scope internally
        n.params.map((p) => p.type !== 'AssignmentPattern' && addToScope(p));

        let declarator = `${_static}${_async}${prefix}${_gen}${key}`;
        declarator = declarator === _constructor ? 'constructor' : declarator;
        methodCode = manager.indent + `${declarator}(${n.params.map((p) => translate(p, '')).join(', ')}) `;
        methodCode += translate(n.body, '');

        manager.functionDepth--;
        manager.scope.endClosure();
        classBody.push(methodCode + manager.nl);
      } else manager.error(n, 'Unexpected "' + n.type + '" inside the class body');
    }

    manager.decreaseIndent();
    code += classBody.join('') + manager.voidline + manager.indent + '}';
    addEOL && node.type === 'ClassDeclaration' && (
      code = manager.voidline + code + manager.nl + manager.voidline
    );
    return code;
  },
};
