/* eslint-disable prettier/prettier */
module.exports = {
  plugins: [
    '@babel/proposal-object-rest-spread',
    'babel-plugin-styled-components',
  ],
  presets: [
    ['@babel/preset-env', { loose: true }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
