const arrayPrototypeMap = {
  سلسل: 'concat',
  نسخ_ضمني: 'copyWithin',
  أقياد: 'entries',
  كل: 'every',
  املئ: 'fill',
  رشح: 'filter',
  جد: 'find',
  جد_مؤشر: 'findIndex',
  سطح: 'flat',
  تخريط_مسطح: 'flatMap',
  لكل: 'forEach',
  تتضمن: 'includes',
  مؤشر: 'indexOf',
  ادمج: 'join',
  مفاتيح: 'keys',
  آخر_مؤشر: 'lastIndexOf',
  طول: 'length',
  خرط: 'map',
  ازل: 'pop', // المعنى غير حرفي، لكن هذا أكثر دلالة على وظيفىة الدالة
  ادفع: 'push',
  قلل: 'reduce',
  قلل_يمين: 'reduceRight',
  اعكس: 'reverse',
  ازح: 'shift',
  شرح: 'slice',
  بعض: 'some',
  رتب: 'sort',
  اقحم: 'splice', // المعنى غير حرفي، لكن هذا أكثر دلالة على وظيفىة الدالة
  لنص_محلي: 'toLocaleString',
  للمصدر: 'toSource',
  لنص: 'toString',
  دفع_أمامي: 'unshift', // المعنى غير حرفي، لكن هذا أكثر دلالة على وظيفىة الدالة
  قيم: 'values'
};

const arrayMap = {
  هل_مصفوفة: 'isArray',
  من: 'from'
  // من: 'of'
  // the followning properties will be maped in ./رمز
  // "": "Array.prototype[@@unscopables]",
  // "": "Array.prototype[@@iterator]()",
  // "": "Array.prototype[@@unscopables]",
  // "": "Array.prototype[@@iterator]()",
};

export default ['Array', arrayMap, { constructMap: [arrayPrototypeMap] }];
