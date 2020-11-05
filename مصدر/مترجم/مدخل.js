// @flow

import handlers from './معالجات/مدخل';
import { type Node } from '../../babel-parser/src/types.js';

export default function handler(node: Node, indent?: string): string {
  if (node instanceof Array)
    return node
      .map((a, i) => handler(a, !i ? indent : handler.indent))
      .join('\n\n');
  if (node && node.type in handlers) return handlers[node.type](node, indent);
  throw (
    'نأسف أن ليس لدينا معالجات ترجمة لهذا مؤقتا: ' +
    node.type +
    '\n' +
    "we can't handle this syntax at the time: " +
    node.type +
    '\n' +
    JSON.stringify(node.loc, null, 2)
  );
}

// NOTICE: the inline statement such as Idetifier and CallExpression won't be indented.
let indentCount = 0;
function setIndent(v) {
  if (typeof v !== 'number' || v < 0 || v % 1 !== 0)
    throw 'invalid value for indentation, count of indents must be positive integer or zer0';
  indentCount = handler.indentCount = v;
  handler.indent =
    new Array(indentCount)
    .fill(handler.options.indent)
    .join('');
}

handler.increaseIndent = () => setIndent(handler.indentCount + 1);
handler.decreaseIndent = () => setIndent(handler.indentCount - 1);
handler.indent = '';
