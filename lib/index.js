
exports.code = "function __arjs__translate__(o, m) {\n  let proxyHandler = {\n    get(target, prop) {\n      if (prop in target) return target[prop];\n      let v = m[prop];\n      if (typeof v === 'string') {\n        Object.defineProperty(target, prop, { value: target[v] });\n        return target[v];\n      } else if (!v[2]) {\n        // we translate another object in the targeted propperty\n        let _v = __arjs__translate__(target[v[0]], v[1]);\n        Object.defineProperty(target, prop, { value: _v });\n        return _v;\n      } else if (v) {\n        // we translate the result of a function\n        let _v = () => __arjs__translate__(target[v[0]](...arguments), v[1]);\n        Object.defineProperty(target, prop, { value: _v });\n        return _v;\n      }\n      return undefined;\n    },\n    \n    set(target, prop, value) {\n      if(prop in m) {\n        prop = m[prop];\n        if (typeof prop !== 'string') prop = prop[0];\n      }\n      target[prop] = value;\n      return true;\n    },\n\n    // has(target, prop) {\n    //   return true;\n    // },\n    // apply(target, prop) {\n    // },\n    // construct() {\n    //   console.log(arguments);\n    // },\n    // hasProperty(target, prop) {\n    //   return true;\n    // },\n    // getPrototypeOf(target, prop) {\n    //   return Object.getPrototypeOf(o);\n    // },\n    // setPrototypeOf(target, prop) {\n    //   return true;\n    // },\n    // isExtensible(target, prop) {\n    //   return true;\n    // },\n    // preventExtensions(target, prop) {\n    //   return true;\n    // },\n    // defineProperty(target, prop) {\n    //   return true;\n    // },\n    // getOwnPropertyDescriptor(target, prop) {\n    //   return true;\n    // },\n    // ownKeys(target, prop) {\n    //   return true;\n    // },\n  }\n  return new Proxy(o, proxyHandler);\n}\n";
exports.translate = function __arjs__translate__(o, m) {
  let proxyHandler = {
    get(target, prop) {
      if (prop in target) return target[prop];
      let v = m[prop];
      if (typeof v === 'string') {
        Object.defineProperty(target, prop, { value: target[v] });
        return target[v];
      } else if (!v[2]) {
        // we translate another object in the targeted propperty
        let _v = __arjs__translate__(target[v[0]], v[1]);
        Object.defineProperty(target, prop, { value: _v });
        return _v;
      } else if (v) {
        // we translate the result of a function
        let _v = () => __arjs__translate__(target[v[0]](...arguments), v[1]);
        Object.defineProperty(target, prop, { value: _v });
        return _v;
      }
      return undefined;
    },
    
    set(target, prop, value) {
      if(prop in m) {
        prop = m[prop];
        if (typeof prop !== 'string') prop = prop[0];
      }
      target[prop] = value;
      return true;
    },

    // has(target, prop) {
    //   return true;
    // },
    // apply(target, prop) {
    // },
    // construct() {
    //   console.log(arguments);
    // },
    // hasProperty(target, prop) {
    //   return true;
    // },
    // getPrototypeOf(target, prop) {
    //   return Object.getPrototypeOf(o);
    // },
    // setPrototypeOf(target, prop) {
    //   return true;
    // },
    // isExtensible(target, prop) {
    //   return true;
    // },
    // preventExtensions(target, prop) {
    //   return true;
    // },
    // defineProperty(target, prop) {
    //   return true;
    // },
    // getOwnPropertyDescriptor(target, prop) {
    //   return true;
    // },
    // ownKeys(target, prop) {
    //   return true;
    // },
  }
  return new Proxy(o, proxyHandler);
}
;
exports.es6ModuleTranslationCode = "// the main putpose of such a module, is translte the module only here.\n// so we are avoiding creating many proxies doing the same thing.\n\nconst m = require('MODULE_NAME');\nconst { translate } = require('arjs-translate.js');\n\nmodule.exports = translate(m, MODULE_MAP);\n\n";
exports.commonjsModuleTranslationCode = "// the main putpose of such a module, is translte the module only here.\n// so we are avoiding creating many proxies doing the same thing.\n\nimport module from 'MODULE_NAME';\nimport { translate } from 'arjs-translate.js';\n\nexport default translate(module, MODULE_MAP);\n\n";
exports.translatingRequireCode = "var __old__require__ = require;\nvar __require_cache__ = {};\nvar __modules__tmap__ = MODULES_TRANSLATION_MAP;\nrequire = function(m) {\n  if(m in __require_cache__) return __require_cache__[m];\n  if (m in __modules__tmap__) {\n    _ = __arjs__translate__(__old__require__(m), __modules__tmap__[m]);\n    Object.assign(__require_cache__, m, { value: _ });\n    return _;\n  }\n  return __old__require__(m);\n};\n";
