<?php

namespace Admin\Controller;

class GalleriesController extends BaseController
{
    public function index()
    {
        $this->display();
    }

    function selectall()
    {
        $where['goods_id'] = params('id');
        $results = m1('galleries')->where($where)->select();
        echo json_string($results);
    }

    function upload()
    {
        $goods_id = params('id');

        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize = 3145728;// 设置附件上传大小
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg', 'webp');// 设置附件上传类型
        $upload->rootPath = './Public'; // 设置附件上传根目录
        $upload->savePath = '/uploads/'; // 设置附件上传（子）目录
        // 上传文件
        $info = $upload->upload();
        if (!$info) {// 上传错误提示错误信息
            $this->error($upload->getError());
        } else {// 上传成功
            $message = [];
            foreach ($info as $file) {
                array_push($message, [
                    'name' => $file['savename'],
                    'path' => $file['savepath'] . $file['savename']
                ]);
            }

            /*database*/
            $cond['goods_id'] = $goods_id;
            $cond['path'] = '/Public' . $message[0]['path'];
            $g = d1('galleries');
            $g->create();
            $g->add($cond);
            echo json_string($message);
        }
    }

    function deletePicture()
    {
        $where['goods_id'] = params('good_id');
        $g = m1('galleries');
        $g->where($where)->delete();


        $url = params('url');
        $a['message'] = unlink('.' . $url);


        echo json_string($a);


    }
}