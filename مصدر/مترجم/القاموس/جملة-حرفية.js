// @flow

import manager from '../مدير-الترجمة';
import { type Translator } from '../../أنواع.js';

export const literalTranslator: Translator = {
  types: [
    'BooleanLiteral',
    'RegExpLiteral',
    'NullLiteral',
    'StringLiteral',
    'BigIntLiteral',
    'NumericLiteral',
    'DecimalLiteral',
  ],
  translate(node, indent=manager.indent) {
    switch (node.type) {
      case 'StringLiteral':
        return indent + node.extra.raw;
      case 'RegExpLiteral':
        // TODO: translate it to arabic letters, e.g., 
        // /\ك+/  ->  /\w+/
      // eslint-disable-next-line no-fallthrough
      default:
        return indent + node.value;
    }
  },
};
