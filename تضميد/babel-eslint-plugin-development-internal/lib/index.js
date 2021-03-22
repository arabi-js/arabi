"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.rules = void 0;

var _dryErrorMessages = _interopRequireDefault(require("./rules/dry-error-messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rules = {
  "dry-error-messages": _dryErrorMessages.default
};
exports.rules = rules;
var _default = {
  rules
};
exports.default = _default;