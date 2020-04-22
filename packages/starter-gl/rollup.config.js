import { terser } from 'rollup-plugin-terser';

export default {
  input: '../../node_modules/@damienmortini/starter-gl/src/index.js',
  output: {
    file: 'build/index.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [terser()],
};
