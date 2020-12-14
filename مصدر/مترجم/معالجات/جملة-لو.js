// @flow

import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';

export const ifHandler: Handler = {
  types: ['IfStatement'],
  handle(node, indent = handler.indent) {
    let code =
      indent + `if (${handler(node.test)}) ` + handler(node.consequent, '');
    if (node.alternate)
      code += `${handler.nl}${handler.indent}else ` + handler(node.alternate, '');
    return code;
  },
};
