import handlers from './معالجات/مدخل'
import { type Node } from '../../babel-parser/src/types.js';

export default function handler(node: Node, indent?: string): string {
  if (node) for (let h of handlers) {
    if (h.test(node)) {
      return h.handle(node, indent);
    }
  }
  throw "نأسف أن ليس لدينا معالجات ترجمة لهذا مؤقتا: " + node.type + "\n" +
    "we can't handle this syntax at the time: " + node.type + "\n" +
    JSON.stringify(node.loc, null, 2);
}

// NOTICE: the inline statement such as Idetifier and CallExpression won't be indented.
let indentCount = 0;
Object.defineProperty(handler, 'indentCount', {
  get() {
    return indentCount;
  },
  set(v) {
    if(typeof v !== 'number' || v < 0 || v%1 !== 0)
    throw "invalid value for indentation, count of indents must be positive integer or zer0"
    indentCount = v;
    handler.indent = new Array(handler.options.indentSize * indentCount).fill(handler.options.indentUnit).join(''); 
  }
});
handler.increaseIndent = () => ++handler.indentCount;
handler.decreaseIndent = () => --handler.indentCount;
handler.indent = "";
