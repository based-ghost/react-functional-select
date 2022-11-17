import path from 'path';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import typescript from '@rollup/plugin-typescript';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled',
  'react-window': 'ReactWindow'
};

const input = './src/index.ts';
const name = 'ReactFunctionalSelect';
const external = (id) => id.includes('@babel/runtime') || (!id.startsWith('.') && !path.isAbsolute(id));

/**
 * Replace Plugin config
 */
const replacePlugin = replace({
  preventAssignment: true,
  'process.env.NODE_ENV': JSON.stringify('production'),
});

// Remove data-testid attribute (since undefined in non-test environments)
// Perform as final step in transformed, bundled code (for esm and cjs builds)
const removeTestIdPlugin = replace({
  preventAssignment: true,
  ',"data-testid":undefined': '',
  delimiters: ['', '']
});

/**
 * Babel Plugin config (prevents use of root babel.config.js with babelrc and configFile as false)
 */
const babelPlugin = (useESModules) => {
  const targets = useESModules
    ? { esmodules: true }
    : '> 0.25%, last 2 versions, not dead';

  return babel({
    babelrc: false,
    configFile: false,
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    presets: [['@babel/preset-env', {targets, loose: true}], '@babel/preset-react'],
    plugins: [
      ['@babel/plugin-transform-runtime', {useESModules}],
      [
        'babel-plugin-styled-components',
        {
          ssr: true,
          pure: true,
          minify: true,
          fileName: false,
          displayName: true,
          transpileTemplateLiterals: true,
        },
      ],
    ],
  });
};

/**
 * Common plugins in each build
 */
const commonPlugins = (useESModules = true) => [
  typescript(),
  replacePlugin,
  babelPlugin(useESModules),
  terser(),
  removeTestIdPlugin,
];

export default [
  // COMMONJS
  {
    external,
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    plugins: commonPlugins(false),
  },

  // MODULE
  {
    external,
    input,
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins: commonPlugins(true),
  },

  // BROWSER/UMD
  {
    external: Object.keys(globals),
    input,
    output: {
      file: pkg.umd,
      format: 'umd',
      globals,
      name,
    },
    plugins: commonPlugins(true),
  },
];