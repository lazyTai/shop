<?php
/**
 * Created by PhpStorm.
 * User: lmt
 * Date: 17-7-29
 * Time: 上午10:15
 */

namespace Admin\Model;

use Think\Model;

class AddressModel extends Model
{

    protected $table = 'address';

    public function getFields1()
    {
        /*$a=get_class();
        $start = strpos(__CLASS__, "Controller");
        $length = strlen(__CLASS__);
        $result = substr(__CLASS__, $start, $length - $start);*/
        $cond = C('DB_PREFIX') . $this->table;
        $result = M()->query("select COLUMN_NAME from information_schema.COLUMNS where table_name = '$cond'");
        return $result;
    }

    public function pageSelect($current_page, $where = [])
    {
        $message['rows'] = $this->where($where)->page($current_page, C('page_page'))->select();
        $message['total'] = ceil($this->where($where)->count() / C('page_page'));
        return $message;
    }

    function selectJoin($where = [])
    {
        $datas = $this->where($where)->select();

        foreach ($datas as $index => $item) {
            $datas[$index]['Province'] = M('Province')->getById($item['province_id'])['name'];
            $datas[$index]['City'] = M('City')->getById($item['city_id'])['name'];
            $datas[$index]['Area'] = M('Area')->getById($item['area_id'])['name'];
            $datas[$index]['Member'] = M('Member')->getById($item['member_id'])['username'];
        }


        return $datas;

    }

    function selectById($id)
    {
        $where['id'] = $id;
        $data = $this->where($where)->find();
        $data['Province'] = M('Province')->getById($data['province_id'])['name'];
        $data['City'] = M('City')->getById($data['city_id'])['name'];
        $data['Area'] = M('Area')->getById($data['area_id'])['name'];
        $data['Member'] = M('Member')->getById($data['member_id'])['username'];
        return $data;
    }

    function add1($data)
    {
        $message = [];
        $this->data = $data;
        if ($this->create()) {
            if ($a = $this->add()) {
                return $message['result'] = $a;
            } else {
                return $message['result'] = 'false';
            }
        } else {
            return $this->getError();
        }


    }

}