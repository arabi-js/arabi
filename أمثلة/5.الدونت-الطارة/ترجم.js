#!node

const path = require('path');
const fs = require('fs');
const arabi = require('@arabi/core');
const arabiMaps = require('@arabi/maps');

// const code = fs.readFileSync('./examples/2.arabi', { encoding: 'utf8' });

const OUTPUT = path.resolve(__dirname, './donut.js');

const maps = arabiMaps.commonjs;

maps.global['ضع_مؤقتا'] = 'setTimeout';

maps.global['عملية'] = ['process', {
  اخرج: 'exit',
  المرة_القادمة: 'nextTick',
  خارج: ['stdout', {
    اكتب: 'write',
    أعمدة: 'columns',
    صفوف: 'rows',
    احضر_حجم_النافذة: 'getWindowSize',
    عندما: "on"
  }],
}];

maps.global['افعل_فوريا'] = 'setImmediate';

maps.modules = {
  'هروب-الآنسي': ['ansi-escapes', {
    'اخفي_المؤشر': 'cursorHide',
    'اعد_المؤشر_لموضعه': 'cursorRestorePosition',
    'احفظ_موضع_المؤشر': 'cursorSavePosition',
    'اظهر_المؤشر': 'cursorShow',
  }],

  'حجم-النافذة': ['window-size', {
    احضر: ['get', null, { returnMap: { اتساع: "width", ارتفاع: "height" } }]
  }]
}

// delete the exsiting file
fs.existsSync(OUTPUT) && fs.unlinkSync(OUTPUT);

arabi.translate({
  input: path.resolve(__dirname, './طارة.جس'),
  output: OUTPUT,
  outputType: 'commonjs',
  maps: maps,
  globalObject: "global"
});
