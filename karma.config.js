var webpack = require('webpack');
var baseConfig = require('./webpack.base.config');
delete baseConfig.entry;

// add isparta-loader to vue file
var webpackConfig = baseConfig;
webpackConfig.plugins = (baseConfig.plugins || []).concat([
    new webpack.LoaderOptionsPlugin({
        options: {
            vue: {
                loaders: {
                    js: 'isparta-loader'
                }
            }
        }
    })
]);
webpackConfig.module.rules = (webpackConfig.module.rules || []).concat([{
    enforce: 'pre',
    test: /\.js?$/,
    loader: 'isparta-loader',
    exclude: [/node_modules/, /test/]
}]);

var isDev = process.env.NODE_ENV === 'develop';

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage', 'verbose'],
        // this is the entry file for all our tests.
        files: ['./test/index.js'],
        // we will pass the entry file to webpack for bundling.
        preprocessors: {
            './test/index.js': ['webpack']
        },
        coverageReporter: {
            dir: './coverage',
            reporters: [
                {type: 'html'},
                {type: 'text-summary'},
                {type: 'cobertura', subdir: '.'}
            ]
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        autoWatch: isDev,
        singleRun: !isDev
    });
};
