/**
 * Created by liuhongyu on 16/9/22.
 */
//删除数据  deleteData.php
$(".delete").click(function() {
    //确认删除面板
    $(".warnPannelDelete").show();
    if ($("#warnDelete").attr("disabled") == "disabled") {
        $("#warnDelete").removeAttr('disabled');
    }
    if ($("#warnDeleteWait").attr("disabled") == "disabled") {
        $("#warnDeleteWait").removeAttr('disabled');
    }
    var rowSlected = calSelectRows();
    if (rowSlected.length == 0) { //一行都没有选中
        $(".warnPannelDelete .panel-body").html("当前没有选中行,请选择一行!");
    } else {
        $(".warnPannelDelete .panel-body").html("确认要删除吗?");
    }
});
//等等
$("#warnDeleteWait").click(function() {
    $(".warnPannelDelete").hide();
});
//确认删除
$("#warnDelete").click(function() {
    var table = selectTable();
    var rowSlected = calSelectRows();
    //有选中行的时候再发ajax请求
    if (rowSlected.length > 0) {
        $.ajax({
            type: "post",
            url: "./php/deleteData.php",
            data: {
                'table': table,
                'rowSlected': rowSlected,
            },
            success: function(data) {
                // console.log("删除成功", data);
                //从数据库中查询数据,添加到后端index.js
                queryData();
            },
            error: function() {
                console.log("删除失败");

            }
        });
        $(".warnPannelDelete .panel-body").html("成功删除!");
    } else {
        $(".warnPannelDelete .panel-body").html("当前没有选中行,请选择一行!");
    }
    $("#warnDelete").attr({ disabled: 'disabled' });
    $("#warnDeleteWait").attr({ disabled: 'disabled' });
    setTimeout(function() {
        $(".warnPannelDelete").hide();
    }, 1000);
});

function calSelectRows() {
    var rowSlected = [];
    ($("#newsRowBody input").attr('type', 'checkbox')).each(function(index, element) {
        //选中的checkbox
        if ($("#newsRowBody input:eq(" + index + ")").is(':checked')) {
            index += 1;
            rowSlected.push(IdToNewsid[index]);
        }
    });
    return rowSlected;
}
