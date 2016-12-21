/**
 * Created by liuhongyu on 16/9/26.
 */
$(function(){
    $("#myLogin").click(function(e) {
        e.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();
        console.log(username);
        //cookie记忆的不是table,而是selectedNum
        var selectedNum = $.cookie()["selectedNum"] || window.localStorage.getItem("selectedNum");
        var table = selectTable(selectedNum);
        /*if (username !== 'admin') {
            // 阻止表单提交
            return false;
        } else {
            window.location.href = '../backEndManager/index.html';
            //暂时只验证username,不验证password,如需要验证密码,仿照用户名流程
        }
        setCookie("username", username);
        window.localStorage.setItem("username", username);*/
        $.ajax({
            type: "post",
            //url: "/bgManager/login",
            url: "/bgManager",
            //url:"/bgManager/select",
            data:{
                //'table':table,  //如果不传入table参数,则/bgManager/select的handler不能处理
                _csrf:$('input[type="hidden"]').val(),
                'username':username   //暂时只处理username
            },
            success: function(data){
                console.log("登录成功");
                window.location.href = "http://127.0.0.1:3000/bgManager";
            },
            error:function(data){
                console.log("登录失败");
            }
        });
        //return false;
    });
});
//cookie需要添加一些可选属性
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    exp.toUTCString();
    $.cookie(name, escape(value), { expires: exp });
}
//cookie记忆的不是table,而是selectedNum
function selectTable(selectedNum) {
    //不应该使用.optionItemVal
    // switch ($(".optionItemVal:eq("+m+")").html())
    switch (selectedNum) {
        case 0:
            return "news";
        case 1:
            return "newsBaijia";
        default:
            break;
    }
}