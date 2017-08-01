<?php

namespace Admin\Controller;

use Think\Controller;

class CityController extends Controller
{

    function selectAll()
    {
        $id = I('id');
        $City = D('City');
        $results = $City->where()->select();
        echo json_encode($results);
    }
}