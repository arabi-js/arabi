// @flow

import { type ModuleType } from '../خيارات';

class LineManager {
  get indent() {
    return this.__lineHead + this.__indent;
  }
  get voidline() {
    return this.__lineHead + this.nl;
  }

  increaseIndent = () => this.setIndent(this.indentCount + 1);
  decreaseIndent = () => this.setIndent(this.indentCount - 1);

  setIndent(v) {
    if (typeof v !== 'number' || v < 0 || v % 1 !== 0)
      throw 'invalid value for indentation, count of indents must be positive integer or zer0';
    this.indentCount = v;
    this.__indent = new Array(this.indentCount).fill(this.options.indent).join('');
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
    this.declareModulesTMap = this.isEntry || !this.isModules;
    return '__arabi__translate__require__';
  }

  get translateRequireFunctionName__2() {
    // we can do this like we did in parseStringifiedFunctionName
    // but the point is, we call a helper function to
    // add the code if `!this.options.runtime`
    this.addTranslateRequire = true;
    return '__arabi__translate__require__';
  }

  get parseStringifiedFunctionName() {
    let fnName = '__flatted__parse__';
    !this.__parseImported &&
      this.addTopImport('flatted', { specifiers: [{ name: 'parse', local: fnName }] });
    this.__parseImported = true;
    return fnName;
  }

  reset() {
    super.reset && super.reset();
    this.enableParseStringified = true;
    this.__parseImported = false;
  }
}

class Manager extends NamesAddtionalCodeManager {
  get functionDepth() {
    return this.__fdpth;
  }
  set functionDepth(v) {
    if (v < 0 || v % 1 !== 0) throw 'manager.functionDepth should be int>=0';
    this.__fdpth = v;
  }

  isInput(type: ModuleType) {
    return this.options.inputType === type;
  }

  isOutput(type: ModuleType) {
    return this.options.outputType === type;
  }

  addTopImport(source, imports) {
    if (!(source in this.topImports)) {
      this.topImports[source] = imports;
      return;
    }

    let curImports = this.topImports[source];

    if (imports.specifiers) {
      let s = (curImports.specifiers ||= []);
      for (let _ of imports.specifiers) {
        // make sure it is not imported before then push
        for (let __ of s)
          if (_.name === __.name && _.local !== __.local)
            this.error(
              'Add Top Import Error',
              `"${_.name}" is imported manytimes with different local names from "${source}"`
            );
        s.push(_);
      }
    }

    if (imports.default && curImports.default && imports.default !== curImports.default)
      this.error(
        'Add Top Import Error',
        'trying to import default twice with dfferent local names'
      );
    curImports.default ||= imports.default;

    if (imports.namespace && curImports.namespace && imports.namespace !== curImports.namespace)
      this.error(
        'Add Top Import Error',
        'trying to import namespace twice with dfferent local names'
      );
    curImports.namespace ||= imports.namespace;

    if (this.isOutput('module')) {
      if (curImports.namespace && curImports.specifiers && curImports.specifiers.length)
        this.error(
          'Add Top Import Error',
          'trying to import namespace and specifiers at the same time'
        );
    } else {
      // ony default or specifers
      if (curImports.namespace || (curImports.default && curImports.specifiers))
        this.error(
          'Add Top Import Error',
          "can't import (or require) default and something else (specifiers or namespace) at the same time in non-es6 modules"
        );
    }
  }

  addFile(file) {
    if (!this.isModules)
      this.error(
        'Function Abuse',
        'you can only create new files incase of translating connected modules inside a dir'
      );
    this.filesToAdd.push(file);
  }

  error(node, ...msgs) {
    let a;
    let _msg = typeof node === 'string' ? ((a = node), (node = null), a) : 'Translation error:';
    let msg = _msg.bgRed.white;
    msgs.forEach((m) => (msg += '\n' + '      ' + m.error));
    node?.loc &&
      (msg += '\n' + '      ' + `${this.filepath}:${node.loc.start.line}:${node.loc.start.column}`);
    node?.loc?.source && (msg += '\n' + '      ' + node.loc.source);
    throw new Error(msg);
  }

  warn(node, ...msgs) {
    console.log('WARN:'.bgYellow.white);
    msgs.forEach((m) => {
      console.log('      ', m.warn);
    });
    node &&
      node.loc &&
      console.log('      ', `${this.filepath}:${node.loc.start.line}:${node.loc.start.column}`);
    node && node.loc && console.log('      ', node.loc.source);
  }

  finishingValidation() {
    if (this.functionDepth !== 0)
      this.error(
        null,
        'Unexpected `manager.functionDepth`, it should be 0 after the translation process!'
      );
  }

  reset() {
    super.reset && super.reset();
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
    this.filesToAdd = [];
    // translating directory and options.entry is set
    this.isModules = false;
    this.isEntry = false;
    this.filepath = undefined;
    this.tmodulesDir = null;
  }
}

export default new Manager();
