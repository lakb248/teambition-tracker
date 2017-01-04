/**
 * @file webpack base config file
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        app: './app/index.js'
    },
    output: {
        path: path.resolve('build') + '/',
        publicPath: '/build/',
        filename: '[name].js',
        chunkFilename: '[chunkhash].[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                {notExtractLoader: 'style-loader', loader: 'css-loader!sass-loader'}),
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new ExtractTextPlugin('index.css'),
        new webpack.LoaderOptionsPlugin({
            vue: {
                postcss: [require('postcss-cssnext')({browsers: [
                    '> 1%', 'last 5 Android versions', 'last 5 iOS versions']})]
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
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
    ]
};
