const fs = require('fs');
const path = require('path');

const libPath = path.resolve(__dirname, './lib/');
const indexPath = path.resolve(__dirname, './src/index.js');
const translatorPath = path.resolve(__dirname, './src/translator.js');
const comModuleTranslationPath = path.resolve(__dirname, './src/moduleTranslationCode.es6.js');
const es6ModuleTranslationPath = path.resolve(__dirname, './src/moduleTranslationCode.commonjs.js');
const translatingRequirePath = path.resolve(__dirname, './src/translatingRequire.js');

const translatorContent = fs.readFileSync(translatorPath, { encoding: 'utf8' });
const es6ModuleTranslationCode = fs.readFileSync(es6ModuleTranslationPath, { encoding: 'utf8' });
const comModuleTranslationCode = fs.readFileSync(comModuleTranslationPath, { encoding: 'utf8' });
const translatingRequireCode = fs.readFileSync(translatingRequirePath, { encoding: 'utf8' });

const indexCode = fs.readFileSync(indexPath, { encoding: 'utf8' })
  .replace('TRANSLATOR_FUNC', translatorContent)
  .replace('TRANSLATOR_CODE', JSON.stringify(translatorContent))
  .replace('TRANSLATING_REQUIRE_CODE', JSON.stringify(translatingRequireCode))
  .replace('ES6_MODULE_TRANSLATION_CODE', JSON.stringify(es6ModuleTranslationCode))
  .replace('COMMONJS_MODULE_TRANSLATION_CODE', JSON.stringify(comModuleTranslationCode));

fs.mkdirSync(libPath, { recursive: true });
fs.writeFileSync(path.resolve(__dirname, './lib/index.js'), indexCode);

