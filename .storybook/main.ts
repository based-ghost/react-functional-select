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
    /*config.module.rules.push({
      test: /\.stories\.tsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: {
            parser: 'typescript',
          },
        },
      ],
      enforce: 'pre',
    }); */

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          ['react-app', { flow: false, typescript: true, runtime: 'automatic' }]
        ],
      },
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};