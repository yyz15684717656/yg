<?php
header("content-type:text/html;charset=utf8");
// 接收数据
$username = $_POST["username"];
$password = $_POST["password"];
$email = $_POST["email"];
// 连接数据库
$con = mysqli_connect('localhost','root','root','test');
mysqli_query($con,"set names utf8");
$sql = "select * from user where username='$username'";
$res = mysqli_query($con,$sql);
$row = mysqli_fetch_assoc($res);
if($row){
    $arr = [
        "msg"=>"用户名已存在",
        "status"=>3
    ];
}else{
    $sql = "insert user(username,password,email) values('$username','$password','$email')";
    $res = mysqli_query($con,$sql);
    if($res){
        $arr = [
            "msg"=>"注册成功",
            "status"=>200
        ];
    }else{
        $arr = [
            "msg"=>"注册失败",
            "status"=>4
        ];
    }
}
echo json_encode($arr);