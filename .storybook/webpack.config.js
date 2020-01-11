const merge = require('webpack-merge');
const maxAssetSize = 512000;

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.story\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' }
      }
    ],
    enforce: 'pre'
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('@babel/preset-react')],
    },
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return merge(config, {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30 * 1024,
        maxSize: maxAssetSize,
      },
    },
    performance: {
      maxAssetSize: maxAssetSize,
    },
  });
};