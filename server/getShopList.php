<?php

    $one = $_GET['cat_one'];
    $two = $_GET['cat_two'];
    $pagesize = $_GET['pagesize'];
    $method = $_GET['sort_method'];
    $type = $_GET['sort_type'];
    $current = $_GET['current'];
    $pagesize = $_GET['pagesize'];

    //组装 sql 语句
    $sql = "SELECT * FROM `shop`";
    if($one != 'all') $sql .= " WHERE `cat_one_id`='$one'";
    if($two != 'all') $sql .= " AND `cat_two_id`='$two'";

    //确定排序方式
    if($method == '综合') $sql .= " ORDER BY `shop_id` $type";
    if($method == '价格') $sql .= " ORDER BY `shop_price` $type";

    $start = ($current - 1) * $pagesize;
    $sql .= " LIMIT $start, $pagesize";
    $link = mysqli_connect('localhost','root','root','bk2004');
    $res = mysqli_query($link,$sql);
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);

    //结果返回前端
    echo json_encode(array(
        "message" => "获取商品列表成功",
        "current" => $current,
        "code" => 1,
        "list" => $data,
        "sql" => $sql
    ));
?>