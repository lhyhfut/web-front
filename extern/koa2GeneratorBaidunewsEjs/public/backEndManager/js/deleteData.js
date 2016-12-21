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
    //console.log(calSelectRowSingle());
    //console.log(calSelectRows());
    if(calSelectRowSingle().length!=0){ //说明有单行删除操作
        var rowSlected = calSelectRowSingle()||calSelectRows();
        //var rowSlected = calSelectRowSingle();//写为这样是一样的
    }
    else//没有单行删除操作
    {
        var rowSlected = calSelectRows();
    }
    //console.log('删除时rowSlected',rowSlected);
    //有选中行的时候再发ajax请求
    if (rowSlected.length > 0) {
        $.ajax({
            type: "post",
            //url:'/delete',
            url:"/bgManager/delete",
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
//rowSlectedSingle在click事件中赋值,需设为全局变量
var rowSlectedSingle = [];
function calSelectRowSingle(){
    //var rowSlectedSingle; //要么像rowSlected那样使用calSelectRows()计算return出去,要么使用全局变量或者单例模式
    for(var i=0;i<trLength;i++){
        //delete和edit的单行删除按钮事件可以写在一起。因为值会被覆盖。这里不是把值push到数组中,不会有影响
        //由于delete和update的警告面板不一样,所以不写在一起,单独处理
        (function(i){
            $("#newsRowBody .tdDelete:eq("+i+")").click(function(){
                //console.log(i);
                rowSlectedSingle[0] = IdToNewsid[i+1];
                //console.log(rowSlectedSingle);
                //确认删除面板
                $(".warnPannelDelete").show();
                if ($("#warnDelete").attr("disabled") == "disabled") {
                    $("#warnDelete").removeAttr('disabled');
                }
                if ($("#warnDeleteWait").attr("disabled") == "disabled") {
                    $("#warnDeleteWait").removeAttr('disabled');
                }
                $(".warnPannelDelete .panel-body").html("确认要删除吗?");
            })
        })(i);
        //delete和edit的单行删除按钮事件可以写在一起。因为值会被覆盖。这里不是把值push到数组中,不会有影响
        (function(i){
            $("#newsRowBody .tdEdit:eq("+i+")").click(function(){
                //console.log(i);
                rowSlectedSingle[0] = IdToNewsid[i+1];
                //console.log(rowSlectedSingle);
                //td数组从0开始,但新闻编号从1开始
                var rowIndex = valueToName(IdToNewsid, rowSlectedSingle) - 1;
                $(".warnPannelUpdate").hide();
                $(".dataUpdatePannel").show();
                //从选中行获取数据,填充到编辑的form面板,参考createTableRow
                addFormDataUpdate(rowIndex);
            })
        })(i);
    };
    //console.log(rowSlectedSingle);
    return rowSlectedSingle;
}

