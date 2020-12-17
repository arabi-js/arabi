module.exports = {
  presets: ['@babel/env', '@babel/flow'],
  plugins: [
    '@babel/transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/transform-spread',
  ],
};
