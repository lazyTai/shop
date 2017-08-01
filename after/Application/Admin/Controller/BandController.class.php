<?php

namespace Admin\Controller;
class BandController extends BaseController
{

    function selectall()
    {
        echo json1(m('band')->select());
    }
}