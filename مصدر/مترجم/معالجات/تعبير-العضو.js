import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';

export const memExpressionHandler: Handler = {
  types: ['MemberExpression'],
  handle(node, indent = '') {
    return indent + `${handler(node.object)}.${handler(node.property)}`;
  },
};
