<?php

namespace app\index\model;

use think\Model;
use think\Db;

class Article extends Model
{
    protected $table_name = "think_article";

    public static function page($where, $currentPage)
    {

        $pageSize=10;
        $data = Db::query(' SELECT 
        a.id,a.title,a.content,a.update_time,a.create_time,a.image_src,u.name AS user_name,
        lm.like_num, st.sub_type_name,p.image_url AS head_image_url
        FROM 
        think_article a
        LEFT JOIN 
        (
            SELECT 
            id,
            article_id,
            user_id,
            COUNT(id) AS like_num 
            FROM 
            demo.think_article_like 
            WHERE STATUS=1
            GROUP BY  article_id
        ) AS lm
        ON 
        a.id=lm.article_id
        LEFT JOIN
        think_user u
        ON
        u.id=a.user_id
        LEFT JOIN
        think_sub_type st
        ON st.id=a.type_id
        
        LEFT JOIN
        think_profile p
        ON u.id=p.user_id
        ORDER BY like_num DESC
        limit '.($currentPage)*$pageSize.',10');

        $count = Db::table('think_article')->where($where)->count();
        return [
            "data" => $data,
            "page" => ceil($count / config('pageSize'))
        ];
    }

    public  static  function page_7_day($where=[], $currentPage){

    }

    public static function new_list($list_mun)
    {
        $data = Db::table('think_article')->order('create_time desc')->limit(
            0,
            $list_mun
        )->select();
        return $data;
    }


}