const { htmlElementMap, elementSelectors } = require('./عناصر-ل_و_ت/مدخل');
const generalGlobalThis = require('../الكائن-العالمي-العام/مدخل');

// create sub-directory for sub-repos
// create sub-packages: arjs-translate, arjs-maps
module.exports = {
  انذر: 'alert',
  ...generalGlobalThis,

  مستند: [
    'document',
    {
      جسم: ['body', htmlElementMap],
      ...elementSelectors,
    },
  ],
};
