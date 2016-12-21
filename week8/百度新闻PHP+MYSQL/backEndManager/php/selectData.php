<?php
/**
 * Created by PhpStorm.
 * User: liuhongyu
 * Date: 16/9/20
 * Time: 22:39
 */
//向后端index.js输出数据,适合增加,修改,删除功能
header("Content-type:text/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
include 'base.php';
$table = test_input($_REQUEST['table']);
$sql = "SELECT * FROM `$table`";
queryData($sql,$table);
?>