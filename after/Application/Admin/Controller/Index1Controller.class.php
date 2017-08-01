<?php

namespace Admin\Controller;

use Think\Controller;

class Index1Controller extends Controller
{
    public function index()
    {
        $this->display();
    }
    function  getAllTable(){
        $model=M();
        $results=$model->query('show tables');
        echo json_encode($results);
    }
}