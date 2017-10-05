const path = require('path');
module.exports = {
    watch: true,
    entry: path.join(__dirname, 'src', 'shop.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /.(js|jsx)?$/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'bower_components')
            ],
            loader: 'babel-loader',
        }]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css']
    },
    devtool: 'source-map',
    devServer: {
        publicPath: path.join('/dist/')
    }
};