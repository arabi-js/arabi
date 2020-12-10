import htmlElementMap, { elementSelectors } from './عناصر-ل_و_ت/مدخل';
import generalGlobalThis from '../الكائن-العالمي-العام';

export default {
  انذر: "alert",
  ...generalGlobalThis,

  مستند: ["document", {
    جسم:["body", htmlElementMap],
    ...elementSelectors
  }],

};
