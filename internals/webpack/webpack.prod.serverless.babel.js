// Important modules this config uses
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = require('./webpack.prod.babel')({
  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), 'lambda.js')],

  externals: [nodeExternals()],

  output: {
    filename: 'prodLambda.js',
    libraryTarget: 'umd',
    library: 'lambda',
    // Needs to go in process.cwd in order to be imported
    // correctly from lambda
    path: path.join(process.cwd()),
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      SERVERLESS: '1',
    }),
  ],

  target: 'node',
  server: true,
});
