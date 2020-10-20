import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';

export const literalHandler: Handler = {
  types: [
    'BooleanLiteral',
    'RegExpLiteral',
    'NullLiteral',
    'StringLiteral',
    'BigIntLiteral',
    'NumericLiteral',
    'DecimalLiteral',
  ],
  handle(node) {
    switch (node.type) {
      case 'StringLiteral':
        return node.extra.raw;
      default:
        return node.value;
    }
  },
};
