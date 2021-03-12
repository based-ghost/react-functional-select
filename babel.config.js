module.exports = (api) => {
  const isTestEnv = api.env('test');

  const targets = !isTestEnv
    ? '>0.25%, not dead, not ie 11, not op_mini all'
    : { node: 'current' };

  const presets = [
    ['@babel/preset-env', { targets, loose: false, bugfixes: true }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ];

  const plugins = [
    !isTestEnv && '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
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