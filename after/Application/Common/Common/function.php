<?php
/**
 * Created by PhpStorm.
 * User: lmt
 * Date: 17-7-29
 * Time: 下午5:52
 */
function getpage($m, $where)
{
    $m1 = clone $m;//浅复制一个模型
    $count = $m->where($where)->count();//连惯操作后会对join等操作进行重置
    $m = $m1;//为保持在为定的连惯操作，浅复制一个模型
    $p = new Think\Page($count, C('page_page'));
    $p->lastSuffix = false;
    $p->setConfig('header', '<li class="rows">共<b>%TOTAL_ROW%</b>条记录&nbsp;&nbsp;每页<b>%LIST_ROW%</b>条&nbsp;&nbsp;第<b>%NOW_PAGE%</b>页/共<b>%TOTAL_PAGE%</b>页</li>');
    $p->setConfig('prev', '上一页');
    $p->setConfig('next', '下一页');
    $p->setConfig('last', '末页');
    $p->setConfig('first', '首页');
    $p->setConfig('theme', '%FIRST% %UP_PAGE% %LINK_PAGE% %DOWN_PAGE% %END% %HEADER%');

    $p->parameter = I('get.');

    $m->limit($p->firstRow, $p->listRows);

    return $p;
}

function json1($array = [])
{
    return json_encode($array);
}

function json_string($array = [])
{
    return json_encode($array);
}

function json_parse($str)
{
    return json_decode(($str));
}

function m1($classstr = null)
{
    return M(ucfirst(convertUnderline($classstr)));
}

function d1($classstr)
{
    return D(ucfirst(convertUnderline($classstr)));
}

/*
 * 下划线转驼峰
 */
function convertUnderline($str)
{
    $str = preg_replace_callback('/([-_]+([a-z]{1}))/i', function ($matches) {
        return strtoupper($matches[2]);
    }, $str);
    return $str;
}

function params($key)
{
    $all = [];
    $get1 = I('get.');
    $post1 = I('post.');
    if (empty($get1)) {
        $all = $post1;
    } else {
        $all = $get1;
    }
    $result = $all[$key];
    return $result;
}

function login()
{
    return session('user_info');

}

function setlogin($arr)
{
    session('user_info', $arr);
}
