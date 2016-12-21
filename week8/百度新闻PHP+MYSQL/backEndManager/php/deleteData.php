<?php
/**
 * Created by PhpStorm.
 * User: liuhongyu
 * Date: 16/9/22
 * Time: 17:20
 */
header("Content-type:text/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
include 'base.php';
$table = test_input($_REQUEST['table']);
$rowSlected = $_REQUEST['rowSlected'];
$rowSlectedValue = join(',',$rowSlected );
$sql = "DELETE FROM `$table` WHERE newsid in($rowSlectedValue)";
queryData($sql,$table);
?>