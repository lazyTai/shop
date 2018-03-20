<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:70:"C:\phpstudy\WWW\shop\public/../application/admin\view\index\index.html";i:1521524071;}*/ ?>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="/shop/public/static/common/tai.png" type="image/x-icon" />
    <title>shop</title>
</head>

<body>
    <script>
        $user=<?php echo $user; ?>
    </script>
    <div id="root">
        <router-view>
            <div>
                shop-admin
            </div>
        </router-view>
    </div>
    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous">
    <link rel="stylesheet" href="/shop/public/static/css/reset.css">
    <link rel="stylesheet" href="/shop/public/static/css/root.css">
    <script src="/shop/public/static/js/vue.js"></script>
    <script src="/shop/public/static/js/ajax.js"></script>
    <script src="/shop/public/static/js/commons.bundle.js"></script>
    <script src="/shop/public/static/js/admin_index/admin_index.js"></script>
    <script src="//at.alicdn.com/t/font_391938_h228rnh1pmohia4i.js"></script>
    <style>
        .icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }
    </style>
</body>

</html>