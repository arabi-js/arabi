module.exports = {
  presets: ['@babel/env', '@babel/flow'],
  plugins: [
    ['@babel/transform-runtime', { corejs: 3 }],
    '@babel/plugin-proposal-class-properties',
    '@babel/transform-spread',
  ],
};
