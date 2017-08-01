<?php

namespace Admin\Controller;

use Think\Controller;

class MemberController extends Controller
{

    function selectAll()
    {
        $id = I('id');
        $Member = D('Member');
        $results = $Member->where()->select();
        echo json_encode($results);
    }
}