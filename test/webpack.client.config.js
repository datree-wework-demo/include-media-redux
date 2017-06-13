const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    noParse: [/node_modules(\\|\/)sinon/],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname)],
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      sinon: 'sinon/pkg/sinon',
    },
  },

  // Shim unnecessary node-only deps in client builds
  // https://github.com/trentm/node-bunyan#webpack
  node: {
    fs: 'empty',
    mv: 'empty',
    'dtrace-provider': 'empty',
    'safe-json-stringify': 'empty',
    'source-map-support': 'empty',
  },
};
