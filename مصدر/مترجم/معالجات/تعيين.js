
import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';
import { addToScope } from '../../مساعدات';

export const assignmentHandler: Handler = {
  types: ["AssignmentPattern", "AssignmentExpression"],
  handle(node, indent=handler.indent) {
    // in non-script mode, the assignment of undeclared id is a declaration
    addToScope(node.left, 'var');
    let left = handler(node.left, '');
    let right = handler(node.right, '');
    
    if (node.type === 'AssignmentPattern') return indent + `${left} = ${right}` + handler.semi

    // enum AssignmentOperator {
    //   "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "**="
    //     | "<<=" | ">>=" | ">>>="
    //     | "|=" | "^=" | "&="
    //     | "||=" | "&&=" | "??="
    // }
    let op = node.operator;

    return indent + `${left} ${op} ${right}` + handler.semi;
  },
};
