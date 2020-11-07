import handler from './مترجم/مدخل.js';

export const translatorCode = TRANSLATOR_CODE;

export function getTranslatorCode() {
  return (handler.options.runtime ? "import __arjs__translate__ from 'arjs-translate'" + handler.semi : translatorCode);
}

export function getVarsTranslatorCode(map) {
  let code = [];
  for (let p in map) {
    let v = 'string' === typeof map[p] ? map[p] : `__arjs__translate__(${map[p][0]}, ${JSON.stringify(map[p][1])})`; 
    code.push(`var ${p} = ${v}` + handler.semi);
  }
  return code.join('\n');
}

export function getGlobalTranslatorCode(map) {
  let code = [];
  for (let p in map) {
    let v = 'string' === typeof map[p] ? map[p] : `__arjs__translate__(${map[p][0]}, ${JSON.stringify(map[p][1])})`; 
    code.push(`${handler.options.globalObject}[${JSON.stringify(p)}] = ${v}` + handler.semi);
  }
  return code.join('\n');
}
