<?php

namespace Home\Model;

use Think\Model;

class OrderModel extends Model
{
    protected $_validate = [
        ['name', 'require', 'name 不能空'],
        ['price', 'require', 'price 不能空'],
        ['member_id', 'require', 'member_id 不能空'],
        ['address_id', 'require', 'address_id 不能空'],

        /*  ['username', '', '角色已经存在', 1, 'unique'],
          ['password', 'require', '需要密码'],
          ['repaword', 'password', '密码不一样', 0, 'confirm'],

          ['email', 'email', 'email is not current'],
          ['verify', 'require', 'verify is require'],
          ['verify', 'checkVerify', 'verify is not current', 0, 'function'],*/
    ];

    protected $_auto = [
        array('create_at', 'time', 1, 'function'),
        array('update_at', 'time', 2, 'function'),
        array('order_member', 'order_member', 1, 'callback'),
        array('name', 'order_member', 1, 'callback'),
    ];

    function order_member()
    {
        return md5(uniqid());
    }

    /*
     * 1.add data1 to order
     * 2. add data2 to order_items
     * */
    function makeOrder($data1, $data2)
    {
        $message = [];
        $order_item = d1('order_item');
        $order_item->startTrans();
        $result1 = '';
        if ($data1 = $this->create($data1)) {
            $result1 = $this->add();


            $data2_1 = [];
            foreach ($data2 as $index => $item) {
                $newitem['good_id'] = $item['id'];
                $newitem['order_id'] = $result1;
                $newitem['amount'] = $item['amount'];
                array_push($data2_1, $newitem);
            }
            $result2 = $order_item->addAll($data2_1);
            if ($result1 && $result2) {
                $order_item->commit();
                $message['success'] = true;
                $message['message'] = $result2 . $result1;

            } else {
                $message['success'] = false;
                $message['message'] = $result2 . $result1;
            }
            return $message;
        } else {
            return $this->getError();
        }


    }

}