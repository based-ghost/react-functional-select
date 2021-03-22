import path from 'path';
import type { Configuration } from 'webpack';

module.exports = {
  stories: ['../__stories__/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.stories\.(jsx?$|tsx?$)/],
          include: [path.resolve(__dirname, '../__stories__')],
        },
        loaderOptions: {
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