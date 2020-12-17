import { _arguments } from './كلمات-مفتاحية';

export const consoleMap = ["console", {
  اطبع: "log",
  خطأ: "error",
  جدول: "table",
  وقت: "time",
  أوقف_الوقت: "timeEnd",
}];

const objectPrototypeMap = {
  منشئ: "constructor",
  __نموذج__: "__proto__",
  يملك_خاصية: "hasOwnProperty",
  هل_نموذج_من: "isPrototypeOf",
  هل_الخاصية_قابلة_للحصر: "propertyIsEnumerable",
  لنص_محلي: "toLocaleString",
  لنص: "toString",
  قيمة: "valueOf",
};

const functionPrototypeMap = {
  اربط: "bind",
  استدعي: "call",
  طبق: "apply",
  لنص: "toString",
  [_arguments]: "arguments",
  مستدعي: "caller",
  اسم_ظاهر: "displayName",
  طول: "length",
  اسم: "name",
  نموذج: "prototype",
};

export const objectMap = ["Object", {
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
  امنع_الامتدادات: "preventExtensions",
}, { constructMap: objectPrototypeMap }];

export const functionMap = ["Function", {}, { constructMap: functionPrototypeMap }];

export default {
  كائن: objectMap,
  لوحة: consoleMap,
  دالة: functionMap,
};
