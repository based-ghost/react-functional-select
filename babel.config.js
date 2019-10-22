/* eslint-disable prettier/prettier */
module.exports = {
  plugins: [
    ['@babel/proposal-class-properties', { loose: true }],
    '@babel/proposal-object-rest-spread',
    'annotate-pure-calls',
    // 'babel-plugin-styled-components',
  ],
  presets: [
    ['@babel/preset-env', { loose: true }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
