var express = require('express');
var router = express.Router();
var Mock = require('mockjs')

var u = require('../../public/javascripts/utils')

/* GET home page. */

router.get('/', function (req, res, next) {
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'name|1-10': 'address',
            'good': {
                'id|+1': 1,
                'name|1-10': 'address',
            }
        }]
    })

    res.json([data])
});

/*
*
* select
* by member_id
*
* */

router.get('/address_select_member_id', function (req, res, next) {
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'detail_address|1-10': '你好',
            'tel|1-11': 11,
            'member': {
                'id|1-10': 1,
                'username|1-10': '你好',
                'password|1-11': '你好',
                'email|1-11': '你好',
                'tel|1-11': 18818,
                'addtime_at|1-11': 11
            }
        }]
    })
    res.json(u.message(true, [data.list]))
});

/*
* selec one
* */
router.get('/address_select_one', function (req, res, next) {
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'detail_address|1-10': '你好',
            'tel|1-11': 11,
            'member': {
                'id|1-10': 1,
                'username|1-10': '你好',
                'password|1-11': '你好',
                'email|1-11': '你好',
                'tel|1-11': 18818,
                'addtime_at|1-11': 11
            }
        }]
    })

    res.json(u.message(true, [data.list[0]]))
});
/*update
*save
*
* */

router.get('/update', function (req, res, next) {
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'detail_address|1-10': '你好',
            'tel|1-11': 11,
            'member': {
                'id|1-10': 1,
                'username|1-10': '你好',
                'password|1-11': '你好',
                'email|1-11': '你好',
                'tel|1-11': 18818,
                'addtime_at|1-11': 11
            }
        }]
    })

    res.json(u.message(true, 'ok'))
});
router.get('/save', function (req, res, next) {
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'detail_address|1-10': '你好',
            'tel|1-11': 11,
            'member': {
                'id|1-10': 1,
                'username|1-10': '你好',
                'password|1-11': '你好',
                'email|1-11': '你好',
                'tel|1-11': 18818,
                'addtime_at|1-11': 11
            }
        }]
    })

    res.json(u.message(true, 'ok'))
});


module.exports = router;
