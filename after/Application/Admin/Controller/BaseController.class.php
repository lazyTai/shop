<?php

namespace Admin\Controller;

use Think\Controller;

class BaseController extends Controller
{
    function me()
    {
        return $this;
    }

    function goto1($key = null, $params = null)
    {
        $this->assign($key, $params);
        $this->display();
    }
}
