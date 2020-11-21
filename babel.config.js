module.exports = (api) => {
  const envNotTest = !api.env('test');
  const targets = envNotTest ? { browsers: ['>0.2%', 'not dead', 'not op_mini all'] } : { node: 'current' };

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
    envNotTest && '@babel/transform-runtime',
    ['@babel/proposal-object-rest-spread', { loose: false, useBuiltIns: true }],
  ].filter(Boolean);

  return {
    presets,
    plugins,
  };
};