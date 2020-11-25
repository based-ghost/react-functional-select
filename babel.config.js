module.exports = (api) => {
  const envNotTest = !api.env('test');
  const targets = envNotTest ? '> 1%, last 2 versions, not dead' : { node: 'current' };

  const envOptions = {
    targets,
    loose: false,
    bugfixes: true,
  };

  const presets = [
    ['@babel/preset-env', envOptions],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ];

  const plugins = [
    envNotTest && '@babel/plugin-transform-runtime',
    ['@babel/proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
  ].filter(Boolean);

  return {
    presets,
    plugins,
  };
};