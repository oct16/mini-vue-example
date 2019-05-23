const webpackConfig = require('./webpack.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

webpackConfig.plugins.unshift(
    new BundleAnalyzerPlugin()
)

module.exports = webpackConfig