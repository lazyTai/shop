<?php

namespace app\admin\controller;

use think\Controller;

class Index extends Controller
{
    public function index()
    {
        $string_user= input('session.ext_user');
        if(isset($string_user)){
            $this->assign('user',( $string_user));
            return $this->fetch();
        }else{
            return $this->fetch('/login/index');
        }
    }
}