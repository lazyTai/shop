<?php

namespace app\admin\controller;

use think\Controller;

class Index extends Controller
{
    public function index()
    {
        $user= input('session.ext_user');
        if(isset($user)){
            return $this->fetch();
        }else{
            return $this->fetch('/login/index');
        }
    }
}