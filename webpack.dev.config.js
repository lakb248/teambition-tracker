/**
 * @file webpack dev config file
 */
var config = require('./webpack.base.config');

config.devtool = 'inline-source-map';
config.performance = {
    hints: false
}

module.exports = config;
