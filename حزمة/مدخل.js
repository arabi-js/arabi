"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keywordsMap = exports.general = exports.window = exports.commonjs = void 0;

var _ = _interopRequireDefault(require("./\u0646\u0627\u0641\u0630\u0629/\u0645\u062F\u062E\u0644"));

var _2 = _interopRequireDefault(require("./\u062C\u0633-\u0627\u0644\u0634\u0627\u0626\u0639\u0629"));

var _3 = _interopRequireDefault(require("./\u0645\u062A\u063A\u064A\u0631\u0627\u062A-\u062C\u0633-\u0627\u0644\u0634\u0627\u0626\u0639\u0629"));

var _4 = _interopRequireDefault(require("./\u0627\u0644\u0643\u0627\u0626\u0646-\u0627\u0644\u0639\u0627\u0644\u0645\u064A-\u0627\u0644\u0639\u0627\u0645"));

var _5 = _interopRequireDefault(require("./\u0648\u062D\u062F\u0627\u062A-\u0627\u0644\u0646\u0648\u062F/\u0645\u062F\u062E\u0644"));

var _keywordsMap = _interopRequireWildcard(require("./\u0643\u0644\u0645\u0627\u062A-\u0645\u0641\u062A\u0627\u062D\u064A\u0629"));

exports.keywordsMap = _keywordsMap;
var commonjs = {
  global: _2["default"],
  globalVars: _3["default"],
  modules: _5["default"]
};
exports.commonjs = commonjs;
var window = {
  global: _["default"],
  modules: _5["default"]
};
exports.window = window;
var general = {
  global: _4["default"],
  modules: _5["default"]
};
exports.general = general;