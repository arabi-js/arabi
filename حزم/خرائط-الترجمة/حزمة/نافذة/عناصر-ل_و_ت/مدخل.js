"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.elementSelectors = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ = _interopRequireDefault(require("./\u0644\u0648\u062D\u0629"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// if you pass a translation map as a function
// you have to ensure that, the body of this
// function doesn't include any other outside
// declared variable or identidiers, and also
// doesn't use and imported module, unless you
// import that module inside the translation map generator function,
// to make it easy and simple, we will use "Function.toString()"
// to get the same exact code you wrote
// export const htmlElementMap = function (el) {
// 	const me = arguments.callee;
// 	const map = {
// 		// a function returns an object, that object will be translated as well
// 		محدد_الاستعلام: ["querySelector", me, true],
// 		محدد_الاستعلام_الشامل: ["querySelectorAll", me, true],
// 		احصل_بالمعرف: ["getElementById", me, true],
// 		احصل_بالفئة: ["getElementsByClassName", me, true],
// 		احصل_بالوسم: ["getElementsByTagName", me, true],
// 		احصل_بالوسم: ["getElementsByTagNameNS", me, true],
// 	}
// 	if (el instanceof HTMLCanvasElement) {
// 		let canvasMap = {
// 		};
// 		Object.assign(map, canvasMap);
// 	}
// 	return map;
// }
// put all the element maps into one huge map
// we can use a function that check the html 
// element type and then return the coresponding map
var htmlElementMap = _objectSpread(_objectSpread({}, _["default"]), {}, {
  عرض: "width",
  طول: "height",
  عرض_العميل: "clientWidth",
  طول_العميل: "clientHeight",
  محتوى_نصي: "textContent",
  نص_داخلي: "innerText",
  // لغة الوسوم التشعبية
  // HTML: hypertext markup language
  لغة_الوسوم_التشعبية_الداخلية: "innerHTML",
  // لابد لنا من أن نجد طريقة لكتابة الحروف مقطعة دون وجود فواصل
  // وذلك لكتاب الاختصارات، وكأنها حروف كابيتال، أو كبيرة مقارنة ببعض اللغات
  لوت_الداخلية: "innerHTML"
});

var elementSelectors = {
  // a function returns an object, that object will be translated as well
  محدد_الاستعلام: ["querySelector", null, {
    returnMap: [htmlElementMap]
  }],
  محدد_الاستعلام_الشامل: ["querySelectorAll", null, {
    returnMap: [htmlElementMap]
  }],
  احصل_بالمعرف: ["getElementById", null, {
    returnMap: [htmlElementMap]
  }],
  احصل_بالفئة: ["getElementsByClassName", null, {
    returnMap: [htmlElementMap]
  }],
  احصل_بالوسم: ["getElementsByTagName", null, {
    returnMap: [htmlElementMap]
  }] // احصل_بالوسم: ["getElementsByTagNameNS", null, { returnMap: [htmlElementMap] }],

};
exports.elementSelectors = elementSelectors;
Object.assign(htmlElementMap, elementSelectors);
var _default = htmlElementMap;
exports["default"] = _default;