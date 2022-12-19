module.exports = (api) => {
  const isTest = api.env('test');
  const targets = isTest ? { node: 'current' } : undefined;

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
        minify: !isTest,
        displayName: !isTest,
        transpileTemplateLiterals: true,
      },
    ],
  ];

  return {
    presets,
    plugins
  };
};