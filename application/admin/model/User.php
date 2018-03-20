<?php

namespace app\admin\model;

use think\Model;
use think\Db;

class User extends Model
{
    protected $table_name ="think_user";


   public  static function login($name,$password){
       $infor=Db::table('think_user')->where([
           'name'=>$name,
           'password'=>$password
       ])->find();

       if($infor){
           return [
               'success'=>true,
               'message'=>$infor
           ];
       }
       return   [
        'success'=>false,
        'message'=>$infor
    ];;
   } 
   


}