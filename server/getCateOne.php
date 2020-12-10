<?php
    $link = mysqli_connect('localhost','root','root','bk2004');
    $sql = "SELECT `cat_one_id` FROM `shop` GROUP BY `cat_one_id`";
    $res = mysqli_query($link,$sql);
    $data = mysqli_fetch_all($res,MYSQLI_ASSOC);

    echo json_encode(array(
        "message" => "获取一级分类成功",
        "code" => 1,
        "list" => $data
    ));

?>