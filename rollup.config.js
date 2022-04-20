import path from 'path';
import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import typescript from '@rollup/plugin-typescript';

const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled',
  'react-window': 'ReactWindow'
};

const input = './src/index.ts';
const name = 'ReactFunctionalSelect';
const external = (id) => !id.startsWith('.') && !path.isAbsolute(id);

/**
 * Terser Plugin config
 */
const terserPlugin = terser({
  format: {
    comments: false
  }
});

/**
 * Replace Plugin config
 */
const replacePlugin = replace({
  preventAssignment: true,
  'process.env.NODE_ENV': JSON.stringify('production')
});

// Remove data-testid attribute (since undefined in non-test environments)
// Perform as final step in transformed, bundled code (for esm and cjs builds)
const removeTestIdPlugin = replace({
  preventAssignment: true,
  ',"data-testid":undefined': '',
  delimiters: ['', '']
});

/**
 * Babel Plugin config (differs from project's babel.config.js)
 */
const babelPlugin = (useESModules = true) => {
  const targets = useESModules
    ? { esmodules: true }
    : '> 0.25%, not dead, not ie 11';

  return babel({
    babelrc: false,
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    presets: [
      ['@babel/preset-env', {targets, loose: true}],
      '@babel/preset-react'
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', {useESModules}],
      ['@babel/plugin-proposal-optional-chaining', {loose: true}],
      ['@babel/plugin-proposal-nullish-coalescing-operator', {loose: true}],
      [
        'babel-plugin-styled-components',
        {
          ssr: true,
          pure: true,
          minify: true,
          fileName: false,
          displayName: true,
          transpileTemplateLiterals: true
        },
      ],
    ]
  });
};

export default [
  // COMMONJS
  {
    external,
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named'
    },
    plugins: [
      replacePlugin,
      typescript(),
      babelPlugin(false),
      terserPlugin,
      removeTestIdPlugin
    ],
  },

  // MODULE
  {
    external,
    input,
    output: {
      file: pkg.module,
      format: 'es'
    },
    plugins: [
      replacePlugin,
      typescript(),
      babelPlugin(),
      terserPlugin,
      removeTestIdPlugin
    ],
  },

  // BROWSER/UMD
  {
    external: Object.keys(globals),
    input,
    output: {
      file: pkg.umd,
      format: 'umd',
      globals,
      name
    },
    plugins: [
      replacePlugin,
      typescript(),
      babelPlugin(),
      terserPlugin,
      removeTestIdPlugin
    ],
  },
];