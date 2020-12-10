import { type Node } from '../babel-parser/src/types.js';
import handler from './مترجم/مدخل.js';

export interface Handler {
  types: string[]; // array of strings representing the babel-parser Node types that this handler can handle
  handle: (node: Node, indent?:string=handler.indent) => string
}

export interface Codes {
  translatorCode: String;
  translatingRequireCode: String;
  ed6ModuleTranslationCode: String;
  commonjsModuleTranslationCode: String;
}