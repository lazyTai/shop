<?php

namespace app\index\model;

use think\Model;
use think\Db;

class Good extends Model
{
    protected $table_name = "think_good";

    public static function read_by_create_time()
    {
        $results= Db::query("  SELECT * FROM think_good tg
        ORDER BY create_time DESC");
        return $results;
    }

    public static  function search($where){
        $sql="SELECT * FROM think_good ";

        $sql .="WHERE title LIKE '%".$where['title']."%' ";
        
        if($where['address_shi']){
            $sql .="AND a_shi='".$where['address_shi']."' ";
        }
        if($where['max_price']){
            $sql .="AND price >=".$where['min_price']." AND price<=".$where['max_price']." ";
        }
        if($where['time']){
            $sql .="AND DATEDIFF('2018-03-21','".$where['time']."')>=0";
        }
        // Db:query("SELECT * FROM think_good
        // WHERE title LIKE '%".$where['title']."%'
        // AND a_shi=".$where['address_shi']."
        // AND price >".$where['min_price']." AND price<".$where['max_price']."
        // AND UNIX_TIMESTAMP(update_time)<=UNIX_TIMESTAMP(".$where['time'].")");
        $sql .=" order by update_time desc";
        $result=Db::query($sql);
        return $result;
    } 
}
