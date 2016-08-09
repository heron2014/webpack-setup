'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./libs/parts');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};


const common = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack setup'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need
        // something more custom, pass a path to it.
        // I.e., babel?cacheDirectory=<path>
        loaders: ['babel?cacheDirectory'],
        // Parse only app files! Without this it will go through
        // the entire project. In addition to being slow,
        // that will most likely result in an error.
        include: PATHS.app
      },
    ]
  }
};


var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
  config = merge(
    common,
    parts.minify(),
    parts.setupCSS(PATHS.app)
  );
    break;
  default:
  config = merge(
    common,
    parts.setupCSS(PATHS.app),
    parts.devServer({
      // Customize host/port here if needed
      host: process.env.HOST,
      port: process.env.PORT
    })
  );
}

module.exports = validate(config);
