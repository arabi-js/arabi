/*****/
/*****/
/*****/ import { parse as __flatted__parse__ } from 'flatted';
/*****/ import { translate as __arabi__translate__ } from '@arabi/translate';
/*****/
/*****/
/*****/ global['استدعي'] = require;
/*****/ global['رقم'] = __arabi__translate__(
  Number,
  __flatted__parse__('[{"ليس_رقما":"1"},"isNaN"]'),
  undefined
);
/*****/ global['كائن'] = __arabi__translate__(
  Object,
  __flatted__parse__(
    '[{"عين":"1","انشئ":"2","مداخل":"3","مفاتيح":"4","قيم":"5","من_المداخل":"6","عرف_خاصية":"7","عرف_خصائص":"8","احضر_موصفات_خصايتي":"9","احضر_موصفات_خصائصي":"10","احضر_أسماء_خصائصي":"11","احضر_رموز_خصائصي":"12","احضر_النموذج":"13","عين_النموذج":"14","هل":"15","هل_قابل_للامتداد":"16","هل_مجمد":"17","هل_مختوم":"18","جمد":"19","اختم":"20","امنع_الامتدادات":"21"},"assign","create","entries","keys","values","fromEntries","defineProperty","defineProperties","getOwnPropertyDescriptor","getOwnPropertyDescriptors","getOwnPropertyNames","getOwnPropertySymbols","getPrototypeOf","setPrototypeOf","is","isExtensible","isFrozen","isSealed","freeze","seal","preventExtensions"]'
  ),
  null
);
/*****/ global['مصفوفة'] = __arabi__translate__(
  Array,
  __flatted__parse__('[{"هل_مصفوفة":"1","من":"2"},"isArray","of"]'),
  null
);
/*****/ global['دالة'] = __arabi__translate__(Function, __flatted__parse__('[{}]'), null);
/*****/ global['رياضيات'] = __arabi__translate__(
  Math,
  __flatted__parse__(
    '[{"إيبسلون":"1","صسع32":"2","أسي_ط1":"3","ضرب_ص":"4","أرض":"5","أس":"6","أسي":"7","إشارة":"8","تقريب":"9","جا":"10","جتا":"11","جتاع":"12","جزر":"13","جزر1_2":"14","جزر2":"15","حاع":"16","سقف":"17","صغرى":"18","ط":"19","ظا":"20","ظاع":"21","عشوائي":"22","عطمى":"23","لو":"24","لو10":"25","لو10هـ":"26","لو1ب":"27","لو2":"28","لو2هـ":"29","لوهـ10":"30","لوهـ2":"31","مطلق":"32","هـ":"33","وتر":"34"},"EPSILON","clz32","expm1","imul","floor","pow","exp","sign","round","sin","cos","acos","sqrt","SQRT1_2","SQRT2","asin","ceil","min","PI","tan","atan","random","max","log","log10","LOG10E","log1p","log2","LOG2E","LN10","LN2","abs","E","hypot"]'
  ),
  undefined
);
/*****/ global['لوحة'] = __arabi__translate__(
  console,
  __flatted__parse__(
    '[{"اطبع":"1","خطأ":"2","جدول":"3","وقت":"4","أوقف_الوقت":"5"},"log","error","table","time","timeEnd"]'
  ),
  undefined
);
/*****/ global['رمز'] = __arabi__translate__(Symbol, __flatted__parse__('[{}]'), null);
/*****/ global['خطأ'] = Error;
/*****/
/*****/ (() => {
  /*****/ var __the__proto__ = Object.prototype;
  /*****/ Object.defineProperty(__the__proto__, 'منشئ', {
    get: function () {
      return this.constructor;
    },
    set: function (v) {
      return (this.constructor = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, '__نموذج__', {
    get: function () {
      return this.__proto__;
    },
    set: function (v) {
      return (this.__proto__ = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'يملك_خاصية', {
    get: function () {
      return this.hasOwnProperty;
    },
    set: function (v) {
      return (this.hasOwnProperty = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'هل_نموذج_من', {
    get: function () {
      return this.isPrototypeOf;
    },
    set: function (v) {
      return (this.isPrototypeOf = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'هل_الخاصية_قابلة_للحصر', {
    get: function () {
      return this.propertyIsEnumerable;
    },
    set: function (v) {
      return (this.propertyIsEnumerable = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'لنص_محلي', {
    get: function () {
      return this.toLocaleString;
    },
    set: function (v) {
      return (this.toLocaleString = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'لنص', {
    get: function () {
      return this.toString;
    },
    set: function (v) {
      return (this.toString = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'قيمة', {
    get: function () {
      return this.valueOf;
    },
    set: function (v) {
      return (this.valueOf = v);
    }
  });
  /*****/
})();
/*****/
/*****/ (() => {
  /*****/ var __the__proto__ = Array.prototype;
  /*****/ Object.defineProperty(__the__proto__, 'سطح', {
    get: function () {
      return this.flat;
    },
    set: function (v) {
      return (this.flat = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'لكل', {
    get: function () {
      return this.forEach;
    },
    set: function (v) {
      return (this.forEach = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'آخر_مؤشر', {
    get: function () {
      return this.lastIndexOf;
    },
    set: function (v) {
      return (this.lastIndexOf = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'طول', {
    get: function () {
      return this.length;
    },
    set: function (v) {
      return (this.length = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'خرط', {
    get: function () {
      return this.map;
    },
    set: function (v) {
      return (this.map = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'ادفع', {
    get: function () {
      return this.push;
    },
    set: function (v) {
      return (this.push = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'قلل', {
    get: function () {
      return this.reduce;
    },
    set: function (v) {
      return (this.reduce = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'قلل_يمين', {
    get: function () {
      return this.reduceRight;
    },
    set: function (v) {
      return (this.reduceRight = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'اعكس', {
    get: function () {
      return this.reverse;
    },
    set: function (v) {
      return (this.reverse = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'ازح', {
    get: function () {
      return this.shift;
    },
    set: function (v) {
      return (this.shift = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'شرح', {
    get: function () {
      return this.slice;
    },
    set: function (v) {
      return (this.slice = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'بعض', {
    get: function () {
      return this.some;
    },
    set: function (v) {
      return (this.some = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'رتب', {
    get: function () {
      return this.sort;
    },
    set: function (v) {
      return (this.sort = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'لنص_محلي', {
    get: function () {
      return this.toLocaleString;
    },
    set: function (v) {
      return (this.toLocaleString = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'لنص', {
    get: function () {
      return this.toString;
    },
    set: function (v) {
      return (this.toString = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'قيم', {
    get: function () {
      return this.values;
    },
    set: function (v) {
      return (this.values = v);
    }
  });
  /*****/
})();
/*****/
/*****/ (() => {
  /*****/ var __the__proto__ = Function.prototype;
  /*****/ Object.defineProperty(__the__proto__, 'اربط', {
    get: function () {
      return this.bind;
    },
    set: function (v) {
      return (this.bind = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'استدعي', {
    get: function () {
      return this.call;
    },
    set: function (v) {
      return (this.call = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'طبق', {
    get: function () {
      return this.apply;
    },
    set: function (v) {
      return (this.apply = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'لنص', {
    get: function () {
      return this.toString;
    },
    set: function (v) {
      return (this.toString = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'وسائط', {
    get: function () {
      return this.arguments;
    },
    set: function (v) {
      return (this.arguments = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'مستدعي', {
    get: function () {
      return this.caller;
    },
    set: function (v) {
      return (this.caller = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'اسم_ظاهر', {
    get: function () {
      return this.displayName;
    },
    set: function (v) {
      return (this.displayName = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'طول', {
    get: function () {
      return this.length;
    },
    set: function (v) {
      return (this.length = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'اسم', {
    get: function () {
      return this.name;
    },
    set: function (v) {
      return (this.name = v);
    }
  });
  /*****/ Object.defineProperty(__the__proto__, 'نموذج', {
    get: function () {
      return this.prototype;
    },
    set: function (v) {
      return (this.prototype = v);
    }
  });
  /*****/
})();
/*****/
/*****/ (() => {
  /*****/ var __the__proto__ = Symbol.prototype;
  /*****/
})();
