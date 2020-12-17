var __arabi__translate__ = require('./مترجم');
var __require__cache__ = {};
exports.default = function __arabi__translate__require__(__module, __query) {
  if(__query in __require__cache__) return __require__cache__[__query];
  if (__query in __arabi__modules__tmap__) {
    let m = __arabi__modules__tmap__[__query];
    let _ = __arabi__translate__(__module, m[1], m[2]);
    Object.assign(__require__cache__, __module, { value: _ });
    return _;
  }
  return require(__query);
};