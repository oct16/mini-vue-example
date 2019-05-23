const webpackConfig = require('./webpack.config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
        template: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
)
webpackConfig.devServer = {
    open: true
}
module.exports = webpackConfig