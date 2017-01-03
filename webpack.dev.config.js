/**
 * @file webpack dev config file
 */
var webpack = require('webpack');
var config = require('./webpack.base.config');
var path = require('path');

config.devtool = 'inline-source-map';

config.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
            // any required modules inside node_modules are extracted to vendor
            return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                    path.join(__dirname, 'node_modules')
                ) === 0
            )
        }
    })
]);

module.exports = config;
