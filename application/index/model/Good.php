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
}
