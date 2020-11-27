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
  handle(node, indent=handler.indent) {
    switch (node.type) {
      case 'StringLiteral':
        return indent + node.extra.raw;
      default:
        return indent + node.value;
    }
  },
};
