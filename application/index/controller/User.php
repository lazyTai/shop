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
        $ext_user=session('ext_user');
        UserDao::unlogin(  $ext_user['id']);
        session('ext_user',null);
        
        return "注销成功";
    }

    public function update_user(){
        $params=input('post.');
        $user=UserDao::get( $params['id']);
        $user->name=$params['name'];
        $user->password=$params['password'];
        $user->image_url=$params['image_url'];
        $user->address=$params['address'];
        $infor=$user->save();

        session('ext_user',$user->getData());
        return $infor;
    }
}
