import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import typescript from '@rollup/plugin-typescript';

/*************************************************
 - CONFIG DATA
 *************************************************/

const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled',
  'react-window': 'ReactWindow',
};

const input = './src/index.ts';
const name = 'ReactFunctionalSelect';

const external = (id) => /^react|react-dom|styled-components|react-window|@babel\/runtime/.test(id);

/*************************************************
 - PLUGIN DEFINITIONS (INDIVIDUAL)
 *************************************************/

 const minifierPlugin = terser({
   format: {
     preserve_annotations: true,
   },
 });

const babelPlugin = (useESModules = true) => {
  const targets = useESModules
    ? { esmodules: true }
    : '>1%, not dead, not ie 11, not op_mini all';

  return babel({
    babelrc: false,
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    presets: [
      ['@babel/preset-env', { targets, loose: false, bugfixes: true }],
      ['@babel/preset-react', { runtime: 'classic' }],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { useESModules }],
      '@babel/plugin-proposal-optional-chaining',
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

/*************************************************
- PLUGIN DEFINITIONS (GROUP)
 *************************************************/

const cjsPlugins = [
  typescript(),
  babelPlugin(false),
  // minifierPlugin,
];

const esmPlugins = [
  typescript(),
  babelPlugin(),
  // minifierPlugin,
];

const umdPlugins = [
  typescript(),
  babelPlugin(),
  replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  minifierPlugin,
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

  /*** BROWSER/UMD (PRODUCTION) ***/
  {
    external: Object.keys(globals),
    input,
    output: {
      file: pkg.umd,
      format: 'umd',
      globals,
      name,
      exports: 'named',
    },
    plugins: umdPlugins,
  },
];