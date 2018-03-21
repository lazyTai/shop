<?php

namespace app\index\model;

use think\Model;
use think\Db;

class User extends Model
{
    protected $table_name = "think_user";


    public static  function login($where){
        $result= Db::query("select * from think_user 
        where name='".$where['name']."' and 
         password='".$where['password']."'");
        if(count( $result)==0){
            /* 没有登录 */
            return [
                'message'=>'没有这个数据',
                "success"=>false
            ];
        }else{
            /* 修改登录状态 */
            $user=User::get($result[0]);
            $user->status=1;
            $user->save();
            return [
                'message'=>$user->getData(),
                "success"=>true
            ];
        }
    } 
}
