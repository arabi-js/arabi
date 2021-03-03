// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { type Translator } from '../../أنواع.js';

export const tryTranslator: Translator = {
  types: ['TryStatement'],
  translate(node, indent = manager.indent) {
    // node.handler.param is Identifier
    let catchClause =
      `catch (${node.handler.param.name}) ` +
      translate(node.handler.body, '');

    let code =
      indent + 'try ' +
      // block statement, there is manage.nl after "}"
      translate(node.body, '') +
      // indent, then add the CatchClause
      manager.indent + catchClause;

    // the `finally { ... }` part
    if (node.finalizer)
      code += `${manager.indent}finally ` + translate(node.finalizer, '');
    
    return code;
  }
};