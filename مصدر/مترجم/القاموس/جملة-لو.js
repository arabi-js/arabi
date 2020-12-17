// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { type Translator } from '../../أنواع.js';

export const ifTranslator: Translator = {
  types: ['IfStatement'],
  translate(node, indent = manager.indent) {
    let code =
      indent + `if (${translate(node.test)}) ` + translate(node.consequent, '');
    if (node.alternate)
      code += `${manager.nl}${manager.indent}else ` + translate(node.alternate, '');
    return code;
  },
};
