const { translate: __arjs__translate__ } = require('arjs-translate');

var __old__require__ = require;
var __require__cache__ = {};
var __modules__tmap__ = {"جي-كويري":["jquery",{}]};
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


globalThis["استدعي"] = require;
globalThis["كائن"] = __arjs__translate__(Object, {"عين":"assign"});
globalThis["لوحة"] = __arjs__translate__(console, {"اطبع":"log"});

var صادرات = exports;
var وحدة = __arjs__translate__(module, {"صادرات":"exports"});

let و1 = استدعي("./وحدة1.جس");

let و2 = استدعي("./وحدة2.جس");

let جيك = استدعي("جي-كويري");

لوحة.اطبع(typeof جيك);

لوحة.اطبع(جيك);

صادرات.و1 = و1;

كائن.عين(صادرات, و2);