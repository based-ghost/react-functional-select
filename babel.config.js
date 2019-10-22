/* eslint-disable prettier/prettier */
module.exports = {
  plugins: [
    '@babel/proposal-object-rest-spread',
    'babel-plugin-styled-components',
  ],
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        targets: {
          browsers: [
            'last 2 versions',
            'IE 11',
            'maintained node versions',
            'not dead',
          ],
        },
      },
    ],
    '@babel/preset-react',
    '@babel/typescript',
  ],
};
