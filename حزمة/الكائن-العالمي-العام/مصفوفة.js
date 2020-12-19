"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var arrayPrototypeMap = {
  // "سلسل": "concat",
  // "نسخ_ضمني": "copyWithin",
  // "أقياد": "entries",
  // "كل": "every",
  // "املئ": "fill",
  // "نق": "filter",
  // "جد": "find",
  // "جد_مؤشر": "findIndex",
  "سطح": "flat",
  // "": "flatMap",
  "لكل": "forEach",
  // "تتضمن": "includes",
  // "مؤشر": "indexOf",
  // "": "join",
  // "مفاتيح": "keys",
  "آخر_مؤشر": "lastIndexOf",
  "طول": "length",
  "خرط": "map",
  // "": "pop",
  "ادفع": "push",
  "قلل": "reduce",
  "قلل_يمين": "reduceRight",
  "اعكس": "reverse",
  "ازح": "shift",
  "شرح": "slice",
  "بعض": "some",
  "رتب": "sort",
  // "": "splice",
  "لنص_محلي": "toLocaleString",
  // "للمصدر": "toSource",
  "لنص": "toString",
  // "": "unshift",
  "قيم": "values"
};
var arrayMap = (0, _defineProperty2["default"])({
  "هل_مصفوفة": "isArray",
  "من": "from"
}, "\u0645\u0646", "of");
var _default = ["Array", arrayMap, {
  constructMap: [arrayPrototypeMap]
}];
exports["default"] = _default;