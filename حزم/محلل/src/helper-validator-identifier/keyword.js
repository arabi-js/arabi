// @flow

import * as keyMap from '../keywords-map';

const reservedWords = {
  keyword: [
    keyMap._break,
    keyMap._case,
    keyMap._catch,
    keyMap._continue,
    keyMap._debugger,
    keyMap._default,
    keyMap._do,
    keyMap._else,
    keyMap._finally,
    keyMap._for,
    keyMap._function,
    keyMap._if,
    keyMap._return,
    keyMap._switch,
    keyMap._throw,
    keyMap._try,
    keyMap._var,
    keyMap._const,
    keyMap._while,
    keyMap._with,
    keyMap._new,
    keyMap._this,
    keyMap._super,
    keyMap._class,
    keyMap._extends,
    keyMap._export,
    keyMap._import,
    keyMap._null,
    keyMap._true,
    keyMap._false,
    keyMap._in,
    keyMap._instanceof,
    keyMap._typeof,
    keyMap._void,
    keyMap._delete,
  ],
  strict: [
    keyMap._implements,
    keyMap._interface,
    keyMap._let,
    keyMap._package,
    keyMap._private,
    keyMap._protected,
    keyMap._public,
    keyMap._static,
    keyMap._yield,
  ],
  strictBind: [keyMap._eval, keyMap._arguments],
};

const keywords = new Set(reservedWords.keyword);
const reservedWordsStrictSet = new Set(reservedWords.strict);
const reservedWordsStrictBindSet = new Set(reservedWords.strictBind);

/**
 * Checks if word is a reserved word in non-strict mode
 */
export function isReservedWord(word: string, inModule: boolean): boolean {
  return (inModule && word === keyMap._await) || word === keyMap._enum;
}

/**
 * Checks if word is a reserved word in non-binding strict mode
 *
 * Includes non-strict reserved words
 */
export function isStrictReservedWord(word: string, inModule: boolean): boolean {
  return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
}

/**
 * Checks if word is a reserved word in binding strict mode, but it is allowed as
 * a normal identifier.
 */
export function isStrictBindOnlyReservedWord(word: string): boolean {
  return reservedWordsStrictBindSet.has(word);
}

/**
 * Checks if word is a reserved word in binding strict mode
 *
 * Includes non-strict reserved words and non-binding strict reserved words
 */
export function isStrictBindReservedWord(word: string, inModule: boolean): boolean {
  return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
}

export function isKeyword(word: string): boolean {
  return keywords.has(word);
}
