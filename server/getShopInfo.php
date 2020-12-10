<?php

$id = $_GET['shop_id'];
$link = mysqli_connect('localhost', 'root', 'root', 'bk2004');
$res = mysqli_query($link, "SELECT * FROM `shop` WHERE `shop_id`='$id'");

$data = mysqli_fetch_all($res, MYSQLI_ASSOC);


echo json_encode(array(
    "message" => "获取商品信息成功",
    "code" =>1,
    "info" => $data[0]
));

?>