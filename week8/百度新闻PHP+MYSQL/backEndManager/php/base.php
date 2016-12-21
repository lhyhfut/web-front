<?php
/**
 * Created by PhpStorm.
 * User: liuhongyu
 * Date: 16/9/22
 * Time: 11:55
 */
//一些共用的函数
//表单验证,需要对form输入的数据进行处理
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
//$sqlPara中也有$tablePara参数
function queryData($sqlPara,$tablePara){
    $con = mysqli_connect('localhost','root','');
    if(!$con){
        die('Could not connect: '.mysqli_connect_error() );
    }
    else{
        mysqli_select_db($con,"baidunews");
        mysqli_query($con,"set names utf8");
        if($sqlPara == "SELECT * FROM `$tablePara`"){
            //避免重复查询
        }
        else{
            $sql = $sqlPara;
            $result = mysqli_query($con,$sql);//等待传入的$sql
        }
        $sql = "SELECT * FROM `$tablePara`";
        $result = mysqli_query($con,$sql);
        $queryData = array();//返回给前端的数据
        if($result->num_rows > 0){
            while($row = $result->fetch_assoc())
            {
                array_push($queryData,array("newsid"=>$row["newsid"],"title"=>$row["title"],"newsContent"=>$row["newsContent"],"newsLink"=>$row["newsLink"],"imgSrc0"=>$row["imgSrc0"],"imgSrc1"=>$row["imgSrc1"],"imgSrc2"=>$row["imgSrc2"],"srcNet"=>$row["srcNet"],"srcTime"=>$row["srcTime"],"srcIcon0"=>$row["srcIcon0"]));
            }
            echo json_encode($queryData);
        }
        else{
            echo "0个结果";
        }
        mysqli_close($con);
    }
}