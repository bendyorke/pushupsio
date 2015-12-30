var path = require('path')
var webpack = require('webpack')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var nested = require('postcss-nested')
var cssvars = require('postcss-simple-vars')
var cssimport = require('postcss-import')
var hexa = require('postcss-color-hex-alpha')

var globals = {
  __DEV__: true,
}

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './app/config/polyfills',
    'webpack-hot-middleware/client',
    './app/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.OldWatchingPlugin(),
    new webpack.DefinePlugin(globals),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'app')
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?module&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss',
      ],
    }, {
      test: /\.png$/,
      loaders: ['url?limit=10000']
    }, {
      test: /\.jpe?g$/,
      loaders: ['file'],
    }],
  },
  resolve: {
    modulesDirectories: ['app', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.css'],
  },
  postcss: function(webpack) {
    return [
      cssimport({ addDependencyTo: webpack }),
      nested,
      cssvars,
      hexa,
      autoprefixer,
      precss,
    ]
  },
}
