/**
 * Created by liuhongyu on 16/9/26.
 */
$(function(){
    $("#myLogin").click(function(e) {
        e.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();

        if (username !== 'admin') {
            // 阻止表单提交
            return false;
        } else {
            window.location.href = '../backEndManager/index.html';
            //暂时只验证username,不验证password,如需要验证密码,仿照用户名流程
        }
        setCookie("username", username);
        window.localStorage.setItem("username", username);
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

