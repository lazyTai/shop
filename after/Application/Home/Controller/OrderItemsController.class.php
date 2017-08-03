<?php

namespace Home\Controller;

use  Common\Controller\BaseController;

class OrderItemsController extends BaseController
{
    public function index()
    {
        echo 'home-OrderItems';
    }

    function select_one()
    {
        $where['order_id'] = params('order_id');
        $order_items = m1('order_item');

        $results = $order_items->where($where)->select();

        $results = each1($results, function (&$index, &$item, &$results) {
            $goods = m1('goods');
            $goods_intro = m1('goods_intro');
            $good_item = $goods->getById($item['good_id']);
            $goods_item_with_intro = $goods_intro->getById($good_item['goods_intro_id']);
            $results[$index]['good'] = $goods_item_with_intro;
        });


        echo json_string(
            $this->message(true, $results)
        );
    }
}