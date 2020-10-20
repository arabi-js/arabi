// @flow

// import parser from './محلل';
import * as parser from '../babel-parser/src/';
import handler from './مترجم/مدخل.js';
import ScopeManager from './مدير-النطاق';
import { type Options as ParserOptions } from '../babel-parser/src/options';
import { type Options } from './خيارات';

function validateOptions(options: Options) {
  if (typeof options.indentSize !== 'number' || options.indentSize < 1)
    throw 'Please set the indentSize to a positive value';
  if (!/\t| /.test(options.indentUnit))
    throw 'invalid indent unit! please set it to (space) or (tap)';
}

export function translate(
  arabicCode: string,
  options: Options,
  parserOptions: ParserOptions
): string {
  options = {
    indentSize: 2,
    indentUnit: ' ',
    semicolon: true,
    renameNames: false,
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

  return handler(parser.parse(arabicCode, parserOptions).program.body);
}

Object.defineProperty(parser, '__info', {
  value: 'أنا نسخة معدلة من محلل بابل!',
});
Object.defineProperty(parser, '__info_', {
  value: 'I am a modified version of @babel/parser!',
});

export { parser };
