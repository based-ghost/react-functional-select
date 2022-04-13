module.exports = (api) => {
  const isTestEnv = api.env('test');

  const targets = !isTestEnv
    ? '> 0.25%, not dead, not ie 11'
    : { node: 'current' };

  const presets = [
    ['@babel/preset-env', {targets, loose: true}],
    ['@babel/preset-react', {runtime: 'automatic'}],
    '@babel/preset-typescript',
  ];

  const plugins = [
    !isTestEnv && '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-optional-chaining', {loose: true}],
    ['@babel/plugin-proposal-nullish-coalescing-operator', {loose: true}],
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        pure: true,
        fileName: false,
        minify: !isTestEnv,
        displayName: !isTestEnv,
        transpileTemplateLiterals: true,
      },
    ],
  ].filter(Boolean);

  return {
    presets,
    plugins
  };
};