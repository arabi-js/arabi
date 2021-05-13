<div dir=rtl>

<div align="center">
<h1 align="center">بسم الله الرحمن الرحيم</h1>

![شريط أيقوني - جافاسكريب بالعربي](أيقونة.png)

</div>

```جس
// هذه جافاسكريبت المعربة
عرف مصفوفة_الأرقام =
	انشئ مصفوفة(10)
	.املئ(0)
	.قلل(
		(م)=> {
			م.ادفع(م[م.طول-1]+1)؛ ارجع م؛
		}، [1]
	)؛
لكل(عرف ر من مصفوفة_الأرقام) لوحة.اطبع(ر)؛
```

## طريقة الاستخدام

<div dir=ltr>

```bash
❯ npm i -D @arabi/core @arabi/maps
❯ npm i @arabi/translate
```

```js
const arabi = require('@arabi/core');
const arabiMaps = require('@arabi/maps');

const options = {
  input: '/path/to/file/or/dir',
  output: '/another/path', // the output is the same type as input
  // if input is dir, and you have an entry point
  // otherwise all files will be translated independently
  entry: '/path/to/the/entry',
  maps: arabiMaps.window
};

arabi.translate(options);
```

</div>

---


# بعض الأمثلة

يمكنك الوصول للأمثلة من خلال المسار الفرعي `.\أمثلة`، حيث يمكنك النظر فيها مباشرة واستكشاف كيف تم التعريب بناءا على معرفتك بالجافاسكريبت.

**لبناء الأمثلة:**

<div dir=ltr>

```bash
> yarn examples:build # بناء كل الأمثلة
> yarn workspace @arabi/example1 build # بناء المثال الأول
> yarn workspaces --include '@arabi/example{1..3}' build # بناء الأمثلة من 1 إلى 3
```

</div>

## لوحة لغة الوسوم التشعبية (لوت)

[أمثلة/4.لوحة-لغة-الوسوم-التشعبية](أمثلة/4.لوحة-لغة-الوسوم-التشعبية)

![استعراض](أمثلة/4.لوحة-لغة-الوسوم-التشعبية/استعراض.png)

## الطارة في الطرفية

[أمثلة/5.الدونت-الطارة](أمثلة/5.الدونت-الطارة)

![استعراض](أمثلة/5.الدونت-الطارة/استعراض.gif)

# الخطوات القادمة

انظر تبويب projects.

# الترخيص

MIT

</div>
