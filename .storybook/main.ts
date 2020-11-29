import { Configuration } from 'webpack';
// import { merge } from 'webpack-merge';
// const _maxAssetSize = 512000;

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
      },
    },
  ],
  typescript: {
    reactDocgen: 'none'
  },
  webpackFinal: async (config: Configuration) => {
    config.module.rules.push({
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
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true, runtime: 'automatic' }]],
      },
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
    /* return merge(config, {
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30 * 1024,
          maxSize: _maxAssetSize,
        },
      },
      performance: {
        maxAssetSize: _maxAssetSize,
      },
    }); */
  },
};