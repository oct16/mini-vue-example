const webpackConfig = require('./webpack.config')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const DIST_FILE_PATH = path.resolve(__dirname, '../dist/')

webpackConfig.plugins.unshift(
    new CleanWebpackPlugin([DIST_FILE_PATH]),
   
)
module.exports = webpackConfig