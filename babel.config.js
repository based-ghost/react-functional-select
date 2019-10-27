/* eslint-disable prettier/prettier */
/* eslint-disable sort-keys */
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
    ['@babel/proposal-object-rest-spread', { useBuiltIns: true, loose: true }],
  ];

  return {
    presets,
    plugins
  };
};