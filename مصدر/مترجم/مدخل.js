// @flow

import handlers from './معالجات/مدخل';
import { type Node } from '../../babel-parser/src/types.js';

export default function handler(node: Node, indent?: string): string {
  if (node instanceof Array)
    return node
      .map((a, i) => handler(a, !i ? indent : handler.indent))
      .join('');
  if (node && node.type in handlers) return handlers[node.type](node, indent);
  handler.error(
    node,
    `نأسف أن ليس لدينا معالجات ترجمة لهذا مؤقتا: ${node.type}`,
    `we can't handle this syntax at the time: ${node.type}`
  );
}

Object.defineProperty(handler, 'indent', {
  get(){ return this.__lineHead + this.__indent }
});

Object.defineProperty(handler, 'voidline', {
  get(){ return this.__lineHead + this.nl }
});

Object.defineProperty(handler, 'tfnName', {
  get() {
    this.addTranslator = true;
    return '__arjs__translate__';
  }
});

Object.defineProperty(handler, 'trfnName', {
  get() {
    this.addTranslateRequire = true;
    this.declareModulesTMap = true;
    return '__arjs__translate__require__';
  }
});

Object.defineProperty(handler, 'trfnName2', {
  get() { 
    this.addTranslateRequire = true;
    return '__arjs__translate__require__'
  },
});

Object.defineProperty(handler, 'functionDepth', {
  get() { return this.__fdpth },
  set(v) { if (v<0 || v%1!==0) throw "handler.functionDepth should be int>=0"; this.__fdpth = v },
});

handler.setIndent = function setIndent(v) {
  if (typeof v !== 'number' || v < 0 || v % 1 !== 0)
    throw 'invalid value for indentation, count of indents must be positive integer or zer0';
  handler.indentCount = v;
  handler.__indent =
    new Array(handler.indentCount)
    .fill(handler.options.indent)
    .join('');
}

handler.increaseIndent = () => handler.setIndent(handler.indentCount + 1);
handler.decreaseIndent = () => handler.setIndent(handler.indentCount - 1);

handler.setLineHead = function (lh) {
  handler.__lineHead = lh;
  handler.setIndent(handler.indentCount);
}

handler.error = function(node, ...msgs) {
  let a;
  let _msg = typeof node === "string" ? (a=node, node=null, a) : "Translation error:";
  let msg = _msg.bgRed.white;
  msgs.forEach(m => msg += '\n' + "      " + m.error);
  node?.loc && (msg += '\n' + "      " + `${handler.filepath}:${node.loc.start.line}:${node.loc.start.column}`);
  node?.loc?.source && (msg += '\n' + "      " + node.loc.source);
  throw new Error(msg);
}

handler.warn = function(node, ...msgs) {
  console.log("WARN:".bgYellow.white);
  msgs.forEach(m=>{
    console.log("      ", m.warn);
  });
  node && node.loc && console.log("      ", `${handler.filepath}:${node.loc.start.line}:${node.loc.start.column}`);
  node && node.loc && console.log("      ", node.loc.source);
}

// TODO: collect the scope variables as all functions and "var"s
// are defined at the begining, then "vars" are assigned 
// when its declaration statement come;

handler.reset = function resetHandler() {
  handler.addTranslator = false;
  handler.addTranslateRequire = false;
  handler.declareModulesTMap = false;
  handler.indentCount = 0;
  // to know if we have the identifier "arguments" defined or not
  handler.functionDepth = 0;
  handler.__indent = '';
  handler.__lineHead = '';
  // will be in the dir /path/to/output/__arjs__modules__/
  handler.modulesToTranslate = []; 
  handler.arjsTranslateImports = []; 
  handler.isModules = false; // translating directory and options.entry is set
  handler.filepath = undefined;
  handler.es6imports = {};
  handler.es6exports = {};
  handler.tmodulesDir = null;
}

handler.finishingValidation = function () {
  if(this.functionDepth !== 0) this.error(null, 'Unexpected `handler.functionDepth`, it should be 0 after the translation process!');
}
