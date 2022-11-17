module.exports = (api) => {
  const isNotTestEnv = !api.env('test');
  const targets = isNotTestEnv ? '> 0.25%, last 2 versions, not dead' : {node: 'current'};

  const presets = [
    ['@babel/preset-env', {targets, loose: true}],
    ['@babel/preset-react', {runtime: 'automatic'}],
    '@babel/preset-typescript',
  ];

  const plugins = [
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        pure: true,
        fileName: false,
        minify: isNotTestEnv,
        displayName: isNotTestEnv,
        transpileTemplateLiterals: true,
      },
    ],
  ];

  return {
    presets,
    plugins
  };
};