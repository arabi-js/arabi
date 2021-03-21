// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { keywordsMap } from '@arabi/maps';
import { type Translator } from '../../أنواع.js';
import { stringify } from '../../مساعدات';

function handleRequire(node, indent = manager.indent) {
  if (node.arguments.length === 0)
    manager.error(node, 'Unexpected no arguments to "require" function');
  if (node.arguments.length !== 1)
    manager.wran(
      node,
      'Unexpected number of arguments to "require" function',
      'We will take the first argument only'
    );

  let arg = node.arguments[0];
  if (arg.type === 'StringLiteral') {
    // translate using __arabi__translate__,,, we will get the map directly
    let a;
    if (manager.maps.modules && (a = manager.maps.modules[arg.value])) {
      let enName = a[0];
      // let map = a[1];
      // let options = a[2];
      // set manager.addTranslateRequire to `true`, but dosn't declare global.`__arabi__modules__tmap__`
      // return `${manager.translateRequireFunctionName__2}(require(${stringify(enName)}), ${arg.extra.rawValue}, ${stringify(enName)}, ${stringify(map)}, ${stringify(options)})`;
      return (
        indent +
        `${manager.translateRequireFunctionName__2}(require(${stringify(enName)}), ${stringify(
          arg.value
        )})`
      );
    } else return indent + `require(${translate(arg, '')})`;
  }

  arg = translate(arg, '');
  // TODO: use ${arg} one in the code, it may invoke some function which is needed to be called only one time.
  return indent + `${manager.translateRequireFunctnionName}(require(${arg}), ${arg})`;
}

// object::callee(...);
function bindExpression(node, indent = manager.indent) {
  // interface BindExpression <: Expression {
  //     type: "BindExpression";
  //     object: Expression | null;
  //     callee: Expression;
  // }
  let object = translate(node.object, '');
  let callee = translate(node.callee, '');
  return indent + `${object}::${callee}`;
}

// tag` ... `
function taggedTemplateExpression(node, indent = manager.indent) {
  // interface TaggedTemplateExpression <: Expression {
  //   type: "TaggedTemplateExpression";
  //   tag: Expression;
  //   quasi: TemplateLiteral; // translated in ./جملة-حرفية.js
  // }
  return indent + `${translate(node.tag, '')}${translate(node.quasi, '')}`;
}

export const callTranslator: Translator = {
  types: [
    'CallExpression',
    'OptionalCallExpression',
    'NewExpression',
    'BindExpression',
    'TaggedTemplateExpression'
  ],
  translate(node, indent = manager.indent) {
    if (node.type === 'BindExpression') return bindExpression(node, indent);
    if (node.type === 'TaggedTemplateExpression') return taggedTemplateExpression(node, indent);

    if (
      manager.isOutput('commonjs') &&
      node.type === 'CallExpression' &&
      node.callee.type === 'Identifier' &&
      node.callee.name === keywordsMap._require &&
      !manager.scope.has(node.callee.name)
    )
      return handleRequire(node, indent);

    let prefix = node.type === 'NewExpression' ? 'new ' : '';
    let optional = node.optional ? '?.' : '';
    return (
      indent +
      `${prefix}${translate(node.callee, '')}${optional}(${node.arguments
        .map((n) => translate(n, ''))
        .join(', ')})`
    );
  }
};
