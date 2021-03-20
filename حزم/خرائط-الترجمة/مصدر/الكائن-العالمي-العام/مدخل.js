const objectMap = require('./كائن');
const arrayMap = require('./مصفوفة');
const functionMap = require('./دالة');
const mathMap = require('./رياضيات');
const symbolMap = require('./رمز');
const stringMap = require('./نص');
const numberMap = require('./رقم');

const consoleMap = [
  'console',
  {
    اطبع: 'log',
    خطأ: 'error',
    جدول: 'table',
    وقت: 'time',
    أوقف_الوقت: 'timeEnd',
  },
];

module.exports = {
  رقم: numberMap,
  كائن: objectMap,
  مصفوفة: arrayMap,
  دالة: functionMap,
  رياضيات: mathMap,
  لوحة: consoleMap,
  رمز: symbolMap,
  خطأ: 'Error',
  نص: stringMap,
};
