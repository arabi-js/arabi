// @flow

import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';
import { addToScope } from '../../مساعدات';

export const assignmentHandler: Handler = {
  types: ["AssignmentPattern", "AssignmentExpression"],
  handle(node, indent=handler.indent) {
    let op = node.operator || '=' /* AssignmentPattern */;
    // in non-script mode, the assignment of undeclared id is a declaration
    if (op === '=') addToScope(node.left, 'var');
    return indent + `${handler(node.left, '')} ${op} ${handler(node.right, '')}`;
  },
};
