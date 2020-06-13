/* eslint-disable prettier/prettier */
import path from 'path';
import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import modify from 'rollup-plugin-modify';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import typescript from 'rollup-plugin-typescript2';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';

/*************************************************
 # CONFIG DATA
 *************************************************/
const globals = {
  'react': 'React',
  'styled-components': 'styled',
  'react-window': 'ReactWindow'
};

const input = './src/index.ts';
const name = 'ReactFunctionalSelect';
const external = id => !id.startsWith('.') && !path.isAbsolute(id);

const styledComponentsTransformer = createStyledComponentsTransformer({
  minify: true,
  ssr: true,
});

/*************************************************
 # PLUGIN DEFINITIONS (INDIVIDUAL)
 *************************************************/
// This takes care of \n (search actual string by escaping \n so to not target line-breaks)
// ...followed by spaces created by functions nested within styled-components that return template literals ``
const modifyReplacePlugin = modify({
  find: /(\\n\s+|\\n)/g,
  replace: '',
});

const commonJsPlugin = commonjs({
  include: /node_modules/,
});

const typescriptPlugin = typescript({
  transformers: [
    () => ({
      before: [styledComponentsTransformer],
    }),
  ],
});

const babelPlugin = babel({
  babelrc: false,
  babelHelpers: 'bundled',
  exclude: /node_modules/,
  extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
  presets: [['@babel/preset-env', { loose: true }], '@babel/preset-react'],
  plugins: [
    ['@babel/proposal-class-properties', { loose: true }],
    ['@babel/proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
  ],
});

/*************************************************
 # PLUGIN DEFINITIONS (GROUP)
 *************************************************/
const CORE_PLUGINS = [
  typescriptPlugin,
  commonJsPlugin,
  babelPlugin,
];

export default [
  /*** COMMONJS ***/
  {
    external,
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    plugins: [...CORE_PLUGINS, modifyReplacePlugin],
  },

  /*** MODULE ***/
  {
    external,
    input,
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins: [...CORE_PLUGINS, modifyReplacePlugin],
  },

  /*** BROWSER (DEVELOPMENT) ***/
  {
    external: Object.keys(globals),
    input,
    output: {
      file: 'dist/index-dev.umd.js',
      format: 'umd',
      globals,
      name,
    },
    plugins: [
      ...CORE_PLUGINS,
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      modifyReplacePlugin,
      terser(),
    ],
  },

  /*** BROWSER (PRODUCTION) ***/
  {
    external: Object.keys(globals),
    input,
    output: {
      file: 'dist/index-prod.umd.js',
      format: 'umd',
      globals,
      name,
    },
    plugins: [
      ...CORE_PLUGINS,
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      modifyReplacePlugin,
      terser(),
    ],
  },
];