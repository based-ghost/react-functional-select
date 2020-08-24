import { Configuration } from 'webpack';

const _maxAssetSize = 512000;
const { merge } = require('webpack-merge');

module.exports = {
  stories: ['../__stories__/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-storysource',
  ],
  webpackFinal: (config: Configuration) => {
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
        presets: ['@babel/preset-env'],
      },
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return merge(config, {
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
    });
  },
};