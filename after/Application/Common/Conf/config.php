<?php
return array(
    //'配置项'=>'配置值'
    'MODULE_ALLOW_LIST' => array('Home', 'Admin','Commom'),
    'MULTI_MODULE' => true,
    'DEFAULT_MODULE' => 'Admin',

    //'配置项'=>'配置值'
    'DB_TYPE' => 'mysqli',// 数据库类型
    'DB_HOST' => '127.0.0.1',// 数据库服务器地址
    'DB_NAME' => 'tp_shop',// 数据库名称
    'DB_USER' => 'root',// 数据库用户名
    'DB_PWD' => 'root',// 数据库密码
    'DB_PREFIX' => 'tp_',// 数据表前缀
    'DB_CHARSET' => 'utf8',// 网站编码
    'DB_PORT' => '3306',// 数据库端口
    'APP_DEBUG' => true,// 开启调试模式

//    'SHOW_PAGE_TRACE' => true,

    'page_page' => 10,
    'URL_HTML_SUFFIX' => '',

    'deliver'=>[
        '1'=>'货到付款',
        '2'=>'线上支付'

    ]
);