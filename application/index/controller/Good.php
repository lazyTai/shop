<?php

namespace app\index\controller;

use think\Request;
use think\Controller;
use app\index\model\Good as GoodDaO;
class Good extends Controller
{
    public function upload_image(Request $request)
    {
        // 获取表单上传文件
        $files = $request->file('files');
        $item  = [];
        foreach ($files as $file) {
            // 移动到框架应用根目录/public/uploads/ 目录下
            $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
            if ($info) {
                $item[] = 'uploads/'.$info->getSaveName();
            } else {
                // 上传失败获取错误信息
                return json([
                'success'=>false,
                'message'=>$file->getError()
            ]);
            }
        }
        return json([
        'success'=>true,
        'message'=>$item
    ]);
    }
    public function add()
    {
        $params=input('post.');
        if($params['title']==""){return json(['message'=>"title is null",'success'=>false]);};
        if($params['desc']==""){return json(['message'=>"desc is null",'success'=>false]);};
        if($params['a_sheng']==""){return json(['message'=>"a_sheng is null",'success'=>false]);};
        if($params['a_shi']==""){return json(['message'=>"a_shi is null",'success'=>false]);};
        if($params['a_xain']==""){return json(['message'=>"a_xain is null",'success'=>false]);};
        if($params['a_address']==""){return json(['message'=>"a_address is null",'success'=>false]);};
        if($params['price']==""){return json(['message'=>"price is null",'success'=>false]);};
        if($params['image_url']==""){return json(['message'=>"image_url is null",'success'=>false]);};
        unset($params['t']);
        unset($params['a_s_s_x']);
        $good=new GoodDaO;
        $infor=  $good->save($params);
        if($infor){
            json(['message'=>"insert is false",'success'=>false]);
        }
        return json(['message'=>$infor,'success'=>true]);
    }


    public function search(){
        $params =input('post.');
        $results=GoodDaO::search( $params );
        return json(  $results);
    }


}
