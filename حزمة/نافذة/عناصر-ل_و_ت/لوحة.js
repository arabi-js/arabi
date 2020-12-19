"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var canvasContextMap = {
  اتساع_الخط: "lineWidth",
  رأس_الخط: "lineCap",
  وصلة_الخط: "lineJoint",
  حد_الشطب: "miterLimit",
  شكل_الخط: "strokeStyle",
  شكل_الملئ: "fillStyle",
  // : "lineDashOffset",
  // : "getLineDash",
  // : "setLineDash",
  // : "shadowBlur",
  // : "shadowColor",
  // : "shadowOffsetX",
  // : "shadowOffsetY",
  // : "createLinearGradient",
  // : "createRadialGradient",
  // : "createPattern",
  ألفا_العالمية: "globalAlpha",
  عملية_التركيب_العالمية: "globalCompositeOperation",
  خط_أساس_النص: "textBaseLine",
  محازاة_النص: "textAlign",
  // : "direction",
  // : "font",
  // : "fillText",
  خطط_نص: "strokeText",
  // : "measureText",
  مستطيل_المسح: "clearRect",
  املئ_مستطيل: "fillRect",
  // :  "strokeRect",
  // :  "",
  ابدأ_مسار: "beginPath",
  اقفل_مسار: "closePath",
  حظ_إلى: "lineTo",
  تحرك_إلى: "moveTo",
  قوس_إلى: "arcTo",
  قوس: "arc",
  إهليج: "ellipse",
  مستطيل: "rect",
  // :  "bezierCurveTo",
  // :  "quadraticCurveTo",
  خطط: "stroke",
  املئ: "fill",
  // :  "drawFocusIfNeeded",
  // :  "scrollPathIntoView",
  // :  "clip",
  // :  "isPointInPath",
  // :  "isPointInStroke"
  // : "",
  املئ_إهليج: "fillEllipse",
  التحويل_الحالي: "currentTransform",
  احضر_التحويل: "getTransform",
  عين_التحويل: "setTransform",
  أعد_تعيين_التحويل: "resetTransform",
  ادر: "rotate",
  كبر: "scale",
  حرك: "translate",
  حول: "transform"
};
var canvasElementMap = {
  احضر_السياق: ["getContext", null, {
    returnMap: [canvasContextMap]
  }]
};
var _default = canvasElementMap;
/*
{
  "Drawing images": [
    "drawImage()"
  ],
  "Pixel manipulation": [
    "createImageData()",
    "getImageData()",
    "putImageData()"
  ],
  "Image smoothing": [
    "imageSmoothingEnabled  ",
    "imageSmoothingQuality  "
  ],
  "The canvas state": [
    "save()",
    "restore()",
    "canvas"
  ],
  "Hit regions": [
    "addHitRegion()  ",
    "removeHitRegion()  ",
    "clearHitRegions()  "
  ],
  "Filters": [
    "  filter"
  ],
  "Blink and WebKit": [
    "    clearShadow()",
    "    drawImageFromRect()",
    "    setAlpha()",
    "    setCompositeOperation()",
    "    setLineWidth()",
    "    setLineJoin()",
    "    setLineCap()",
    "    setMiterLimit()",
    "    setStrokeColor()",
    "    setFillColor()",
    "    setShadow()",
    "    webkitLineDash",
    "    webkitLineDashOffset",
    "    webkitImageSmoothingEnabled"
  ],
  "Blink only": [
    "  isContextLost()"
  ],
  "WebKit only": [
    "    webkitBackingStorePixelRatio",
    "    webkitGetImageDataHD",
    "    webkitPutImageDataHD"
  ],
  "Gecko only": [
    "  mozCurrentTransform",
    "  mozCurrentTransformInverse",
    "  mozImageSmoothingEnabled",
    "    mozTextStyle",
    "    mozDrawText()",
    "    mozMeasureText()",
    "    mozPathText()",
    "    mozTextAlongPath()",
    "  drawWindow()",
    "  demote()"
  ],
  "Internet Explorer": [
    "  msFillRule"
  ]

  // "Drawing rectangles": [
  //   "clearRect()",
  //   "fillRect()",
  //   "strokeRect()"
  // ],
  // "Drawing text": [
  //   "fillText()",
  //   "strokeText()",
  //   "measureText()"
  // ],
  // "Line styles": [
  //   "lineWidth",
  //   "lineCap",
  //   "lineJoin",
  //   "miterLimit",
  //   "getLineDash()",
  //   "setLineDash()",
  //   "lineDashOffset"
  // ],
  // "Text styles": [
  //   "font",
  //   "textAlign",
  //   "textBaseline",
  //   "direction"
  // ],
  // "Fill and stroke styles": [
  //   "fillStyle",
  //   "strokeStyle"
  // ],
  // "Gradients and patterns": [
  //   "createLinearGradient()",
  //   "createRadialGradient()",
  //   "createPattern()"
  // ],
  // "Shadows": [
  //   "shadowBlur",
  //   "shadowColor",
  //   "shadowOffsetX",
  //   "shadowOffsetY"
  // ],
  // "Paths": [
  //   "beginPath()",
  //   "closePath()",
  //   "moveTo()",
  //   "lineTo()",
  //   "arc()",
  //   "arcTo()",
  //   "ellipse()",
  //   "rect()"
  //   "bezierCurveTo()",
  //   "quadraticCurveTo()",
  // ],
  // "Drawing paths": [
  //   "fill()",
  //   "stroke()",
  //   "drawFocusIfNeeded()",
  //   "scrollPathIntoView()",
  //   "clip()",
  //   "isPointInPath()",
  //   "isPointInStroke()"
  // ],
  // "Transformations": [
  //   "currentTransform  ",
  //   "getTransform()",
  //   "rotate()",
  //   "scale()",
  //   "translate()",
  //   "transform()",
  //   "setTransform()",
  //   "resetTransform()  "
  // ],
  // "Compositing": [
  //   "globalAlpha",
  //   "globalCompositeOperation"
  // ],
}
*/

exports["default"] = _default;