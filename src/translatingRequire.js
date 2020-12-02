var __old__require__ = require;
var __require__cache__ = {};
var __modules__tmap__ = MODULES_TRANSLATION_MAP;
require = function(m) {
  if(m in __require__cache__) return __require__cache__[m];
  if (m in __modules__tmap__) {
    let _m = __modules__tmap__[m];
    let _ = __arjs__translate__(__old__require__(_m[0]), __modules__tmap__[_m[1]]);
    Object.assign(__require__cache__, m, { value: _ });
    return _;
  }
  return __old__require__(m);
};
