// @flow
import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { type Translator } from '../../أنواع.js';

function translateTemplateLiteral(node, indent: string): string {
  // interface TemplateLiteral {
  //   type: "TemplateLiteral";
  //   quasis: [ TemplateElement ];
  //   expressions: [ Expression ];
  // }
  // interface TemplateElement <: Node {
  //   type: "TemplateElement";
  //   tail: boolean;
  //   value: {
  //     cooked: string | null;
  //     raw: string;
  //   };
  // }
  if (node.expressions.length === 0)
    // node.quasis.length === 1
    return node.quasis[0].value.raw;
  let tail = node.quasis.pop().value.raw;
  let head = '';
  for (let i = 0; i < node.quasis.length; i++) {
    head += node.quasis[i].value.raw;
    head += '${' + translate(node.expressions[i], '') + '}';
  }
  return indent + `\`${head}${tail}\``;
}

export const literalTranslator: Translator = {
  types: [
    'BooleanLiteral',
    'RegExpLiteral',
    'NullLiteral',
    'StringLiteral',
    'BigIntLiteral',
    'NumericLiteral',
    'DecimalLiteral',
    'TemplateLiteral'
  ],
  translate(node, indent = manager.indent) {
    switch (node.type) {
      case 'StringLiteral':
        return indent + node.extra.raw;
      case 'TemplateLiteral':
        return translateTemplateLiteral(node, indent);
      case 'RegExpLiteral':
      // TODO: translate it to arabic letters, e.g.,
      // /\ك+/  ->  /\w+/
      // eslint-disable-next-line no-fallthrough
      default:
        return indent + node.value;
    }
  }
};
