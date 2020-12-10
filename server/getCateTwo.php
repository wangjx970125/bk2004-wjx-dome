<?php
    $one = $_GET['cat_one'];

    $link = mysqli_connect('127.0.0.1','root','root','bk2004');
    $sql = "SELECT `cat_two_id` FROM `shop` WHERE `cat_one_id`='$one' GROUP BY `cat_two_id`";
    $res = mysqli_query($link,$sql);
    $data = mysqli_fetch_all($res,MYSQLI_ASSOC);

    echo json_encode(array(
        "message" => "获取二级分类成功",
        "code" => 1,
        "list" => $data
    ));

?>