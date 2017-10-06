const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
    watch: true,
    entry: path.join(__dirname, 'src', 'shop.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'bower_components')
            ],
            loader: 'babel-loader',
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        },
        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ["css-loader", "less-loader"] })
        }
        ]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css']
    },
    devtool: 'source-map',
    devServer: {
        publicPath: path.join('/dist/')
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'css/style.css' })
    ]
};