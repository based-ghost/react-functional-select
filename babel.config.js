/* eslint-disable prettier/prettier */
module.exports = (api) => {
  const isTestEnv = api.env('test');

  const targets = !isTestEnv
    ? { browsers: ['>0.2%', 'not dead', 'not op_mini all'] }
    : { node: 'current' };

  const envOpts = {
    targets,
    loose: true,
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