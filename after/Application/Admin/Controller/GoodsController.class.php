<?php

namespace Admin\Controller;


class GoodsController extends BaseController
{


    public function index()
    {
        $this->display();
    }

    function selectall()
    {
        $result = M('Goods')->select();
        foreach ($result as $index => $item) {
            $result[$index]['band'] =
                m1('band')->getById($item['band_id']);

            $result[$index]['goods_category'] =
                m1('goods_category')->
                getById($item['goods_category_id']);

            $result[$index]['goods_intro'] =
                m1('goods_intro')->getById($item['goods_intro_id']);
        }

        echo json1($result);
    }

    function select($id)
    {
        $result = m1('goods')->getById($id);
        $result['band'] = m1('band')->getById($result['band_id']);
        $result['goods_category'] =
            m1('goods_category')->
            getById($result['goods_category_id']);

        $result['goods_intro'] = m1('goods_intro')
            ->getById($result['goods_intro_id']);

        echo  json_string($result);
    }

    function edit()
    {
        $id = params('id');
        $result = json1($this->select($id));
        parent::me()->goto1('good', $result);
    }

    function update()
    {
        $goods = d1('goods');
        $goods_intro = d1('goods_intro');

        $data['id'] = params('json')['id'];
        $data['band_id'] = params('json')['band']['id'];
        $data['goods_category_id'] = params('json')['goods_category']['id'];
        $result1 = d1('goods')->save($data);


        $data1['id'] = params('json')['goods_intro']['id'];
        $data1['name'] = params('json')['goods_intro']['name'];
        $data1['content'] = params('json')['goods_intro']['content'];
        $data1['price'] = params('json')['goods_intro']['price'];

        $result2 = d1('goods_intro')->save($data1);


        echo json1(['success' => true]);
    }

    function addshow()
    {
        parent::me()->goto1();
    }

    function add()
    {
        //good intor
        $goods_intro = d1('goods_intro');
        $goods = d1('goods');

        $goods_intro->startTrans();

        $data['name'] = params('json')
        ['goods_intro']['name'];

        $data['content'] = params('json')
        ['goods_intro']['content'];

        $data['price'] = params('json')
        ['goods_intro']['price'];

        $result1 = $goods_intro->add($data);


        $data1['band_id'] = params('json')
        ['band']['id'];
        $data1['goods_category_id'] = params('json')
        ['goods_category']['id'];

        $data1['goods_intro_id'] = $result1;
        $result2 = $goods->add($data1);
        if ($result1 && $result2) {
            $goods_intro->commit();
            echo 'ok';
        } else {
            $goods_intro->rollback();
            echo 'nono';
        }

    }

    function uploadshow()
    {
        $id = params('id');
        $this->goto1("id", $id);
    }


}