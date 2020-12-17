// @flow

import handlers from './معالجات/مدخل';
import { type Node } from '../../babel-parser/src/types.js';

export default function handler(node: Node, indent?: string): string {
  if (Array.isArray(node))
    return handler.handleArray(
      node.map((a, i) => handler(a, !i ? indent : handler.indent))
    );
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

Object.defineProperty(handler, 'translatorFunctionName', {
  get() {
    this.addTranslator = true;
    return '__arabi__translate__';
  }
});

Object.defineProperty(handler, 'translateRequireFunctnionName', {
  get() {
    this.addTranslateRequire = true;
    this.declareModulesTMap = true;
    return '__arabi__translate__require__';
  }
});

Object.defineProperty(handler, 'trfnName2', {
  get() { 
    this.addTranslateRequire = true;
    return '__arabi__translate__require__'
  },
});

Object.defineProperty(handler, 'functionDepth', {
  get() { return this.__fdpth },
  set(v) { if (v<0 || v%1!==0) throw "handler.functionDepth should be int>=0"; this.__fdpth = v },
});

handler.handleArray = function handleArray(a: [ string | Array ]) {
  // reduce then join,,, built-in Array methods
  return a.reduce((newA, c)=>{
    // comma operator is used here, exec the ternary operator
    // then return the last expression which is `newA`
    return (
      typeof c === 'string' ? newA.push(c)
      : newA.push(
        this.voidline, this.handleArray(c), this.voidline
      ), /* returned value */ newA
    );
  }, []).join('');
}

handler.addTopImport = function (source, ...specifiers) {
  if (!(source in this.topImports)) this.topImports[source] = [];
  this.topImports[source].push(...specifiers);
}

handler.setIndent = function setIndent(v) {
  if (typeof v !== 'number' || v < 0 || v % 1 !== 0)
    throw 'invalid value for indentation, count of indents must be positive integer or zer0';
  this.indentCount = v;
  this.__indent =
    new Array(this.indentCount)
    .fill(this.options.indent)
    .join('');
}

handler.increaseIndent = () => handler.setIndent(handler.indentCount + 1);
handler.decreaseIndent = () => handler.setIndent(handler.indentCount - 1);

handler.setLineHead = function (lh) {
  this.__lineHead = lh;
  this.setIndent(this.indentCount);
}

handler.error = function(node, ...msgs) {
  let a;
  let _msg = typeof node === "string" ? (a=node, node=null, a) : "Translation error:";
  let msg = _msg.bgRed.white;
  msgs.forEach(m => msg += '\n' + "      " + m.error);
  node?.loc && (msg += '\n' + "      " + `${this.filepath}:${node.loc.start.line}:${node.loc.start.column}`);
  node?.loc?.source && (msg += '\n' + "      " + node.loc.source);
  throw new Error(msg);
}

handler.warn = function(node, ...msgs) {
  console.log("WARN:".bgYellow.white);
  msgs.forEach(m=>{
    console.log("      ", m.warn);
  });
  node && node.loc && console.log("      ", `${this.filepath}:${node.loc.start.line}:${node.loc.start.column}`);
  node && node.loc && console.log("      ", node.loc.source);
}

// TODO: collect the scope variables as all functions and "var"s
// are defined at the begining, then "vars" are assigned 
// when its declaration statement come;

handler.reset = function resetHandler() {
  this.addTranslator = false;
  this.addTranslateRequire = false;
  this.declareModulesTMap = false;
  this.indentCount = 0;
  // to know if we have the identifier "arguments" defined or not
  this.functionDepth = 0;
  this.__indent = '';
  this.__lineHead = '';
  // will be in the dir /path/to/output/__arabi__modules__/
  this.modulesToTranslate = []; 
  // the dependencies that the cureent file imports, or requires
  // { [source: string]: [ [ string /* name */, string /* localName */ ] ] }
  this.topImports = {};
  // translating directory and options.entry is set
  this.isModules = false;
  this.filepath = undefined;
  this.es6imports = {};
  this.es6exports = {};
  this.tmodulesDir = null;
}

handler.finishingValidation = function () {
  if(this.functionDepth !== 0) this.error(null, 'Unexpected `handler.functionDepth`, it should be 0 after the translation process!');
}
