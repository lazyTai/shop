<?php

namespace Admin\Controller;

use Think\Controller;

class AddressController extends Controller
{
    public function index()
    {
        $this->display();
    }

    function getFields()
    {
        $model = D('Address');
        $result = $model->getFields1();
        echo json_encode($result);
    }

    function select()
    {
        $current_page = $_POST['current_page'];
        $model = D('Address');
        $message = $model->pageSelect($current_page);
        echo json_encode($message);
    }

    function selectJoin()
    {
        $Address = D('Address');
        echo json_encode($Address->selectJoin());

    }

    function edit()
    {
        $id = I('id');
        $result = D('Address')->selectById($id);
        $this->assign('address', json_encode($result));
        $this->display();
//        redirect(U('Address/update'));
    }

    function update()
    {
        $data['id'] = I('id');
        $data['name'] = I('name');
        $data['province_id'] = I('province_id');
        $data['city_id'] = I('city_id');
        $data['area_id'] = I('area_id');
        $data['detail_address'] = I('detail_address');
        $data['tel'] = I('tel');
        $data['member_id'] = I('member_id');

        echo D('Address')->save($data);
    }

    function addshow()
    {
        $this->display();
    }

    function add()
    {
        $address = D('Address');
        $data['name'] = I('name');
        $data['province_id'] = I('province_id');
        $data['city_id'] = I('city_id');
        $data['area_id'] = I('area_id');
        $data['detail_address'] = I('detail_address');
        $data['tel'] = I('tel');
        $data['member_id'] = I('member_id');
        echo $address->add1($data);
    }

    function delete()
    {
        $id = I('id');
        $address = D('Address');
        echo $address->delete($id);
    }

}