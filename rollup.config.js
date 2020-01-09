/* eslint-disable prettier/prettier */
import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import typescript from 'rollup-plugin-typescript2';

const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'react-window': 'ReactWindow',
  'styled-components': 'StyledComponents',
};

const input = './src/index.ts';
const name = 'ReactFunctionalSelect';

// Exclude react-dom package
const external = Object.keys(globals).filter(x => x !== 'react-dom');

const typescript2Plugin = typescript({
  typescript: require('typescript'),
});

const babelPlugin = babel({
  extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
});

export default [
  /*** COMMONJS ***/
  {
    external,
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    plugins: [
      typescript2Plugin,
      babelPlugin
    ],
  },

  /*** MODULE ***/
  {
    external,
    input,
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins: [
      typescript2Plugin,
      babelPlugin
    ],
  },

  /*** BROWSER (DEVELOPMENT) ***/
  {
    external,
    input,
    output: {
      file: 'dist/index-dev.umd.js',
      format: 'umd',
      globals,
      name,
    },
    plugins: [
      typescript2Plugin,
      babelPlugin,
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      terser(),
    ],
  },

  /*** BROWSER (PRODUCTION) ***/
  {
    external,
    input,
    output: {
      file: 'dist/index-prod.umd.js',
      format: 'umd',
      globals,
      name,
    },
    plugins: [
      typescript2Plugin,
      babelPlugin,
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser(),
    ],
  },
];