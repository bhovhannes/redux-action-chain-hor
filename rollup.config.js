import rollupTypescript from 'rollup-plugin-typescript'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/redux-action-chain-hor.cjs.js',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: './dist/redux-action-chain-hor.umd.js',
      format: 'umd',
      name: 'ReduxActionChain',
      exports: 'named'
    },
    {
      file: './dist/redux-action-chain-hor.esm.js',
      format: 'esm'
    }
  ],
  plugins: [rollupTypescript()]
}
