// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { type Translator } from '../../أنواع.js';

export const switchTranslator: Translator = {
  types: ['SwitchStatement'],
  translate(node, indent = manager.indent) {
    let code = indent + 'switch(' + translate(node.discriminant, '') + ') {';
    manager.increaseIndent();

    // start adding cases here
    for (let c of node.cases) {
      let inline = c.consequent instanceof Array && c.consequent.length === 1;
      let caseCode = '';
      if (c.type !== 'SwitchCase')
        throw 'unexpected node "' + c.type + '" as switch case.';
      if (c.test) {
        caseCode += manager.nl + manager.indent + 'case ' + translate(c.test, '') + ':';
      } else {
        caseCode += manager.nl + manager.indent + 'default:';
      }
      !inline && manager.increaseIndent() && (caseCode += manager.nl);
      caseCode += translate(c.consequent, '');
      !inline && manager.decreaseIndent();
      code += caseCode;
    }

    manager.decreaseIndent();
    return code + manager.nl + manager.indent + '}' + manager.nl + manager.voidline;
  },
};
