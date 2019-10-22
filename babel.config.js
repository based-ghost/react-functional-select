/* eslint-disable prettier/prettier */
module.exports = {
  plugins: [
    ['@babel/proposal-class-properties', { loose: true }],
    '@babel/proposal-object-rest-spread',
    'annotate-pure-calls',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
