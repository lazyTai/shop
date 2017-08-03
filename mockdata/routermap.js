var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var address = require('./routes/admin/address');


var home = require('./routes/home');
var home_good = require('./routes/home/good');
var home_address = require('./routes/home/address');
var home_order = require('./routes/home/order');
var home_order_items = require('./routes/home/order_items');

module.exports = function (app) {
    app.use('/', index);
    app.use('/users', users);
    app.use('/admin', admin);
    app.use('/admin/address', address);
    app.use('/home', home);
    app.use('/home/goods', home_good);
    app.use('/home/address', home_address);
    app.use('/home/order', home_order);
    app.use('/home/order_items', home_order_items);
}