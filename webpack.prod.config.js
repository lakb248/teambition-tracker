/**
 * @file webpack prod config file
 */
var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.base.config');
config.output.filename = '[chunkhash].[name].js';
config.performance = {
    hints: 'warning'
};
config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: function(module, count) {
            // any required modules inside node_modules are extracted to vendor
            return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                    path.join(__dirname, 'node_modules')
                ) === 0
            );
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            warnings: false
        }
    })
]);
module.exports = config;
