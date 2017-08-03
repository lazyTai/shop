<?php

namespace Home\Controller;

use  Common\Controller\BaseController;

class MemberController extends BaseController
{
    public function index()
    {
        echo 'home-RegisterController';
    }

    function register()
    {
        $member = d1('member');
        $data['username'] = params('username');
        $data['password'] = params('password');
        $data['repaword'] = params('repaword');
        $data['email'] = params('email');
        $data['verify'] = params('verify');
        $message = [];
        if ($member->create($data)) {
            $message['success'] = true;
            $message['message'] = $member->add();
        } else {
            $message['success'] = false;
            $message['message'] = $member->getError();
        }
        echo json_string($message);
    }

    function verfity()
    {
        $Verify = new \Think\Verify();
        $Verify->fontSize = 18;
        $Verify->length = 4;
        $Verify->useNoise = false;
        $Verify->codeSet = '0123456789';
        $Verify->imageW = 130;
        $Verify->imageH = 50;
        //$Verify->expire = 600;
        $Verify->entry();
    }

    function getverfity()
    {
        echo $this->verfity();
    }


    function login()
    {
        $data['username'] =
            params('username');
        $data['password'] =
            params('password');
        $result = m1('member')->
        where($data)->find();

        $message = [];
        if (!$result) {
            $message['success'] = false;
            $message['message'] = $result;
        } else {
            $message['success'] = true;
            $message['message'] = $result;
            setlogin($result);
        }
        echo json_string($message);

    }

    function loginout()
    {
        loginout();
        echo 'success';
    }
}