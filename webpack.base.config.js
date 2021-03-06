/**
 * @file webpack base config file
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './app/index.js'
    },
    output: {
        path: path.resolve('build') + '/',
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[chunkhash].[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
            use: 'url-loader?limit=8192'
        }]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        new ExtractTextPlugin('[contenthash].[name].css'),
        new webpack.LoaderOptionsPlugin({
            vue: {
                postcss: [require('postcss-cssnext')({browsers: [
                    '> 1%', 'last 5 Android versions', 'last 5 iOS versions']})]
            }
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        })
    ]
};
