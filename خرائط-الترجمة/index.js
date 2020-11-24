const windowMap = require('./window.tmap');
const commonjsMap = require('./commonjs.tmap');
const commonjsVars = require('./commonjsVars.tmap');
const jqueryMap = require('./jquery.tmap');

let modules = {
  "جي-كويري": jqueryMap,
};

exports.commonjs = {
  global: commonjsMap,
  globalVars: commonjsVars,
  modules,
};

exports.window = {
  global: windowMap,
  modules,
};

