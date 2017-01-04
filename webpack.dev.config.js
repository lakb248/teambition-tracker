/**
 * @file webpack dev config file
 */
var webpack = require('webpack');
var config = require('./webpack.base.config');
var path = require('path');

config.devtool = 'inline-source-map';

module.exports = config;
