var path = require('path');
var webpack = require('webpack');

var config = {
  entry: [
    path.resolve(__dirname, '../src/main.js')
  ],
  output: {
    path: path.resolve(__dirname, '../static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel-loader?stage=0',
      include: path.join(__dirname, '../src')
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  }
};

module.exports = config;
