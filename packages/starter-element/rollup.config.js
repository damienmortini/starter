import { terser } from 'rollup-plugin-terser';

export default {
  input: '../../node_modules/@damienmortini/starter-element/src/index.js',
  output: {
    file: 'build/index.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [terser()],
};
