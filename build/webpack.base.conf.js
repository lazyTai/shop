var path = require('path')

module.exports = {
    entry: {
        admin_index: path.resolve(__dirname,
            '../application/admin/view/index/index.js'),
        admin_login: path.resolve(__dirname,
            '../application/admin/view/login/index.js'),

    },
    output: {
        path: path.resolve(__dirname, '../public/static/js/'),
        filename: '[name]/[name].js',
        publicPath: 'public/static/js/',
    }
}