const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DIST_FILE_PATH = path.resolve(__dirname, '../dist/mini-vue')

module.exports = {
    entry: path.join(__dirname, '../src/app.ts'),
    output: {
        filename: '[name].bundle.js',
        path: DIST_FILE_PATH
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                loader: 'ts-loader',
                exclude: /node_modules/,
                test: /\.tsx?$/
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
            },
            {
                test: /\.html$/,
                use: ['underscore-template-loader']
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            env: process.env
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}
