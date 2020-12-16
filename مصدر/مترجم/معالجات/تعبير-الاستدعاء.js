// @flow

import handler from '../مدخل';
import { _require } from '../../babel-parser/src/keywords-map';
import { type Handler } from '../../أنواع.js';

function handleRequire(node, indent=handler.indent){
  if(node.arguments.length === 0) handler.error(node, "Unexpected no arguments to \"require\" function");
  if(node.arguments.length !== 1) handler.wran(node,
    "Unexpected number of arguments to \"require\" function",
    "We will take the first argument only",
  );

  let arg = node.arguments[0];
  if (arg.type === 'StringLiteral') {
    // translate using __arjs__translate__,,, we will get the map directly
    let a;
    if (handler.maps.modules && (a = handler.maps.modules[arg.value])) {
      let enName = a[0];
      // let map = a[1];
      // let options = a[2];
      // set handler.addTranslateRequire to `true`, but dosn't declare global.`__arjs__modules__tmap__`
      // return `${handler.trfnName2}(require(${JSON.stringify(enName)}), ${arg.extra.rawValue}, ${JSON.stringify(enName)}, ${stringify(map)}, ${stringify(options)})`;
      return indent + `${handler.trfnName2}(require(${JSON.stringify(enName)}), ${JSON.stringify(arg.value)})`;
    } else return indent + `require(${handler(arg, '')})`;
  }

  arg = handler(arg, '');
  // TODO: use ${arg} one in the code, it may invoke some function which is needed to be called only one time.
  return indent + `${handler.trfnName}(require(${arg}), ${arg})`;
}

export const callHandler: Handler = {
  types: ['CallExpression', 'OptionalCallExpression', 'NewExpression'],
  handle(node, indent=handler.indent) {
    if (
      handler.options.moduleType === 'commonjs' &&
      node.type === 'CallExpression' &&
      node.callee.type === 'Identifier' &&
      node.callee.name === _require &&
      !handler.scope.has(node.callee.name)
    ) return handleRequire(node, indent);

    let prefix = node.type === 'NewExpression' ? 'new ' : '';
    let optional = node.optional ? '?.' : '';
    return (
      indent +
      `${prefix}${handler(node.callee, '')}${optional}(${node.arguments
        .map((n) => handler(n, ''))
        .join(', ')})`
    );
  },
};
