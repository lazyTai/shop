<?php

namespace app\index\controller;

use think\Controller;
use app\index\model\User as UserDao;
class User extends Controller
{
    public function login()
    {
      $params=input('post.');
      $info= UserDao::login( $params);
       if($info['success']){
           session('ext_user',$info['message']);
       }
        return json($info);
    }

    public function unlogin(){
        session('ext_user',null);
        return "注销成功";
    }
}
