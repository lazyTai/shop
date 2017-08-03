<?php

namespace Home\Controller;

use  Common\Controller\BaseController;

class OrderController extends BaseController
{
    public function index()
    {
        echo 'home-order';
    }

    function add()
    {
        $data1['member_id'] = login()['id'];
        $data1['order_items'] = params('order_items');
        $data1['price'] = params('price');
        $data1['address_id'] = params('address_id');

        $data2 = params('order_items');

        $order = d1('order');

        $result = $order->makeOrder($data1, $data2);
        echo json_string($result);


    }

    function select_one_by_member_id()
    {
        $where['member_id'] = params('member_id');
        $results = m1('order')->where($where)->select();

        $results = each1($results, function (&$index, &$item, &$results) {
            $address = m1('address');
            $results[$index]['address'] = $address->getById($item['address_id']);
        });

        echo json_string(parent::me()->message(true, $results));

    }
}