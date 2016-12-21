<?php
/**
 * Created by PhpStorm.
 * User: liuhongyu
 * Date: 16/9/22
 * Time: 17:21
 */
header("Content-type:text/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
include 'base.php';
$table = test_input($_REQUEST['table']);
$newsid = test_input($_REQUEST['newsid']);
$title = test_input($_REQUEST['title']);
$newsContent = test_input($_REQUEST['newsContent']);
$newsLink = test_input($_REQUEST['newsLink']);
$imgSrc0 = test_input($_REQUEST['imgSrc0']);
$imgSrc1 = test_input($_REQUEST['imgSrc1']);
$imgSrc2 = test_input($_REQUEST['imgSrc2']);
$srcNet = test_input($_REQUEST['srcNet']);
$srcTime = test_input($_REQUEST['srcTime']);
$srcIcon0 = test_input($_REQUEST['srcIcon0']);
$sql = "UPDATE `$table` SET `title`='".$title."',`newsContent`='".$newsContent."',`newsLink`='".$newsLink."',`imgSrc0`='".$imgSrc0."',`imgSrc1`='".$imgSrc1."',`imgSrc2`='".$imgSrc2."',`srcNet`='".$srcNet."',`srcTime`='".$srcTime."',`srcIcon0`='".$srcIcon0."' WHERE newsid=$newsid";
queryData($sql,$table);
?>