import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';

export const assignmentHandler: Handler = {
  types: [ 'AssignmentExpression' ],
  handle(node, indent = handler.indent) {
    let left = handler(node.left, '');
    let right = handler(node.right, '');
    // TODO: add to handler.scope
    return indent + `${left} = ${right}`;
  },
};
