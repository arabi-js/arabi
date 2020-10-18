/**
 * vars has to be collected first then
 */

type BlockScope = {
  lexical: Array<string>, // for example define inside a for loop
};

type Closure = {
  vars: Array<string>,
  functions: Array<string>,
};

export default class ScopeHandler {

  // any block { ...code } start new block scope under the LEFO priciple
  // but the function block is different;
  // you can notice the the block here is a standalone statement
  // but the block of a function is not a statement, it is necessary.
  // the whole function syntax is a statement 
  blockScopes: Array<BlockScope> =  [];

  // constains the global closure of the whole program by default
  // in addition to a new closure per function 
  closures: Array<Closure> = [];

  curBlockScope = null;
  curClosure = null;

  constructor() {
    [ this.globalColsure, this.globalBlock ] = this.startClosure();
  }

  startBlockScope() {
    const theNewScope: closure = {
      vars: [],
      functions: [],
      lexical: []
    };

    this.blockScopes.push(theNewScope);
    this.curBlockScope = theNewScope; 
    return theNewScope;
  }

  endBlockScope() {
    let scope =  this.blockScopes.pop();
    this.curBlockScope = this.blockScopes.length > 0 ? this.blockScopes[this.blockScopes.length-1] : null;
    return scope;
  }

  startClosure() {
    const theNewClosure: closure = {
      vars: [],
      functions: [],
    };

    this.closures.push(theNewClosure);
    this.curClosure = theNewClosure;

    return [ theNewClosure, this.startBlockScope() ];
  }

  endClosure() {
    this.endBlockScope();
    let clos = this.closures.pop();
    this.curClosure = this.closures[this.closures.length - 1];
    return clos;
  }

  has(name: string) {
    return this.hasVar(name) || this.hasFunction(name) || this.hasLexical(name);
  }

  //#region vars

  addVar(name: string) {
    this.curClosure.vars.push(name);
  }

  addVars(...names: string | Array) {
    for (let n of names) {
      (n instanceof Array && n.forEach(_=>this.addVar(_)));
      (typeof n === 'string' && this.addVar(n));
    }
  }

  deleteVar(name: string) {
    // use splice prototype (built-in) array function
    this.curClosure.vars.splice(this.curClosure.vars.indexOf(name), 1);
  }

  hasVar(name: string) {
    return this.curClosure.vars.indexOf(name) > -1;
  }

  clearVars() {
    this.curClosure.vars = [];
  }

  //#endregion

  //#region functions

  addFunction(name: string) {
    this.curClosure.functions.push(name);
  }

  addFunctions(...names: string | Array) {
    for (let n of names) {
      (n instanceof Array && n.forEach(_=>this.addFunction(_)));
      (typeof n === 'string' && this.addFunction(n));
    }
  }

  deleteFunction(name: string) {
    // use splice prototype (built-in) array function
    this.curClosure.functions.splice(this.curClosure.functions.indexOf(name), 1);
  }

  hasFunction(name: string) {
    return this.curClosure.functions.indexOf(name) > -1;
  }

  clearFunctions() { 
    this.curClosure.functions = [];
  }

  //#endregion

  //#region lets

  addLexical(name: string) {
    this.curBlockScope.lexical.push(name);
  }

  addLexicals(...names: string | Array) {
    for (let n of names) {
      (n instanceof Array && n.forEach(_=>this.addLexical(_)));
      (typeof n === 'string' && this.addLexical(n));
    }
  }

  deleteLexical(name: string) {
    // use splice prototype (built-in) array function
    this.curBlockScope.lexical.splice(this.curBlockScope.lexical.indexOf(name), 1);
  }

  hasLexical(name: string) {
    return this.curBlockScope.lexical.indexOf(name) > -1;
  }

  clearLexical() { 
    this.curBlockScope.lexical = [];
  }

  //#endregion

}
