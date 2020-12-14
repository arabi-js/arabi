// @flow

import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';

export const switchHandler: Handler = {
  types: ['SwitchStatement'],
  handle(node, indent = handler.indent) {
    let code = indent + 'switch(' + handler(node.discriminant, '') + ') {';
    handler.increaseIndent();

    // start adding cases here
    for (let c of node.cases) {
      let inline = c.consequent instanceof Array && c.consequent.length === 1;
      let caseCode = '';
      if (c.type !== 'SwitchCase')
        throw 'unexpected node "' + c.type + '" as switch case.';
      if (c.test) {
        caseCode += handler.nl + handler.indent + 'case ' + handler(c.test, '') + ':';
      } else {
        caseCode += handler.nl + handler.indent + 'default:';
      }
      !inline && handler.increaseIndent() && (caseCode += handler.nl);
      caseCode += handler(c.consequent, '');
      !inline && handler.decreaseIndent();
      code += caseCode;
    }

    handler.decreaseIndent();
    return code + handler.nl + handler.indent + '}' + handler.nl + handler.voidline;
  },
};
