/* eslint-disable prettier/prettier */
module.exports = (api) => {
  const targets = !api.env('test')
    ? { browsers: ['>0.2%', 'not dead', 'not op_mini all'] }
    : { node: 'current' };

  const envOpts = {
    targets,
    loose: false,
  };

  const presets = [
    ['@babel/preset-env', envOpts],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  const plugins = [
    ['@babel/proposal-object-rest-spread', { loose: false, useBuiltIns: true }],
  ];

  return {
    presets,
    plugins,
  };
};