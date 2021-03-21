const windowMap = require('./نافذة/مدخل');
const commonjsMap = require('./جس-الشائعة');
const commonjsVars = require('./متغيرات-جس-الشائعة');
const generalGlobalThis = require('./الكائن-العالمي-العام/مدخل');
const modules = require('./وحدات-النود/مدخل');
const keywordsMap = require('./كلمات-مفتاحية');

exports.keywordsMap = keywordsMap;

exports.commonjs = {
  global: commonjsMap,
  globalVars: commonjsVars,
  modules
};

exports.window = {
  global: windowMap,
  modules
};

exports.general = {
  global: generalGlobalThis,
  modules
};
