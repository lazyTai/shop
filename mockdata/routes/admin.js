var express = require('express');
var router = express.Router();
var Mock = require('mockjs')
var app = express();
var u = require('../public/javascripts/utils')

/* GET home page. */
var address = require('./admin/address');

router.get('/', function (req,res,next) {
    res.json('admin')
});


module.exports = router;
