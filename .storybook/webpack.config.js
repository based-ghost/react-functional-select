module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.story\.tsx?$/,
    loaders: [
      {
        loader: require.resolve("@storybook/source-loader"),
        options: {
          parser: "typescript"
        }
      }
    ],
    enforce: "pre"
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
  });
  
  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};