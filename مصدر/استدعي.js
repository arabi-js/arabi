var __arjs__translate__ = require('./translator');
var __require__cache__ = {};
exports.__default = function __arjs__translate__require__(__module, __query) {
  // they are module and query
  if(__query in __require__cache__) return __require__cache__[__query];
  // __arjs__modules__tmap__ is defined externally by this function's user 
  if (__query in __arjs__modules__tmap__) {
    let m = __arjs__modules__tmap__[__query];
    let _ = __arjs__translate__(require(m[0]), m[1], m[2]);
    Object.assign(__require__cache__, __module, { value: _ });
    return _;
  }
  return require(__query);
};

// exports.__default = function __arjs__translate__require__(arNameOrModule, enNameorQuery, map, options) {
//   if(arguments.length === 2) {
//     // they are module and query
//     if(enNameorQuery in __require__cache__) return __require__cache__[enNameorQuery];
//     // __arjs__modules__tmap__ is defined externally by this function's user 
//     if (enNameorQuery in __arjs__modules__tmap__) {
//       let m = __arjs__modules__tmap__[enNameorQuery];
//       let _ = __arjs__translate__(require(m[0]), m[1], m[2]);
//       Object.assign(__require__cache__, arNameOrModule, { value: _ });
//       return _;
//     }
//     return require(enNameorQuery);
//   } else {
//     // they are arName, enName, map, and options
//     if(arNameOrModule in __require__cache__) return __require__cache__[arNameOrModule];
//     let _ = __arjs__translate__(require(enNameorQuery), map, options);
//     Object.assign(__require__cache__, arNameOrModule, { value: _ });
//     return _;
//   }
// };
