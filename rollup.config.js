/* eslint-disable prettier/prettier */
import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const _input = './src/index.ts';
const _name = 'ReactFunctionalSelect';
const _externals = Object.keys(pkg.peerDependencies || {});

const _umdGlobals = {
  'react': 'React',
  'react-window': 'ReactWindow',
  'styled-components': 'StyledComponents',
};

const typescript2Plugin = typescript({
  typescript: require('typescript'),
});

const babelConfigESModules = babel({
  plugins: [['@babel/transform-runtime', { useESModules: true }]],
  runtimeHelpers: true,
  sourceMaps: true,
});

export default [
  /** * COMMONJS ****/
  {
    external: _externals,
    input: _input,
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    plugins: [
      typescript2Plugin,
      babel({
        plugins: ['@babel/transform-runtime'],
        runtimeHelpers: true,
        sourceMaps: true,
      }),
    ],
  },

  /** * MODULE ****/
  {
    external: _externals,
    input: _input,
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins: [
      typescript2Plugin,
      babelConfigESModules,
    ],
  },

  /** * BROWSER (DEVELOPMENT) ****/
  {
    external: _externals,
    input: _input,
    output: {
      file: 'dist/index-dev.umd.js',
      format: 'umd',
      globals: _umdGlobals,
      name: _name,
    },
    plugins: [
      typescript2Plugin,
      babelConfigESModules,
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      terser(),
    ],
  },

  /** * BROWSER (PRODUCTION) ****/
  {
    external: _externals,
    input: _input,
    output: {
      file: 'dist/index-prod.umd.js',
      format: 'umd',
      globals: _umdGlobals,
      name: _name,
    },
    plugins: [
      typescript2Plugin,
      babelConfigESModules,
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser(),
    ],
  },
];