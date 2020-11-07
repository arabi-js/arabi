const windowMap = require('./window.tmap');
const commonjsMap = require('./commonjs.tmap');
const commonjsVar = require('./commonjsVar.tmap');
const jqueryMap = require('./jquery.tmap');

let modules = [ jqueryMap ];

const commonjs = {
  global: commonjsMap,
  globalVar: commonjsVar,
  modules,
};

const window = {
  global: windowMap,
  modules,
};

module.exports = commonjs;
