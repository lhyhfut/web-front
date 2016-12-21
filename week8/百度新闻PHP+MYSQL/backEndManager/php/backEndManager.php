<?php
header("Content-type:text/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
include 'base.php';
$table = test_input($_REQUEST['table']);
$title = test_input($_REQUEST['title']);
//内容是不做处理的,前台展示的内容其实是标题
$newsContent = test_input($_REQUEST['newsContent']);
$newsLink = test_input($_REQUEST['newsLink']);
$imgSrc0 = test_input($_REQUEST['imgSrc0']);
$imgSrc1 = test_input($_REQUEST['imgSrc1']);
$imgSrc2 = test_input($_REQUEST['imgSrc2']);
$srcNet = test_input($_REQUEST['srcNet']);
$srcTime = test_input($_REQUEST['srcTime']);
$srcIcon0 = test_input($_REQUEST['srcIcon0']);
$sql = "INSERT INTO `$table`(`title`, `newsContent`, `newsLink`, `imgSrc0`, `imgSrc1`, `imgSrc2`, `srcNet`, `srcTime`, `srcIcon0`) VALUES ('".$title."','".$newsContent."','".$newsLink."','".$imgSrc0."','".$imgSrc1."','".$imgSrc2."','".$srcNet."','".$srcTime."','".$srcIcon0."')";
queryData($sql,$table);
?>