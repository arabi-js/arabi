var __old__require__ = require;
var __require_cache__ = {};
var __modules__tmap__ = MODULES_TRANSLATION_MAP;
require = function(m) {
  if(m in __require_cache__) return __require_cache__[m];
  if (m in __modules__tmap__) {
    _ = __arjs__translate__(__old__require__(m), __modules__tmap__[m]);
    Object.assign(__require_cache__, m, { value: _ });
    return _;
  }
  return __old__require__(m);
};
