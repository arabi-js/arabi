// @flow

import path from 'path';
import fs from 'fs';
import * as parser from './محلل';
import handler from './مترجم/مدخل.js';
import { globalTranslatorCode, translatorCode } from './مساعدات';
import ScopeManager from './مدير-النطاق';
import { type Options as ParserOptions } from '../babel-parser/src/options';
import { type Options } from './خيارات';
import maps from '../خرائط-الترجمة/'; // DEV , delete this line in production

function validateOptions(options: Options) {
  if (!/(?:\t| )+/.test(options.indent))
    throw 'invalid indent unit! please set it to (space) or (tap)';
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
    // the source dest containing "options.input"
    // context needed incase you want to have 
    // the same files tree of context in your output folder.
    // we need tion option when output is dest
    context: './',
    indent: '  ',
    semicolon: true,
    renameIds: false,
    // when module is true, we will add 
    // another module called index.js 
    // in the dest file, make sure your 
    // file doesn't contain such a file... 
    // our index/js contains the global translator 
    // and maybe other code and will export 
    // the same things exported in your moduleEntry
    module: false,
    moduleEntry: undefined,
    maps, // DEV
    ...options,
  };

  // validation
  validateOptions(options);

  // helper props and methods
  handler.options = options;
  handler.maps = options.maps;
  handler.semi = options.semicolon ? ';' : '';
  handler.scope = new ScopeManager();

  parserOptions = {
    sourceType: 'unambiguous',
    createParenthesizedExpressions: true,
    ...parserOptions,
  };

  function translateFile(file) {
    let code = handler(fs.readFileSync(file, { encoding: 'utf8' }));
    let filename = path.resolve(options.output), dirname = fs.dirname(filename);
    if (fs.existsSync(filename) && fs.lstatSync(filename).isDirectory())
      throw 'can\'t overwrite an existing directory';
    return { filename, dirname, code };
  }

  let translatedCode;
  let header = '';

  if (options.input) {
    let input = path.resolve(options.input);
    if(!fs.existsSync(input)) throw 'input doesn\'t exists';

    let inputIsFile = fs.lstatSync(input).isFile();
    if (inputIsFile) {
      let tfile = translateFile(input);
      fs.mkdir(tfile.dirname, { recursive: true });
      fs.writeFileSync(tfile.filename, tfile.code);
    } else /* it is directory */ {

    }
    if (handler.importTranslator) {
      
    }
  } else if (options.code) {
    translatedCode = handler(parser.parse(options.code, parserOptions).program.body);
    if (options.maps.global) header += globalTranslatorCode.replace('GLOBAL_MAP', JSON.stringify(handler.maps.global)) + "\n";
    if (handler.importTranslator) header += translatorCode + "\n";
    return header + translatedCode;
  }

  throw 'we don\'t know what to translate';
}

Object.defineProperty(parser, '__info', {
  value: 'أنا نسخة معدلة من محلل بابل!',
});
Object.defineProperty(parser, '__info_', {
  value: 'I am a modified version of @babel/parser!',
});

export { parser };
