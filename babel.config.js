module.exports = (api) => {
  const envNotTest = !api.env('test');
  const targets = envNotTest ? '>1%, not dead, not ie 11, not op_mini all' : { node: 'current' };

  const envOptions = {
    targets,
    loose: false,
    bugfixes: true
  };

  const presets = [
    ['@babel/preset-env', envOptions],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript'
  ];

  const plugins = [
    envNotTest && '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    [
      'babel-plugin-styled-components',
      {
        pure: true,
        fileName: false,
        transpileTemplateLiterals: true,
        ssr: envNotTest,
        minify: envNotTest,
        displayName: envNotTest,
      },
    ],
  ].filter(Boolean);

  return {
    presets,
    plugins
  };
};