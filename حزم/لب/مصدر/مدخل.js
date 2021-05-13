// @flow

import colors from 'colors'; // for console.log
import path from 'path';
import fs from 'fs';
import translateAST from './مترجم/مدخل';
import manager from './مترجم/مدير-الترجمة';
import * as helpers from './مساعدات';
import ScopeManager from './مدير-النطاق';
import { type ParserOptions } from './أنواع';
import { type Options, validateOptions } from './خيارات';

import parser from '@arabi/parser';
// lazy import, to plit the package into small modules.
// let parser = await import('./babel-parser/src/');

colors.setTheme({
  error: 'red',
  wran: 'yellow',
  success: 'green',
  info: 'blue'
});

Object.defineProperty(parser, '__info', {
  value: 'أنا نسخة معدلة من محلل بابل!'
});
Object.defineProperty(parser, '__info_', {
  value: 'I am a modified version of @babel/parser!'
});

export { parser };

let filesToCreate, modulesToTranslate;
// we need to translate module stored in modulesToTranslate
let tmodulesDir;
let parserOptions;

let log = helpers.log;

function translateCode(arCode) {
  let header = [];
  let options = manager.options;
  let lh = '/*****/ ';
  let code;

  let parserTree = parser.parse(arCode, parserOptions);
  code = translateAST(parserTree.program.body);
  manager.finishingValidation();

  manager.setLineHead(lh);

  // we have two cases
  // 1. translating directory containing connect modules
  // 2. translating independent files inside that directory
  let globalMap = manager.isModules
    ? options.maps.globalVars || {}
    : Object.assign({}, options.maps.global || {}, options.maps.globalVars || {});

  if (manager.isEntry && options.maps.global) {
    if (options.maps.modules && manager.isOutput('module')) {
      // create new module and import it
      let globalTransModuleName = './__arabi__global_translator__.js';
      let globalTransModulePath = path.resolve(
        path.dirname(manager._filepath),
        globalTransModuleName
      );
      manager.createFile({
        filepath: globalTransModulePath,
        generator() {
          manager.setLineHead(lh);
          return helpers.getGlobalTranslatorCode(options.maps.global);
        }
      });
      manager.addTopImport(globalTransModuleName);
    } else {
      // it can be commonjs
      let globalTranslatorCode = helpers.getGlobalTranslatorCode(options.maps.global);
      header.push(globalTranslatorCode);
    }
  } else if (!manager.isModules) {
    // incase of translating independent file
    // DONE: this code sould be added when `require` is used;
    // manager.addTranslateRequire = !!manager.maps.modules;
  }

  // globalMap is both `maps.global` and `maps.globalVars` compined
  // but in case of `isModules` it is `globalVars` only
  if (Object.keys(globalMap).length) {
    // TODO: add the referenced identifiers in this file only
    header.push(helpers.getVarsTranslatorCode(globalMap));
  }

  header.unshift(...helpers.getTopHeader());
  // you can skip the following lines
  // a separator commented lines, indicates that the
  // following code is the raw code but translated
  let separator = (() => {
    let _s = '// ############ ',
      __s = '// THE ORIGINAL TRANSLATED CODE ';
    let ss = __s + '-'.repeat(25);
    let s = _s + '-'.repeat(25 + (__s.length - _s.length));
    let separator = manager.nl + manager.nl + s + manager.nl + s;
    separator += manager.nl + ss;
    separator += manager.nl + manager.nl;
    return separator;
  })();

  if (header.length) header.push(manager.voidline), header.unshift(manager.voidline);
  // header, separator, code
  return header.join(manager.voidline) + separator + code;
}

function translateFile(file) {
  let code;
  try {
    code = translateCode(fs.readFileSync(file, { encoding: 'utf8' }));
  } catch (e) {
    throw 'in the file: '.info + file + '\n' + e.stack;
  }
  return code;
}

function translateDir(tree) {
  let options = manager.options;
  let p = path.relative(options.input, tree.path);
  p = path.resolve(options.output, p);
  fs.mkdirSync(p, { recursive: true });
  let _tree = { path: p, dirs: [], files: [] };

  log('handling dir:'.info, _tree.path);
  log.increaseIndent();

  for (let i = 0; i < tree.files.length; i++) {
    let f = tree.files[i];
    let _f = path.relative(options.input, f);
    _f = path.resolve(options.output, _f);
    // translate if test passed
    if (helpers.testFile(f)) {
      manager.reset();
      manager.isModules = !!options.entry; // redefine this always as manager.reset change it;
      manager.isEntry =
        manager.isModules && typeof options.entry === 'string' && f === path.resolve(options.entry);
      manager.filepath = f;
      manager._filepath = _f;
      manager.tmodulesDir = tmodulesDir;

      let jsCode = translateFile(f);

      manager.modulesToTranslate.forEach((a) => modulesToTranslate.add(a));
      // add them to the array to create translation modules after finishing the loop
      for (let newf of manager.filesToCreate) {
        for (let __ of filesToCreate) {
          if (__.filepath === newf.filepath)
            manager.error('Re-adding file', 'you are trying to generate the same file twice');
        }
        filesToCreate.push(newf);
      }

      // this doesn't affect the ES6 imports in other modules
      !options.keepExtension && (_f = _f + '.js');
      fs.writeFileSync(_f, jsCode);
      _tree.files.push(_f);
      log('file handled:'.success, _f);
    } else if (helpers.testGlobal(f)) {
      fs.copyFileSync(f, _f);
      _tree.files.push(_f);
      log('file copied:'.success.underline, _f);
    } else log('file ignored:'.info.underline, _f);
  }

  log.decreaseIndent();
  log();
  for (let d of tree.dirs) _tree.dirs.push(translateDir(d));
  return _tree;
}

