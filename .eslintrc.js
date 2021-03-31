const path = require('path');
const cjsGlobals = ['__dirname', '__filename', 'require', 'module', 'exports'];

const flowPackages = ['حزم/لب/**/*.js'];

const configs = [
  'eslint:recommended',
  'plugin:import/errors',
  'plugin:import/warnings',
  // 'plugin:prettier/recommended',
  'prettier'
];

const plugins = ['import', 'prettier'];

module.exports = {
  root: true,
  env: { es2021: true, node: true },
  extends: configs,
  plugins,
  overrides: [
    {
      files: flowPackages,
      parser: '@babel/eslint-parser', // to enable flowjs syntax to be parsed
      parserOptions: {
        sourceType: 'module'
      },
      plugins: ['flowtype', ...plugins],
      extends: ['plugin:flowtype/recommended', ...configs],
      rules: { 'no-restricted-globals': ['error', ...cjsGlobals] },
      settings: {
        flowtype: { onlyFilesWithFlowAnnotation: false }
      }
    },

    {
      // the same used in babel monorepo
      files: ['حزم/محلل/**/*.js'],
      plugins: ['@babel/development-internal'],
      extends: '@babel/internal',
      rules: {
        // prettier-ignore
        '@babel/development-internal/dry-error-messages': ['error', {
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
