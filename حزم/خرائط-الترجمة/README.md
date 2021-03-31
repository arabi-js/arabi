<div dir=rtl>

# خريطة ترجمة للعربية

## GlobalMap

خريطة الترجمة العالمية يتم ترجمتها على نحو مختلف عن خرائط الترجمة الأخرى؛ إذ أنه عند ترجمة وحدة nodejs مثلا، كل ما يحدث هو تعريب الكائن المستورد عن طريق الدالة `arjsTranslate.translate`. أما في حالة ترجمة خصائص وطرق الكائن العالمي `global || globalThis`، وأيضا `window` أو `self`. كل ما يحصل هو تعريف متغير في أعلى الملف الناتج يحمل الاسم العربي وقيمة الخاصية العالمية المُرادة, والتي ربما تترجم إن كان لها خريطة ترجمة خاصة بها وليس مجرد تعريب للاسم فقط عن طريق الدالة `translate` الموجودة في <span dir=ltr>`@arabi/translate`</span>.

---

<div dir=ltr>

```ts
interface GlobalMap {
  global: BasicTranslationMap;
  globalVars: BasicTranslationMap;
  modules: BasicTranslationMap;
}
```

</div>

`GlobalMap.global`، خصائص جديدة تضاف للنطاق العالمي. الكائن العالمي الافتراضي هو `globalThis` والذي يمكن تغييره من خلال الخيار `globalVariable: string`.

`GlobalMap.globalVars`: لكل ملف سيكون هناك تعريف للمتغيرات وليس إضافة خاصية للكائن العالمي، بذلك يكون متاحا في ذلك الملف وفقط. هذه الطريقة ضرورية في حالة مثل وحدات الـ cjs، فكل وحدة لديها `module.exports` الخاصة بها.

<div dir=ltr>

```js
// في رأس الملف المُترجَم
var وحدة = __arjs__translate__(module, { صادرات: 'exports' });
// ...
```

<div dir=rtl>

```js
// ...
// وبالتالي يمكن استخدام في كود.جس
صادرات.شيء_مصدر = 'القيمة المصدرة'؛
```

</div>

## TranslationMap

```ts
interface BasicTranslationMap {
  [ArabicName: string]:
    | string // english name
    | [
        EnglishName: string, // english name
        TranlationMap,
        TranslationMapOptions?
      ];
}

type TranslationMap = BasicTranslationMap | ((objToBeTranslated: object) => BasicTranslationMap);
```

### TranslationMapOptions

```ts
interface TranslationMapOptions {
  // this is an option for translating the returned value of a function
  returnMap?: [TranslationMap, TranslationMapOptions?];
  // this is an option for a "constructor", function or class, and
  //  we want to translate it's API, to translate each `new` instance.
  constructMap?: [TranslationMap, TranslationMapOptions?];
}
```

</div>
