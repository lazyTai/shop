<?php

namespace Admin\Controller;

use Think\Controller;

class ProvinceController extends Controller
{

    function selectAll()
    {
        $id = I('id');
        $provice = D('Province');
        $results = $provice->where()->order('id asc')->select();
        echo json_encode($results);
    }
}