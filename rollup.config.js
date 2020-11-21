import path from 'path';
import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import modify from 'rollup-plugin-modify';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
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

/*************************************************
 - PLUGIN DEFINITIONS (INDIVIDUAL)
 *************************************************/

const styledComponentsTransformer = createStyledComponentsTransformer({
  ssr: false,
  minify: true,
  displayName: false,
});

const typescriptPlugin = typescript({
  clean: true,
  transformers: [
    () => ({
      before: [styledComponentsTransformer],
    }),
  ],
});

// This takes care of \n (search actual string by escaping \n so to not target line-breaks)
// ...followed by spaces created by functions nested within styled-components that return template literals ``
const modifyReplacePlugin = modify({
  find: /\\n\s*/gu,
  replace: '',
});

const babelPlugin = (useESModules = true) => {
  return babel({
    babelrc: false,
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    presets: [
      [
        '@babel/preset-env',
        {
          loose: false,
          targets: { browsers: ['>0.2%', 'not dead', 'not op_mini all'] },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { useESModules }],
      ['@babel/proposal-object-rest-spread', { loose: false, useBuiltIns: true }],
    ],
  });
};

/*************************************************
- PLUGIN DEFINITIONS (GROUP)
 *************************************************/

const cjsPlugins = [
  typescriptPlugin,
  babelPlugin(false),
  modifyReplacePlugin,
];

const esmPlugins = [
  typescriptPlugin,
  babelPlugin(),
  modifyReplacePlugin,
];

const getUmdPlugins = (env) => [
  typescriptPlugin,
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
      format: 'es',
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
    plugins: getUmdPlugins('development'),
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
    plugins: getUmdPlugins('production'),
  },
];