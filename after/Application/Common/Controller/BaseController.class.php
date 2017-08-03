<?php

namespace Common\Controller;

use Think\Controller;

class BaseController extends Controller
{


    public function _initialize()
    {
//        $this->checkLogin();

    }

    function message($success, $result)
    {
        $message['success'] = $success;
        $message['message'] = $result;
        return $message;
    }

    function checkLogin()
    {

        if (
            strpos(__ACTION__, 'login') ||
            strpos(__ACTION__, 'register') ||
            strpos(__ACTION__, 'verfity') ||
            strpos(__ACTION__, 'Goods')

        ) {

        } else {
            $message = [];
            $userinfor = login();
            if (!$userinfor) {
                $message['success'] = false;
                $message['message'] = '请登录先';
                echo json_string($message);
            }
        }


    }

    function me()
    {
        return $this;
    }

    function goto1($key = '', $params = [], $url = '')
    {
        $this->assign($key, $params);
        $this->display($url);
    }
}