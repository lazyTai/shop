<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:70:"C:\phpStudy\WWW\shop\public/../application/index\view\index\index.html";i:1521624943;}*/ ?>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="/shop/public/static/common/tai.png" type="image/x-icon" />
    <title>二手交易</title>
</head>

<body>
    <script>
        $user = <?php echo $user; ?> || {};
    </script>
    <div id="root">
        <router-view>
            <div>
                shop
            </div>
        </router-view>
    </div>
    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="/shop/public/static/css/reset.css">
    <link rel="stylesheet" href="/shop/public/static/css/root.css">
    <script src="/shop/public/static/js/vue.js"></script>
    <script src="/shop/public/static/js/ajax.js"></script>
    <script src="/shop/public/static/js/ajaxform.js"></script>
    <script src="/shop/public/static/js/commons.bundle.js"></script>
    <script src="/shop/public/static/js/index/index.js"></script>
    <script src="//at.alicdn.com/t/font_391938_h228rnh1pmohia4i.js"></script>

    <!-- <script src="/shop/public/static/vue-yui/ydui.px.js"></script> -->
    <link rel="stylesheet" href="/shop/public/static/vue-yui/ydui.px.css">
    <style>
        /* .icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        } */
    </style>
</body>

</html>