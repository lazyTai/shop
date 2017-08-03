var express = require('express');
var router = express.Router();
var Mock = require('mockjs')
var app = express();
var u = require('../../public/javascripts/utils')

router.get('/', function (req, res, next) {
    res.json('good')
});
router.post('/select_all', function (req, res, next) {
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'band': {
                'id|+1': 1,
                'name|1-10': 'band',
            },
            'goods_intro': {
                'id|+1': 1,
                'name|1-10': 'name',
                'content|1-10': 'name',
                'price|1-10': 1,
            },
            'good_category': {
                'id|+1': 1,
                'name|1-10': 'good_category',
            },
            'galleries':{
                name:'',
                path:Mock.Random.image()
            }
        }]
    })

    res.json(JSON.stringify(u.message(true, data['list'])))
});


module.exports = router;
