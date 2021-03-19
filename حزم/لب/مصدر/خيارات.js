// @flow

/**
 * this file holds the global configurations for the whole project
 */

import manager from './مترجم/مدير-الترجمة';

export interface GlobalMap {
  global: BasicTranslationMap;
  globalVars: BasicTranslationMap;
  modules: BasicTranslationMap;
}

export interface BasicTranslationMap {
  [ArabicName: string]: | string
    | /* EnglishName */ [
        string, // English Name
        TranslationMap,
        ?TranslationMapOptions
      ];
}

export type TranslationMap = BasicTranslationMap | ((obj: object) => BasicTranslationMap);

export type ModuleType = 'module' | 'commonjs';

export interface Options {
  code: string;
  input?: string; // file or directory
  output?: string; // dependant on the input or code
  maps?: GlobalMap;
  inputType: ModuleType;
  outputType: ModuleType;
  // to import the repeatedly used function,
  // this is helpful when translating some connected modules,
  // input='/path/to/dir/', output='/path/to/output/dir'
  runtime: Boolean; // = true
  // path to the entry file if you are translating a directory containing connected modules
  // if not defined, the dir is translated aw you are translating each file speparately
  entry: string;
  // the global object to define new properties with arabic names dependant on "maps.global" and "maps.globalThis"
  globalObject: string; // = "globalThis";
  // test for files to be translated!
  patterns: Test; // = /\.(:?arabi|جس|ج.س)$/;
  ignores: Test; // ignore specific files when translating
  // when the test "patterns" fails, the file is copied to the output directory
  // ignore files from being copied to the output when when translating dir && isModules
  globalIgnores: Test;

  //##** less important options

  // if you want to keep the extensions of the input files, which
  // passed the patterns and ignores tests, unchanged.
  keepExtension: Boolean; // = false;
  debug?: Boolean; // = true;
  indent?: string; // = '  ';
  // enable or disable verbose loging during the translation process
  semicolon?: Boolean; // = true;
}

// use `shema-utils` for validation
export function validateOptions(options: Options) {
  // use schema-utils
  if (!/(?:\t| )+/.test(options.indent))
    manager.error(
      'Invalid Option',
      'invalid indent unit! please set it to a compination of <space>s and <tap>s!'
    );
  if (!/^(?:commonjs|module|mixed)$/.test(options.outputType))
    manager.error(
      'Invalid Option',
      'invalid outputType, must be either "commonjs", "module", or "mixed"!'
    );
}
