<?php

namespace Admin\Controller;


class GoodsCategoryController extends BaseController
{
    public function index()
    {
        $this->display();
    }

    public function selectall()
    {
        $results = m1('goods_category')->select();
        echo json_string($results);
    }

    public function selectone()
    {
        $where['id'] = params('id');
        $result = m1('goods_category')->where($where)->find();
        echo json_string($result);
    }

    function update()
    {
        $where['id'] = params('id');
        $where['name'] = params('name');
        $good_category = d1('goods_category');
        if ($istrue = $good_category->create()) {
            $istrue1 = $good_category->save($where);
            echo $istrue1;
        } else {
            echo $good_category->getError();
        }


    }

}