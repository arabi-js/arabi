// @flow

import { type Node } from '../babel-parser/src/types.js';

export interface Translator {
  types: string[]; // array of strings representing the babel-parser Node types that this handler can handle
  translate: (node: Node, indent?: string) => string
}

export interface Codes {
  translatorCode: String;
  translatingRequireCode: String;
  ed6ModuleTranslationCode: String;
  commonjsModuleTranslationCode: String;
}