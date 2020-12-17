"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.functionMap = exports.objectMap = exports.consoleMap = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ = require("./\u0643\u0644\u0645\u0627\u062A-\u0645\u0641\u062A\u0627\u062D\u064A\u0629");

var _functionPrototypeMap;

var consoleMap = ["console", {
  اطبع: "log",
  خطأ: "error",
  جدول: "table",
  وقت: "time",
  أوقف_الوقت: "timeEnd"
}];
exports.consoleMap = consoleMap;
var objectPrototypeMap = {
  منشئ: "constructor",
  __نموذج__: "__proto__",
  يملك_خاصية: "hasOwnProperty",
  هل_نموذج_من: "isPrototypeOf",
  هل_الخاصية_قابلة_للحصر: "propertyIsEnumerable",
  لنص_محلي: "toLocaleString",
  لنص: "toString",
  قيمة: "valueOf"
};
var functionPrototypeMap = (_functionPrototypeMap = {
  اربط: "bind",
  استدعي: "call",
  طبق: "apply",
  لنص: "toString"
}, (0, _defineProperty2["default"])(_functionPrototypeMap, _._arguments, "arguments"), (0, _defineProperty2["default"])(_functionPrototypeMap, "\u0645\u0633\u062A\u062F\u0639\u064A", "caller"), (0, _defineProperty2["default"])(_functionPrototypeMap, "\u0627\u0633\u0645_\u0638\u0627\u0647\u0631", "displayName"), (0, _defineProperty2["default"])(_functionPrototypeMap, "\u0637\u0648\u0644", "length"), (0, _defineProperty2["default"])(_functionPrototypeMap, "\u0627\u0633\u0645", "name"), (0, _defineProperty2["default"])(_functionPrototypeMap, "\u0646\u0645\u0648\u0630\u062C", "prototype"), _functionPrototypeMap);
var objectMap = ["Object", {
  عين: "assign",
  انشئ: "create",
  مداخل: "entries",
  مفاتيح: "keys",
  قيم: "values",
  من_المداخل: "fromEntries",
  عرف_خاصية: "defineProperty",
  عرف_خصائص: "defineProperties",
  احضر_موصفات_خصايتي: "getOwnPropertyDescriptor",
  احضر_موصفات_خصائصي: "getOwnPropertyDescriptors",
  احضر_أسماء_خصائصي: "getOwnPropertyNames",
  احضر_رموز_خصائصي: "getOwnPropertySymbols",
  احضر_النموذج: "getPrototypeOf",
  عين_النموذج: "setPrototypeOf",
  هل: "is",
  هل_قابل_للامتداد: "isExtensible",
  هل_مجمد: "isFrozen",
  هل_مختوم: "isSealed",
  جمد: "freeze",
  اختم: "seal",
  امنع_الامتدادات: "preventExtensions"
}, {
  constructMap: objectPrototypeMap
}];
exports.objectMap = objectMap;
var functionMap = ["Function", {}, {
  constructMap: functionPrototypeMap
}];
exports.functionMap = functionMap;
var _default = {
  كائن: objectMap,
  لوحة: consoleMap,
  دالة: functionMap
};
exports["default"] = _default;