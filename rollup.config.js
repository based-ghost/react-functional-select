/* eslint-disable prettier/prettier */
import path from 'path';
import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import modify from 'rollup-plugin-modify';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';

/*************************************************
 - CONFIG DATA
 *************************************************/
const globals = {
  'react': 'React',
  'styled-components': 'styled',
  'react-window': 'ReactWindow'
};

const input = './src/index.ts';
const name = 'ReactFunctionalSelect';
const external = id => !id.startsWith('.') && !path.isAbsolute(id);
const externalUmd = Object.keys(globals);

const styledComponentsTransformer = createStyledComponentsTransformer({
  ssr: true,
  minify: true,
  displayName: false,
});

/*************************************************
 - PLUGIN DEFINITIONS (INDIVIDUAL)
 *************************************************/
// This takes care of \n (search actual string by escaping \n so to not target line-breaks)
// ...followed by spaces created by functions nested within styled-components that return template literals ``
const modifyReplacePlugin = modify({
  find: /\\n\s*/g,
  replace: '',
});

const typescriptPlugin = typescript({
  transformers: [
    () => ({
      before: [styledComponentsTransformer],
    }),
  ],
});

const babelPlugin = (useESModules = false) => babel({
  babelrc: false,
  babelHelpers: 'runtime',
  exclude: 'node_modules/**',
  extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
  plugins: [
    ['@babel/plugin-transform-runtime', { useESModules }],
    ['@babel/proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
  ],
});

/*************************************************
- PLUGIN DEFINITIONS (GROUP)
 *************************************************/

const cjsAndEsPlugins = () => ([
  typescriptPlugin,
  babelPlugin(),
  resolve(),
  modifyReplacePlugin,
]);

const browserEnvPlugins = (env) => ([
  typescriptPlugin,
  babelPlugin(true),
  resolve(),
  replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
  modifyReplacePlugin,
  terser(),
]);

export default [
  /*** COMMONJS ***/
  {
    external,
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    plugins: cjsAndEsPlugins(),
  },

  /*** MODULE ***/
  {
    external,
    input,
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins: cjsAndEsPlugins(),
  },

  /*** BROWSER (DEVELOPMENT) ***/
  {
    external: externalUmd,
    input,
    output: {
      file: 'dist/index-dev.umd.js',
      format: 'umd',
      globals,
      name,
    },
    plugins: browserEnvPlugins('development'),
  },

  /*** BROWSER (PRODUCTION) ***/
  {
    external: externalUmd,
    input,
    output: {
      file: 'dist/index-prod.umd.js',
      format: 'umd',
      globals,
      name,
    },
    plugins: browserEnvPlugins('production'),
  },
];