/* eslint-disable prettier/prettier */
import path from 'path';
import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import modify from 'rollup-plugin-modify';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescriptPlugin from '@rollup/plugin-typescript';
// import typescript from 'rollup-plugin-typescript2';
// import createStyledComponentsTransformer from 'typescript-plugin-styled-components';

/*
const styledComponentsTransformer = createStyledComponentsTransformer({
  ssr: true,
  minify: true,
  displayName: false,
});

const typescriptPlugin = typescript({
  transformers: [
    () => ({
      before: [styledComponentsTransformer],
    }),
  ],
});
*/

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

/*************************************************
 - PLUGIN DEFINITIONS (INDIVIDUAL)
 *************************************************/

// This takes care of \n (search actual string by escaping \n so to not target line-breaks)
// ...followed by spaces created by functions nested within styled-components that return template literals ``
const modifyReplacePlugin = modify({
  find: /\\n\s*/gu,
  replace: '',
});

const babelPlugin = (useESModules = true) =>
  babel({
    babelrc: false,
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          targets: { browsers: ['>0.2%', 'not dead', 'not op_mini all'] },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { useESModules }],
      ['@babel/proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
    ],
  });

/*************************************************
- PLUGIN DEFINITIONS (GROUP)
 *************************************************/

const cjsPlugins = [
  resolve(),
  commonjs({ include: 'node_modules/**' }),
  typescriptPlugin(),
  // typescriptPlugin,
  babelPlugin(false),
  modifyReplacePlugin,
];

const esmPlugins = [
  resolve(),
  commonjs({ include: 'node_modules/**' }),
  typescriptPlugin(),
  // typescriptPlugin,
  babelPlugin(),
  modifyReplacePlugin,
];

const umdPlugins = (env) => [
  resolve(),
  commonjs({ include: 'node_modules/**' }),
  typescriptPlugin(),
  // typescriptPlugin,
  babelPlugin(),
  replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
  modifyReplacePlugin,
  terser(),
];

export default [
  /*** COMMONJS ***/
  {
    external,
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    plugins: cjsPlugins,
  },

  /*** MODULE ***/
  {
    external,
    input,
    output: {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
    },
    plugins: esmPlugins,
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
      exports: 'named',
    },
    plugins: umdPlugins('development'),
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
      exports: 'named',
    },
    plugins: umdPlugins('production'),
  },
];