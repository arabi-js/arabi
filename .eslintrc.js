const path = require('path');
const cjsGlobals = ['__dirname', '__filename', 'require', 'module', 'exports'];

const flowPackages = ['حزم/لب/مصدر/**/*.js'];

module.exports = {
  root: true,
  env: { es2021: true, node: true },
  extends: ['eslint:recommended'],
  overrides: [
    
    {
      files: flowPackages,
      parser: '@babel/eslint-parser', // to enable flowjs syntax to be parsed
      parserOptions: {
        sourceType: 'module'
      },
      plugins: ['flowtype', '@babel/development-internal'],
      extends: ['eslint:recommended', 'plugin:flowtype/recommended'],
      settings: {
        flowtype: { onlyFilesWithFlowAnnotation: false }
      }
    },

    {
      files: ['حزم/مصدر/**/*.js'],
      rules: { 'no-restricted-globals': ['error', ...cjsGlobals] }
    },

    {
      files: ['حزم/محلل/**/*.js'],
      // @babel/eslint-config-internal rules
      extends: '@babel/internal',
      rules: {
        // prettier-ignore
        '@babel/development-internal/dry-error-messages': [ 'error', {
          errorModule: path.resolve(__dirname, 'حزم/محلل/مصدر/parser/error.js')
        }]
      }
    },

    {
      files: ['حزم/ترجم/مصدر/{استدعي,مدخل}.js'],
      rules: { 'no-undef': 0 }
    }

  ]
};
