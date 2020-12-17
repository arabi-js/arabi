
// @flow

/**
 * vars has to be collected first then
 */

interface BlockScope {
  lexical: Set<string>; // for example define inside a for loop
}

interface Closure {
  vars: Set<string>;
  functions: Set<string>;
}

export default class ScopeManager {

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
    const theNewScope: BlockScope = {
      lexicals: new Set()
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
    const theNewClosure: Colsure = {
      vars: new Set(),
      functions: new Set(),
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
    for(let b of this.blockScopes) {
      if (b.lexicals.has(name)) return true;
    }
    for(let c of this.closures) {
      if (c.vars.has(name)) return true;
      if (c.functions.has(name)) return true;
    }
  }

  //#region vars

  addVar(name: string) {
    this.curClosure.vars.add(name);
  }

  addVars(names: string[]) {
    for (let n of names)
      this.addVar(n);
  }

  deleteVar(name: string) {
    // use splice prototype (built-in) array function
    this.curClosure.vars.delete(name);
  }

  hasVar(name: string) {
    for(let c of this.closures) {
      if (c.vars.has(name)) return true;
    }
  }

  clearVars() {
    this.curClosure.vars = new Set();
  }

  //#endregion

  //#region functions

  addFunction(name: string) {
    this.curClosure.functions.add(name);
  }

  addFunctions(names: string[]) {
    for (let n of names)
      this.addFunction(n);
  }

  deleteFunction(name: string) {
    // use splice prototype (built-in) array function
    this.curClosure.functions.delete(name);
  }

  hasFunction(name: string) {
    for(let c of this.closures) {
      if (c.functions.has(name)) return true;
    }
  }

  clearFunctions() { 
    this.curClosure.functions = new Set();
  }

  //#endregion

  //#region lets

  addLexical(name: string) {
    this.curBlockScope.lexicals.add(name);
  }

  addLexicals(names: string[]) {
    for (let n of names)
      this.addLexical(n);
  }

  deleteLexical(name: string) {
    // use splice prototype (built-in) array function
    this.curBlockScope.lexicals.delete(name);
  }

  hasLexical(name: string) {
    for(let b of this.blockScopes) {
      if (b.lexicals.has(name)) return true;
    }
  }

  clearLexical() { 
    this.curBlockScope.lexicals = [];
  }

  //#endregion

}
