import canvasElementMap from './لوحة';

// if you pass a translation map as a function
// you have to ensure that, the body of this
// function doesn't include any other outside
// declared variable or identidiers, and also
// doesn't use and imported module, unless you
// import that module inside the translation map generator function,
// to make it easy and simple, we will use "Function.toString()"
// to get the same exact code you wrote
// export const htmlElementMap = function (el) {
// 	const me = arguments.callee;
// 	const map = {
// 		// a function returns an object, that object will be translated as well
// 		محدد_الاستعلام: ["querySelector", me, true],
// 		محدد_الاستعلام_الشامل: ["querySelectorAll", me, true],
// 		احصل_بالمعرف: ["getElementById", me, true],
// 		احصل_بالفئة: ["getElementsByClassName", me, true],
// 		احصل_بالوسم: ["getElementsByTagName", me, true],
// 		احصل_بالوسم: ["getElementsByTagNameNS", me, true],
// 	}
// 	if (el instanceof HTMLCanvasElement) {
// 		let canvasMap = {
// 		};
// 		Object.assign(map, canvasMap);
// 	}
// 	return map;
// }


// put all the element maps into one huge map
// we can use a function that check the html 
// element type and then return the coresponding map
const htmlElementMap = {
	...canvasElementMap,
	عرض: "width",
	طول: "height",
	محتوى_نصي: "textContent",
	نص_داخلي: "innerText",
	// لغة الوسوم التشعبية
	// HTML: hypertext markup language
	لغة_الوسوم_التشعبية_الداخلية: "innerHTML",
	// لابد لنا من أن نجد طريقة لكتابة الحروف مقطعة دون وجود فواصل
	// وذلك لكتاب الاختصارات، وكأنها حروف كابيتال، أو كبيرة مقارنة ببعض اللغات
	لوت_الداخلية: "innerHTML",
}

export const elementSelectors = {
	// a function returns an object, that object will be translated as well
	محدد_الاستعلام: ["querySelector", null, { returnMap: htmlElementMap }],
	محدد_الاستعلام_الشامل: ["querySelectorAll", null, { returnMap: htmlElementMap }],
	احصل_بالمعرف: ["getElementById", null, { returnMap: htmlElementMap }],
	احصل_بالفئة: ["getElementsByClassName", null, { returnMap: htmlElementMap }],
	احصل_بالوسم: ["getElementsByTagName", null, { returnMap: htmlElementMap }],
	احصل_بالوسم: ["getElementsByTagNameNS", null, { returnMap: htmlElementMap }],
}

Object.assign(htmlElementMap, elementSelectors);

export default htmlElementMap;
