// @flow

import path from 'path';
import fs from 'fs';
import handler from './مترجم/مدخل';
import {
  getTranslatorCode,
  getGlobalTranslatorCode,
  getVarsTranslatorCode,
  translateModule,
  translatingRequireCode,
  testFile, testGlobal,
  walk,
  debug
} from './مساعدات';
import ScopeManager from './مدير-النطاق';
import type { Options as ParserOptions } from '../babel-parser/src/options';
import type {Options } from './خيارات';
import { commonjs as maps } from '../خرائط-الترجمة/'; // DEV , delete this line in production

import * as parser from './babel-parser/src';
// lazy import, to plit the package into small modules.
// let parser = await import('./babel-parser/src/');

function validateOptions(options: Options) {
  if (!/(?:\t| )+/.test(options.indent))
    throw 'invalid indent unit! please set it to <space> or <tap>!';
  if (!/^(?:commonjs|es6|mixed)$/.test(options.moduleType))
    throw 'invalid moduleType, must be either "commonjs", "es6", or "mixed"!';
}

export function translate(
  options: Options,
  parserOptions: ParserOptions | null
): string {
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
    moduleType: 'es6', // possible values: es6, commonjs
    maps, // DEV
    runtime: true, // this is true by default when we translating a dirsctory, so that we will reduce the overall size.
    debug: true, // to console.log during the translation process or not

    entry: false,
    globalObject: "globalThis",
    // test for files to be translated!
    patterns: /\.(:?arjs|جس|ج.س)$/,
    ignores: null, // ignore specific files when translating 
    globalIgnores: null, // ignore files from being copied to the output when when translating dir && isModules
    keepExtension: false,
    ...options,
  };

  let modulesToTranslate = [];

  // validation
  validateOptions(options);

  // helper props and methods
  handler.options = options;
  handler.maps = options.maps;
  handler.semi = options.semicolon ? ';' : '';
  handler.scope = new ScopeManager();
  handler.reset(); // set the defaults;

  parserOptions = {
    sourceType: options.moduleType === 'es6' ? 'module' : options.moduleType === 'commonjs' ? 'script' : 'unambiguous',
    createParenthesizedExpressions: true,
    ...parserOptions,
  };

  /*
   * @return the js code from the arjs file
   */
  function translateFile(file) {
    let header = '';
    let code;

    try {
      let parserTree = parser.parse(fs.readFileSync(file, { encoding: 'utf8' }), parserOptions);
      code = handler(parserTree.program.body);
    } catch (e) {
      throw (
        e + '\n' +
        'in the file: ' + file
      );
    }

    let globalMap = handler.isModules
      ? options.maps?.globalVars || {}
      : Object.assign(
          {},
          options.maps?.global || {},
          options.maps?.globalVars || {}
        );

    if (
      handler.isModules && typeof options.entry === 'string' &&
      file === path.resolve(options.entry)
    ) {
      if(options.moduleType === 'commonjs' && options.maps?.modules) {
        header += translatingRequireCode.replace('MODULES_TRANSLATION_MAP', JSON.stringify(options.maps.modules)) + '\n\n';
      }
      if (options.maps?.global) {
        header += getGlobalTranslatorCode(options.maps.global) + '\n\n';
        handler.addTranslator = true;
      }
    }
    if (Object.keys(globalMap)) {
      header += getVarsTranslatorCode(globalMap) + '\n\n';
      handler.addTranslator = true;
    }
    if (handler.addTranslator) header = getTranslatorCode() + '\n\n' + header;

    return header + code;
  }

  function translateDir(tree) {
    let p = path.relative(options.input, tree.path);
    p = path.resolve(options.output, p);
    fs.mkdirSync(p, { recursive: true });
    let _tree = { path: p, dirs: [], files: [] };

    for (let f of tree.files) {
      let _f = path.relative(options.input, f);
      _f = path.resolve(options.output, _f);
      // translate if test passed
      if (testFile(f)) {
        debug('handling file:', f);
        handler.reset();
        handler.isModules = !!options.entry; // redefine this always as handler.reset change it;
        handler.filepath = f;

        // now we have handler.modulesToTranslate and handler.es6{imports,exports}
        // add them to the array to create translation modules after finishing the loop

        modulesToTranslate.concat(
          handler.modulesToTranslate.filter(
            a => modulesToTranslate.find(m => a === m) !== undefined
          )
        );

        let jsCode = translateFile(f);
        // this doesn't affect the ES6 imports in other modules 
        !options.keepExtension && (_f = _f + '.js');
        fs.writeFileSync(_f, jsCode);
        _tree.files.push(_f);
      } else if (testGlobal(f)) {
        debug('coping file:', _f);
        fs.copyFileSync(f, _f);
        _tree.files.push(_f);
      } else 
        debug('file ignored:', _f);
    }

    for (let d of tree.dirs) _tree.dirs.push(translateDir(d));

    return _tree;
  }

  let translatedCode;
  let header = '';

  if (options.input) {
    let input = path.resolve(options.input);
    if (!fs.existsSync(input)) throw "input doesn't exists:\n" + input;
    let inputIsFile = fs.statSync(input).isFile();

    if (inputIsFile) {
      let tfile = translateFile(input);
      if (options.output) {
        let filename = path.resolve(options.output);
        let dirname = path.dirname(filename);
        if (
          fs.existsSync(filename) &&
          !(fs.statSync(filename).isDirectory() && !fs.readdirSync(filename))
        )
          // something exists in the path of options.output, and is not a void dir
          throw "can't overwrite an existing file or un-empty dir:\n" + filename;
        fs.mkdirSync(dirname, { recursive: true });
        fs.writeFileSync(filename, tfile);
        return tfile;
      } else {
        return tfile;
      }
    } /* it is directory */ else {
      let outputDir = path.resolve(options.output);
      let inputTree = walk(input);
      if (
        fs.existsSync(outputDir) &&
        !(fs.statSync(outputDir).isDirectory() && !fs.readdirSync(outputDir))
      )
        // something exists in the path of options.output, and is not a void dir
        throw "can't overwrite an existing file or un-empty dir:\n" + outputDir;

      debug('translating directory recursively...');
      let outputTree = translateDir(inputTree);

      // we need to translate module stored in modulesToTranslate
      let tmodulesDir = path.resolve(outputDir, '__arjs__modules__');
      if (modulesToTranslate.length) {
        let treeDir = { path: tmodulesDir, dirs:[], files: [] };
        fs.mkdirSync(tmodulesDir); // no need to recursive mkdir
        outputTree.dirs.push(treeDir);
        for (let m of modulesToTranslate) {
          let f = translateModule(m, tmodulesDir);
          treeDir.files.push(f);
        }
      }

      return outputTree;
    }
  } else if (options.code) {

    function translateCode()  {
      translatedCode = handler(
        parser.parse(options.code, parserOptions).program.body
      );
      let globalMap = Object.assign(
        {},
        options.maps?.global || {},
        options.maps?.globalVars || {}
      );
      if (Object.keys(globalMap)) {
        header += getVarsTranslatorCode(globalMap) + '\n\n';
        handler.addTranslator = true;
      }
      if (handler.addTranslator) header = getTranslatorCode() + '\n\n' + header;
      return header + translatedCode;
    }

    if (options.output) {
      let filename = path.resolve(options.output);
      let dirname = path.dirname(filename);
      if (
        fs.existsSync(filename) &&
        !(fs.statSync(filename).isDirectory() && !fs.readdirSync(filename))
      )
        // something exists in the path of options.output, and is not a void dir
        throw "can't overwrite an existing file or un-empty dir:\n" + filename;
      fs.mkdirSync(dirname, { recursive: true });
      translatedCode = translateCode();
      fs.writeFileSync(filename, translatedCode);
      return translatedCode;
    } else {
      return translateCode();
    }
  }

  throw "we don't know what to translate";
}

Object.defineProperty(parser, '__info', {
  value: 'أنا نسخة معدلة من محلل بابل!',
});
Object.defineProperty(parser, '__info_', {
  value: 'I am a modified version of @babel/parser!',
});

export { parser };
