
class LineManager {
  get indent(){ return this.__lineHead + this.__indent }
  get voidline(){ return this.__lineHead + this.nl }

  increaseIndent = () => this.setIndent(this.indentCount + 1);
  decreaseIndent = () => this.setIndent(this.indentCount - 1);

  setIndent(v) {
    if (typeof v !== 'number' || v < 0 || v % 1 !== 0)
      throw 'invalid value for indentation, count of indents must be positive integer or zer0';
    this.indentCount = v;
    this.__indent =
      new Array(this.indentCount)
      .fill(this.options.indent)
      .join('');
  }

  setLineHead(lh) {
    this.__lineHead = lh;
    this.setIndent(this.indentCount);
  }
}

class NamesAddtionalCodeManager extends LineManager {
  get translatorFunctionName() {
    this.addTranslator = true;
    return '__arabi__translate__';
  }

  get translateRequireFunctnionName() {
    this.addTranslateRequire = true;
    this.declareModulesTMap = true;
    return '__arabi__translate__require__';
  }

  get translateRequireFunctionName__2() { 
    this.addTranslateRequire = true;
    return '__arabi__translate__require__'
  }
}

class Manager extends NamesAddtionalCodeManager {

  get functionDepth() { return this.__fdpth }
  set functionDepth(v) {
    if (v<0 || v%1!==0) throw "manager.functionDepth should be int>=0";
    this.__fdpth = v
  }

  addTopImport (source, ...specifiers) {
    if (!(source in this.topImports)) this.topImports[source] = [];
    this.topImports[source].push(...specifiers);
  }

  error(node, ...msgs) {
    let a;
    let _msg = typeof node === "string" ? (a=node, node=null, a) : "Translation error:";
    let msg = _msg.bgRed.white;
    msgs.forEach(m => msg += '\n' + "      " + m.error);
    node?.loc && (msg += '\n' + "      " + `${this.filepath}:${node.loc.start.line}:${node.loc.start.column}`);
    node?.loc?.source && (msg += '\n' + "      " + node.loc.source);
    throw new Error(msg);
  }

  warn(node, ...msgs) {
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

  reset() {
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

  finishingValidation() {
    if(this.functionDepth !== 0) this.error(null, 'Unexpected `manager.functionDepth`, it should be 0 after the translation process!');
  }
}

export default new Manager();
