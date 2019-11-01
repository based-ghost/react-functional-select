/* eslint-disable prettier/prettier */
module.exports = (api) => {
  api.cache.never();

  const envOpts = {
    loose: true,
    targets: {
      node: 'current',
    },
  };

  const presets = [
    ['@babel/preset-env', envOpts],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  const plugins = [
    ['@babel/proposal-class-properties', { loose: true }],
    ['@babel/proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
  ];

  return {
    presets,
    plugins,
  };
};