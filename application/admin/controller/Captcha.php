<?php
namespace app\admin\controller;

class Captcha extends \think\Controller
{

    // 验证码表单
    public function index()
    {
        return $this->fetch();
    }

}