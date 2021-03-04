import { Configuration } from 'webpack';

module.exports = {
  stories: ['../__stories__/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
        sourceLoaderOptions: {
          parser: 'typescript',
          injectStoryParameters: false,
        },
      },
    },
  ],
  typescript: {
    reactDocgen: 'none'
  },
  webpackFinal: async (config: Configuration) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};