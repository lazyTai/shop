<?php

namespace Home\Model;

use Think\Model;

class MemberModel extends Model
{
    protected $_validate = [
        ['username', 'require', '不能空'],
        ['username', '', '角色已经存在', 1, 'unique'],
        ['password', 'require', '需要密码'],
        ['repaword', 'password', '密码不一样', 0, 'confirm'],

        ['email', 'email', 'email is not current'],
        ['verify', 'require', 'verify is require'],
        ['verify', 'checkVerify', 'verify is not current', 0, 'function'],

    ];

    function checkVerify($value)
    {
        $verify = new \Think\Verify();
        return $verify->check($value);
    }


}