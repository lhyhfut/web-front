<?php
/**
 * Created by PhpStorm.
 * User: liuhongyu
 * Date: 16/9/27
 * Time: 17:15
 */
//单独负责向前端返回数据
header("Content-type:text/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
include 'base.php';
$table = test_input($_REQUEST['table']);
$page = test_input($_REQUEST['page']);
$pageItem = test_input($_REQUEST['pageItem']);
$page = ($page-1)*$pageItem;
$con = mysqli_connect('localhost','root','');
if(!$con){
    die('Could not connect: '.mysqli_connect_error() );
}
else{
    mysqli_select_db($con,"baidunews");
    mysqli_query($con,"set names utf8");
    $sql = "SELECT * FROM `$table` order by `newsid` LIMIT $page,$pageItem";//成功   limt改为LIMIT就可以了
    $result = mysqli_query($con,$sql);
    $queryData = array();//返回给前端的数据
    if ($result && mysqli_num_rows($result)) {
         while ($row = mysqli_fetch_assoc($result)) {
            array_push($queryData,array("newsid"=>$row["newsid"],"title"=>$row["title"],"newsContent"=>$row["newsContent"],"newsLink"=>$row["newsLink"],"imgSrc0"=>$row["imgSrc0"],"imgSrc1"=>$row["imgSrc1"],"imgSrc2"=>$row["imgSrc2"],"srcNet"=>$row["srcNet"],"srcTime"=>$row["srcTime"],"srcIcon0"=>$row["srcIcon0"]));
        }
        echo json_encode($queryData);
    }
    else{
        echo "0个结果";
    }
    mysqli_close($con);
}
?>