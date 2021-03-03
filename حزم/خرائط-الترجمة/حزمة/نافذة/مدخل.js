"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ = _interopRequireWildcard(require("./\u0639\u0646\u0627\u0635\u0631-\u0644_\u0648_\u062A/\u0645\u062F\u062E\u0644"));

var _2 = _interopRequireDefault(require("../\u0627\u0644\u0643\u0627\u0626\u0646-\u0627\u0644\u0639\u0627\u0644\u0645\u064A-\u0627\u0644\u0639\u0627\u0645/\u0645\u062F\u062E\u0644"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// create sub-directory for sub-repos
// create sub-packages: arjs-translate, arjs-maps
var _default = _objectSpread(_objectSpread({
  انذر: "alert"
}, _2["default"]), {}, {
  مستند: ["document", _objectSpread({
    جسم: ["body", _["default"]]
  }, _.elementSelectors)]
});

exports["default"] = _default;