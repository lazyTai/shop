<?php

namespace Home\Controller;

use  Common\Controller\BaseController;

class AddressController extends BaseController
{
    public function index()
    {
        echo 'home-AddressController';
    }

    function select_all()
    {
        $where['member_id'] = login()['id'];
        $results = m1('address')->where($where)->select();
        echo json_string(
            $this->message(true, ($results))
        );
    }

    function add()
    {
        $where['detail_address'] = params('detail_address');
        $where['tel'] = params('tel');
        $where['member_id'] = login()['id'];
        $address = d1('address');
        $address->create();
        echo $address->add($where);

    }

    function select_one()
    {
        $id = params('id');
        echo json_string(
            m1('address')->getById($id)
        );
    }

    function update()
    {
        $where['member_id'] = login()['id'];
        $where['id'] = params('id');
        $where['detail_address'] = params('detail_address');
        $where['tel'] = params('tel');
        $address = d1('address');
        $address->create();
        echo $address->save($where);
    }

    function delete1()
    {
        $id = params('id');
        $address = d1('address');
        $address->create();
        echo $address->delete($id);
    }
}