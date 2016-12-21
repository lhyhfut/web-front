/**
 * Created by liuhongyu on 16/9/21.
 */
//点击添加新闻弹出数据管理面板
$(".add").click(function() {
    $(".dataOperatePannel").show();
    //测试,用于从table获取数据填充表单
    var rowSlected = calSelectRows();
    // console.log(rowSlected.length);
    if (rowSlected.length == 1) {
        //  addFormDataAdd(valueToName(IdToNewsid, rowSlected[0]) - 1);
    }
});
//点击新闻弹出数据管理面板上的关闭面板则面板关闭
$(".dataOperateClose").click(function() {
    $(".dataOperatePannel").hide();
});
//增加数据面板,点击提交按钮的ajax请求
$("#mybtn").click(function(e) {
    //阻止默认事件之后点击提交就不会由index.html跳转到backEndManager.php了
    e.preventDefault(e);
    //增加数据的ajax请求
    var title = $("#title").val();
    title = escapeHtml(title);
    var newsContent = $("#newsContent").val();
    newsContent = escapeHtml(newsContent);
    var newsLink = $("#newsLink").val();
    newsLink = newsLink.replace(/amp;/g, '');
    newsLink = escapeHtml(newsLink);
    // console.log('newsLink' + newsLink);
    var imgSrc0 = $("#imgSrc0").val();
    imgSrc0 = imgSrc0.replace(/amp;/g, '');
    imgSrc0 = escapeHtml(imgSrc0);
    var imgSrc1 = $("#imgSrc1").val();
    imgSrc1 = imgSrc1.replace(/amp;/g, '');
    imgSrc1 = escapeHtml(imgSrc1);
    var imgSrc2 = $("#imgSrc2").val();
    imgSrc2 = imgSrc2.replace(/amp;/g, '');
    imgSrc2 = escapeHtml(imgSrc2);
    var srcNet = $("#srcNet").val();
    srcNet = escapeHtml(srcNet);
    var srcTime = $("#srcTime").val();
    var srcIcon0 = $("#srcIcon0").val();
    srcIcon0 = escapeHtml(srcIcon0);
    var table = selectTable();
    if (title == "" || newsLink == "" || srcNet == "" || srcTime == "" || srcIcon0 == "") {
        //使用update的警告面板
        $(".warnPannelUpdate").show();
        $(".warnPannelUpdate .panel-body").html("新闻标题, 新闻链接, 新闻来源, 新闻时间, 标签 为必填字段!");
        return false; //阻止form表单提交
    }
    //由于新闻格式的限制,只能输入0,1,3张图片
    var imgSrc = [];
    (imgSrc0 == "") ? "" : imgSrc.push(imgSrc0);
    (imgSrc1 == "") ? "" : imgSrc.push(imgSrc1);
    (imgSrc2 == "") ? "" : imgSrc.push(imgSrc2);
    console.log(imgSrc.length);
    if (imgSrc.length == 2) {
        //使用update的警告面板
        $(".warnPannelUpdate").show();
        $(".warnPannelUpdate .panel-body").html("由于新闻格式的限制,只能输入0,1,3张图片!");
        return false; //阻止form表单提交
    }
    // 向backEndManager.php发送数据
    $.ajax({
        type: "post",
        //url:"/add",
        url:"/bgManager/add",
        data: {
            'table': table,
            "title": title,
            "newsContent": newsContent,
            "newsLink": newsLink,
            "imgSrc0": imgSrc0,
            "imgSrc1": imgSrc1,
            "imgSrc2": imgSrc2,
            "srcNet": srcNet,
            "srcTime": srcTime,
            "srcIcon0": srcIcon0,
            _csrf:$('input[type="hidden"]').val()
        },
        success: function(data) {
            //返回数据成功后的操作,主要是动态操作后端index.html的table
            // console.log("添加数据",data);
            //从数据库中查询数据,添加到后端index.js,用backEndManager.php返回的data也是可以的
            //queryData()用的是selectData.php的数据
            queryData();
        },
        error: function() {
            console.log("添加数据失败");
        }
    });
    //提示语,让用户等待
    $("#mybtn").text("添加成功，正在返回……");
    // 防止重复点击
    $("#mybtn").attr({ disabled: 'disabled' });
    setTimeout(function() {
        $("#mybtn").removeAttr('disabled');
        $("#mybtn").text("提交");
        // 清除表单数据
        clearFormData();
        $(".dataOperatePannel").hide();
    }, 1000);

});
// 清空增加数据面板表单数据
function clearFormData() {
    $("#title").val("");
    $("#newsContent").val("");
    $("#newsLink").val("");
    $("#imgSrc0").val("");
    $("#imgSrc1").val("");
    $("#imgSrc2").val("");
    $("#srcNet").val("");
    $("#srcTime").val("");
    $("#srcIcon0").val("");
}
//测试,用于从table选中row获取数据添加到增加数据面板
function addFormDataAdd(index) {
    var rowSelectedTd = $("#newsRowBody tr:eq(" + index + ")").children(); //被选中tr下的td数组
    $("#title").val($(rowSelectedTd[1]).html());
    $("#newsContent").val($(rowSelectedTd[2]).html());
    $("#newsLink").val($(rowSelectedTd[3]).html());
    $("#imgSrc0").val($(rowSelectedTd[4]).html());
    $("#imgSrc1").val($(rowSelectedTd[5]).html());
    $("#imgSrc2").val($(rowSelectedTd[6]).html());
    $("#srcNet").val($(rowSelectedTd[7]).html());
    $("#srcTime").attr('value', $(rowSelectedTd[8]).html());
    $("#srcTime").val($(rowSelectedTd[8]).html());
    $("#srcIcon0").val($(rowSelectedTd[9]).html());
}
//xss过滤
/*
function escapeHtml(source){
    return filterXSS(source, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                       // to filter out its content
    });
}*/
// xss转义
function escapeHtml (html) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function deEscapeHtml (originTxt) {
    return $('<div>').html(originTxt).text();
}