// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { type Translator } from '../../أنواع.js';
import { addToScope } from '../../مساعدات';

export const assignmentTranslator: Translator = {
  types: ["AssignmentPattern", "AssignmentExpression"],
  translate(node, indent=manager.indent) {
    let op = node.operator || '=' /* AssignmentPattern */;
    // in non-script mode, the assignment of undeclared id is a declaration
    if (op === '=') addToScope(node.left, 'var');
    return indent + `${translate(node.left, '')} ${op} ${translate(node.right, '')}`;
  },
};
