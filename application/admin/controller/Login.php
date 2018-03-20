<?php

namespace app\admin\controller;

use think\Controller;
use app\admin\model\User as UserDao;
class Login extends Controller
{
    public function index()
    {
        return "admin-Login";
    }

    public function logging()
    {
        $params=input('post.');
        $infor=UserDao::login($params['name'],$params['password']);
        /* 设置session */
        if($infor['success']){
            session('ext_user',json_encode( $infor['message']));
        }
        return json($infor);
    }
}