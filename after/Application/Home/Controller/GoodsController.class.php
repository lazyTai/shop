<?php

namespace Home\Controller;

use  Common\Controller\BaseController;

class GoodsController extends BaseController
{
    public function index()
    {
        parent::me()->goto1();
    }

    public function selectall()
    {
        $results = m1('goods')->select();
//        {"id":"1","band_id":"3","goods_intro_id":"1"}
        foreach ($results as $index => $item) {
            $results[$index]['band'] =
                m1('band')->getById($item['band_id']);

            $results[$index]['goods_category'] =
                m1('goods_category')->getById($item['goods_category_id']);

            $results[$index]['galleries'] =
                m1('galleries')->where('goods_id='.$item['id'])
                    ->select()[0];


            $results[$index]['goods_intro'] =
                m1('goods_intro')
                    ->getById($item['goods_intro_id']);
        }
        echo json_string($results);
    }
}