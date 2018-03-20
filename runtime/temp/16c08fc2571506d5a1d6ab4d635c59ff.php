<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:72:"D:\phpStudy\WWW\huoshu\public/../application/index\view\login\index.html";i:1521472457;}*/ ?>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>活书</title>
</head>

<body>
    <script>
      $user=<?php echo $user; ?>;
    </script>
    <div id="root">
        <div>
            活书
        </div>
    </div>
    <img src="<?php echo captcha_src(); ?>" alt="captcha"   id="yzm_image"  style="display:none"/> 
    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous">
    <link rel="stylesheet" href="/huoshu/public/static/css/reset.css">
    <link rel="stylesheet" href="/huoshu/public/static/css/root.css">
    <link rel="stylesheet" href="/huoshu/public/static/layer/theme/default/layer.css">
    <script src="/huoshu/public/static/layer/layer.js"></script>
    <script src="/huoshu/public/static/js/vue.js"></script>
    <script src="/huoshu/public/static/js/ajax.js"></script>
    <script src="/huoshu/public/static/js/commons.bundle.js"></script>
    <script src="/huoshu/public/static/js/login/login.js"></script>
</body>

</html>