"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
var objectMap = {
  عين: "assign",
  انشئ: "create",
  أقياد: "entries",
  مفاتيح: "keys",
  قيم: "values",
  من_الأقياد: "fromEntries",
  عرف_خاصية: "defineProperty",
  عرف_خصائص: "defineProperties",
  احضر_موصف_خصايتي: "getOwnPropertyDescriptor",
  احضر_موصفات_خصائصي: "getOwnPropertyDescriptors",
  احضر_أسماء_خصائصي: "getOwnPropertyNames",
  احضر_رموز_خصائصي: "getOwnPropertySymbols",
  احضر_النموذج: "getPrototypeOf",
  عين_النموذج: "setPrototypeOf",
  هل: "is",
  هل_امتدادي: "isExtensible",
  هل_مجمد: "isFrozen",
  هل_مختوم: "isSealed",
  جمد: "freeze",
  اختم: "seal",
  امنع_الامتدادات: "preventExtensions"
};
var _default = ["Object", objectMap, {
  constructMap: [objectPrototypeMap]
}];
exports["default"] = _default;