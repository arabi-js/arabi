import windowMap from './نافذة/مدخل';
import commonjsMap from './جس-الشائعة';
import commonjsVars from './متغيرات-جس-الشائعة';
import generalGlobalThis from './الكائن-العالمي-العام';
import modules from './وحدات-النود/مدخل';

export const commonjs = {
  global: commonjsMap,
  globalVars: commonjsVars,
  modules,
};

export const window = {
  global: windowMap,
  modules,
};

export const general = {
  global: generalGlobalThis,
  modules,
}

