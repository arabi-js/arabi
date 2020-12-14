module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {},
  },
  extends: ['eslint:recommended', 'plugin:flowtype/recommended'],
  plugins: ['flowtype'],
  // prettier-ignore
  ignorePatterns: [
    "مصدر/أكواد",
    "مصدر/babel-parser",
  ],
  rules: {},
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
  },
};
