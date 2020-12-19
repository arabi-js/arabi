"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.numberMap = exports.consoleMap = void 0;

var _ = _interopRequireDefault(require("./\u0643\u0627\u0626\u0646"));

var _2 = _interopRequireDefault(require("./\u0645\u0635\u0641\u0648\u0641\u0629"));

var _3 = _interopRequireDefault(require("./\u062F\u0627\u0644\u0629"));

var _4 = _interopRequireDefault(require("./\u0631\u064A\u0627\u0636\u064A\u0627\u062A"));

var _5 = _interopRequireDefault(require("./\u0631\u0645\u0632"));

var consoleMap = ["console", {
  اطبع: "log",
  خطأ: "error",
  جدول: "table",
  وقت: "time",
  أوقف_الوقت: "timeEnd"
}];
exports.consoleMap = consoleMap;
var numberMap = ["Number", {
  ليس_رقما: "isNaN"
}];
exports.numberMap = numberMap;
var _default = {
  رقم: numberMap,
  كائن: _["default"],
  مصفوفة: _2["default"],
  دالة: _3["default"],
  رياضيات: _4["default"],
  لوحة: consoleMap,
  رمز: _5["default"],
  خطأ: "Error"
};
exports["default"] = _default;