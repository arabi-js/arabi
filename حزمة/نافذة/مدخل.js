import htmlElementMap, { elementSelectors } from './عناصر-ل_و_ت/مدخل';
import generalGlobalThis from '../الكائن-العالمي-العام';

// create sub-directory for sub-repos
// create sub-packages: arjs-translate, arjs-maps
export default {
  انذر: "alert",
  ...generalGlobalThis,

  مستند: ["document", {
    جسم:["body", htmlElementMap],
    ...elementSelectors
  }],

};
