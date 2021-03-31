import objectMap from './كائن';
import arrayMap from './مصفوفة';
import functionMap from './دالة';
import mathMap from './رياضيات';
import symbolMap from './رمز';
import stringMap from './نص';
import numberMap from './رقم';

const consoleMap = [
  'console',
  {
    اطبع: 'log',
    خطأ: 'error',
    جدول: 'table',
    وقت: 'time',
    أوقف_الوقت: 'timeEnd'
  }
];

export default {
  رقم: numberMap,
  كائن: objectMap,
  مصفوفة: arrayMap,
  دالة: functionMap,
  رياضيات: mathMap,
  لوحة: consoleMap,
  رمز: symbolMap,
  خطأ: 'Error',
  نص: stringMap
};
