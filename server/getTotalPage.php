<?php

    $one = $_GET['cat_one'];
    $two = $_GET['cat_two'];
    $pagesize = $_GET['pagesize'];

    $sql = "SELECT * FROM `shop`";
    if($one != 'all') $sql .= " WHERE `cat_one_id`='$one'";
    if($two != 'all') $sql .= " AND `cat_two_id`='$two'";
    
    $link = mysqli_connect('127.0.0.1','root','root','bk2004');
    $res = mysqli_query($link,$sql);
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);

    $total = ceil(count($data) / $pagesize);
    echo json_encode(array(
        "message" => "获取成功",
        "code" => 1,
        "total" => $total,
        "sql" => $sql
    ));
    
?>