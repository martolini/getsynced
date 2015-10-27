var path = require('path');
var webpack = require('webpack');

var config = {
  entry: [
    path.resolve(__dirname, '../src/main.js')
  ],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'react-hot!babel-loader?stage=0',
      include: path.join(__dirname, '../src')
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  devServer: {
    historyApiFallback: true
  },

  node: {
    fs: 'empty'
  }
};

module.exports = config;
