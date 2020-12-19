import objectMap from './كائن';
import arrayMap from './مصفوفة';
import functionMap from './دالة';
import mathMap from './رياضيات';
import symbolMap from './رمز';

export const consoleMap = ["console", {
  اطبع: "log",
  خطأ: "error",
  جدول: "table",
  وقت: "time",
  أوقف_الوقت: "timeEnd",
}];

export const numberMap = ["Number", {
  ليس_رقما: "isNaN",
}];

export default {
  رقم: numberMap,
  كائن: objectMap,
  مصفوفة: arrayMap,
  دالة: functionMap,
  رياضيات: mathMap,
  لوحة: consoleMap,
  رمز: symbolMap,
  خطأ: "Error"
};
