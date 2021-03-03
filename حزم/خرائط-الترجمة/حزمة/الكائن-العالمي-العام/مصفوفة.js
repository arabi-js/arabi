"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var arrayPrototypeMap = {
  سلسل: "concat",
  نسخ_ضمني: "copyWithin",
  أقياد: "entries",
  كل: "every",
  املئ: "fill",
  رشح: "filter",
  جد: "find",
  جد_مؤشر: "findIndex",
  سطح: "flat",
  تخريط_مسطح: "flatMap",
  لكل: "forEach",
  تتضمن: "includes",
  مؤشر: "indexOf",
  ادمج: "join",
  مفاتيح: "keys",
  آخر_مؤشر: "lastIndexOf",
  طول: "length",
  خرط: "map",
  ازل: "pop",
  ادفع: "push",
  قلل: "reduce",
  قلل_يمين: "reduceRight",
  اعكس: "reverse",
  ازح: "shift",
  شرح: "slice",
  بعض: "some",
  رتب: "sort",
  احشر: "splice",
  لنص_محلي: "toLocaleString",
  للمصدر: "toSource",
  لنص: "toString",
  // "": "unshift",
  قيم: "values"
};
var arrayMap = (0, _defineProperty2["default"])({
  هل_مصفوفة: "isArray",
  من: "from"
}, "\u0645\u0646", "of");
var _default = ["Array", arrayMap, {
  constructMap: [arrayPrototypeMap]
}];
exports["default"] = _default;