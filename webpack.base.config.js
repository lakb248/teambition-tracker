/**
 * @file webpack base config file
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
            loader: 'vue-loader'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                {
                    notExtractLoader: 'style-loader',
                    loader: 'css-loader!sass-loader'
                }),
            exclude: /node_modules/
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [
        new ExtractTextPlugin('index.css'),
        new webpack.LoaderOptionsPlugin({
            vue: {
                postcss: [require('postcss-cssnext')({browsers: [
                    '> 1%', 'last 5 Android versions', 'last 5 iOS versions']})]
            }
        })
    ]
};
