// @flow

import { type Node } from '../babel-parser/src/types.js';

export interface Translator {
  types: string[]; // array of strings representing the babel-parser Node types that this handler can handle
  translate: (node: Node, indent?: string) => string
}

/**
 * used in ./مساعدات
 */
export interface Codes {
  getTranslatorCode: ()=>string;
  getTranslatingRequireCode: ()=>string;
  ed6ModuleTranslationCode: string;
  commonjsModuleTranslationCode: string;
}

export type SourceType = "script" | "module" | "unambiguous";
export type Plugin = string | [string, Object];
export type PluginList = $ReadOnlyArray<Plugin>;
export type ParserOptions = {
  sourceType: SourceType,
  sourceFilename?: string,
  startLine: number,
  allowAwaitOutsideFunction: boolean,
  allowReturnOutsideFunction: boolean,
  allowImportExportEverywhere: boolean,
  allowSuperOutsideMethod: boolean,
  allowUndeclaredExports: boolean,
  plugins: PluginList,
  strictMode: ?boolean,
  ranges: boolean,
  tokens: boolean,
  createParenthesizedExpressions: boolean,
  errorRecovery: boolean,
};
