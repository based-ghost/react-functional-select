/* eslint-disable prettier/prettier */
import pkg from './package.json';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

// Function used to create package aliases for globals (e.g. react-functional-select => ReactFunctionalSelect)
const getExternalPkgAlias = (external) => {
  const capFirstChar = (external.charAt(0).toUpperCase() + external.slice(1));
  return (capFirstChar.indexOf('-') > -1)
    ? capFirstChar.split('-').reduce((a, b) =>  (a + b.charAt(0).toUpperCase() + b.slice(1)))
    : capFirstChar;
};

const _input = './src/index.ts';
const _name = getExternalPkgAlias(pkg.name);
const _externals = Object.keys(pkg.peerDependencies || {});

const _umdGlobals = (() => {
  const globals = {};
  _externals.forEach((key) => { globals[key] = getExternalPkgAlias(key); });
  return globals;
})();

const typescript2Plugin = typescript({
  typescript: require('typescript'),
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
    plugins: [typescript2Plugin],
  },

  /** * MODULE ****/
  {
    external: _externals,
    input: _input,
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins: [typescript2Plugin],
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
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser(),
    ],
  },
];