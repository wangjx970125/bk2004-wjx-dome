<?php

    $username = $_POST['username'];
    $password = $_POST['password'];

    $link = mysqli_connect('127.0.0.1','root','root','bk2004');
    $sql = "SELECT * FROM `users` WHERE `username`='$username' AND `password`='$password'";
    $res = mysqli_query($link,$sql);
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
    mysqli_close($link);

    if(count($data)){
        echo json_encode(array(
            "message"=> "用户登录成功",
            "code"=>1,
            "nickname"=> $data[0]['nickname']
        ));
    }else{
        echo json_encode(array(
            "message" =>"用户名密码错误",
            "code" => 0 
        ));
    }


?>