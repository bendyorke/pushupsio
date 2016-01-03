var path = require('path')
var webpack = require('webpack')

var globals = {
  __DEV__: false,
  __PROD__: true,
}

module.exports = {
  entry: './app',
  output: {
    path: path.join(__dirname, 'public', 'static'),
    filename: 'pushups.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin(globals),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'app'),
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?module&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss',
      ],
    }, {
      test: /\.png$/,
      loaders: ['url?limit=10000'],
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
      require('postcss-import')({ addDependancyTo: webpack }),
      require('postcss-each'),
      require('postcss-mixins'),
      require('postcss-conditionals'),
      require('postcss-nested'),
      require('postcss-simple-vars'),
      require('postcss-custom-properties')({ variables: require('./app/config/colors').all }),
      require('postcss-color-hex-alpha'),
      require('postcss-color-function'),
      require('postcss-property-lookup'),
      require('postcss-custom-selectors'),
      require('autoprefixer'),
      require('csswring'),
    ]
  },
}
