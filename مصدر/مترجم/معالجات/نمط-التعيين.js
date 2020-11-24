
import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';
import { addToScope } from '../../مساعدات';

export const assignmentHandler: Handler = {
  types: ["AssignmentPattern"],
  handle(node, indent=handler.indent) {
    // in non-script mode, the assignment of undeclared id is a declaration
    addToScope(node.left, 'var');
    let left = handler(node.left, '');
    let right = handler(node.right, '');
    return indent + `${left} = ${right}` + handler.semi;
  },
};
