/**
 * Created by liuhongyu on 16/9/26.
 */
$("#myLogin").click(function(e) {
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    if (username !== 'admin') {
        // 阻止表单提交
        return false;
    } else {
        window.location.href = '../backEndManager/index.html';
    }
});
