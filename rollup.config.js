import pkg from "./package.json";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

// helper function used to convert package names to an alias for globals
// Example: react-functional-select => ReactFunctionalSelect
const getExternalPkgAlias = (external) => {
  const capFirstChar = (external.charAt(0).toUpperCase() + external.slice(1));
  return (capFirstChar.indexOf('-') > -1)
    ? capFirstChar.split('-').reduce((a, b) =>  (a + b.charAt(0).toUpperCase() + b.slice(1)))
    : capFirstChar;
};

const _input = "./src/index.ts";
const _name = getExternalPkgAlias(pkg.name);
const _externals = Object.keys(pkg.peerDependencies || {});

const _umdGlobals = (() => {
  const globals = {};
  _externals.forEach((key) => {
     globals[key] = getExternalPkgAlias(key);
  });
  return globals;
})();

export default [
  // commonjs build
  {
    input: _input,
    external: _externals,
    output: {
      file: pkg.main,
      format: "cjs"
    },
    plugins: [
      typescript({
        typescript: require("typescript")
      }),
    ]
  },

  // module build
  {
    input: _input,
    external: _externals,
    output: {
      file: pkg.module,
      format: "esm"
    },
    plugins: [
      typescript({
        typescript: require("typescript")
      }),
    ]
  },

  // browser umd (development build)
  {
    input: _input,
    external: _externals,
    output: {
      file: "dist/index-dev.umd.js",
      format: "umd",
      name: _name,
      globals: _umdGlobals
    },
    plugins: [
      typescript({
        typescript: require("typescript")
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development")
      }),
      terser()
    ]
  },

  // browser umd (production build)
  {
    input: _input,
    external: _externals,
    output: {
      file: "dist/index-prod.umd.js",
      format: "umd",
      name: _name,
      globals: _umdGlobals
    },
    plugins: [
      typescript({
        typescript: require("typescript")
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development")
      }),
      terser()
    ]
  }
];