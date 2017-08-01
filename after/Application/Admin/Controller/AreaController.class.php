<?php

namespace Admin\Controller;

use Think\Controller;

class AreaController extends Controller
{

    function selectAll()
    {
        $id = I('id');
        $Area = D('Area');
        $results = $Area->where()->order('id asc')->select();
        echo json_encode($results);
    }

    function edit()
    {
        $where['id'] = I('id');
        $area = M('Area')->where($where)->find();
        $this->assign('Area', json_encode($area));
        $this->display();
    }

    function update()
    {
        $data['id'] = I('id');
        $data['name'] = I('name');
        $area = D('Area');
        if ($area->create()) {
            if ($result = $area->save()) {
                echo $result;
            } else {
                echo "nono";
            }

        } else {
            echo $this->getError();
        }

    }
}