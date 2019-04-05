import rollupTypescript from 'rollup-plugin-typescript'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/redux-action-chain.cjs.js',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: './dist/redux-action-chain.umd.js',
      format: 'umd',
      name: 'ReduxActionChain',
      exports: 'named'
    },
    {
      file: './dist/redux-action-chain.esm.js',
      format: 'esm'
    }
  ],
  plugins: [rollupTypescript()]
}