// TODO: create sourcemap file if needed

export function translate(options: Options, _parserOptions: ParserOptions | null): string {
  filesToCreate = [];
  modulesToTranslate = new Set();

  if (!options) manager.error('Invalid Arguments', 'You have to pass options into the 1st arg!');

  options = {
    code: undefined,
    // exch one has entry, it maybe file or dest
    // ans hence the output,,, it maybe array with
    // the same length or on output with is dest or
    // file depending in th input
    input: undefined,
    output: undefined,
    indent: '  ',
    semicolon: true,
    // when module is true, we will add
    // another module called index.js
    // in the dest file, make sure your
    // file doesn't contain such a file...
    // our index.js contains the global translator
    // and maybe other code and will export
    // the same things exported in your moduleEntry
    inputType: 'module',
    runtime: true, // this is true by default when we translating a directory, so that we will reduce the overall size.
    debug: true, // to console.log during the translation process or not

    entry: false,

    // test for files to be translated!
    patterns: /\.(:?ar|جس|ج.س)$/,
    ignores: null, // ignore specific files when translating
    globalIgnores: null, // ignore files from being copied to the output when when translating dir && isModules
    keepExtension: false,
    ...options
  };

  options.outputType ||= options.inputType;
  options.globalObject ||= options.outputType === 'commonjs' ? 'global' : 'self'; // we can't use .isOutput as manager.options is not set yet

  // validation
  validateOptions(options);

  // helper props and methods
  manager.reset(); // set the defaults;
  manager.options = options;
  manager.maps = options.maps;
  manager.eol = options.semicolon ? ';\n' : '\n';
  manager.nl = '\n';
  manager.scope = new ScopeManager();

  if (!options.debug) colors.disable();

  parserOptions = {
    sourceType: manager.isInput('module')
      ? 'module'
      : manager.isInput('commonjs')
      ? 'script'
      : 'unambiguous',
    createParenthesizedExpressions: true,
    ..._parserOptions
  };

  //###################################
  // translate single file or directory
  //###################################

  if (options.input) {
    let input = path.resolve(options.input);
    helpers.checkInput(input);
    let inputIsFile = fs.statSync(input).isFile();

    if (inputIsFile) {
      let tfile = translateFile(input);
      if (options.output) {
        let filename = path.resolve(options.output);
        helpers.checkOutput(filename);
        let dirname = path.dirname(filename);
        fs.mkdirSync(dirname, { recursive: true });
        fs.writeFileSync(filename, tfile);
        log('file handled:', filename);
        return tfile;
      } else {
        return tfile;
      }
    }

    /* it is directory */
    let outputDir = path.resolve(options.output);
    helpers.checkOutput(outputDir);
    let inputTree = helpers.walk(input);

    log('Translating directory recursively...'.info.bold);

    tmodulesDir = path.resolve(outputDir, '__arabi__modules__');
    let outputTree = translateDir(inputTree);

    // translate modules in case of static imports such as exists in ES6.
    if (modulesToTranslate.size) {
      for (let _module of modulesToTranslate) {
        let m = helpers.translatingModuleGenerator(_module);
        filesToCreate.push(m);
      }
    }

    filesToCreate.length && (outputTree.newFiles = filesToCreate.map((f) => f.filepath));
    manager.filesToCreate = filesToCreate;
    helpers.createNewFiles();
    return outputTree;
  }

  //###################################
  // translate code
  //###################################

  if (options.code) {
    let translatedCode = translateCode(options.code);
    if (options.output) {
      let filename = path.resolve(options.output);
      helpers.checkOutput(filename);
      let dirname = path.dirname(filename);
      fs.mkdirSync(dirname, { recursive: true });
      fs.writeFileSync(filename, translatedCode);
      log('file created:'.success.bold.underline, filename);
    }
    return translatedCode;
  }

  manager.error('Invalid Option', "we don't know what to translate");
}
