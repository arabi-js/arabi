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

function setIndent(v) {
  if (typeof v !== 'number' || v < 0 || v % 1 !== 0)
    throw 'invalid value for indentation, count of indents must be positive integer or zer0';
  handler.indentCount = v;
  handler.indent =
    new Array(handler.indentCount)
    .fill(handler.options.indent)
    .join('');
}

handler.increaseIndent = () => setIndent(handler.indentCount + 1);
handler.decreaseIndent = () => setIndent(handler.indentCount - 1);

handler.defaults = {
}

handler.reset = function resetHandler() {
  handler.addTranslator = false;
  handler.indentCount = 0;
  handler.indent = '';
  // will be in the dir /path/to/output/__arjs__modules__/
  handler.modulesToTranslate = []; 
  handler.isModules = false; // translating directory and options.entry is set
  handler.filepath = undefined;
  handler.es6imports = {};
  handler.es6exports = {};
}

