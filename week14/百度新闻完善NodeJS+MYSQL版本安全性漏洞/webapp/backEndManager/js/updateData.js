/**
 * Created by liuhongyu on 16/9/22.
 */
//edit按钮
$(".edit").click(function() {
    //统计选中的行
    var rowSlected = calSelectRows();
    if (rowSlected.length == 0) { //一行都没有选中
        $(".warnPannelUpdate").show();
        $(".dataUpdatePannel").hide();
        $(".warnPannelUpdate .panel-body").html("当前没有选中行,请选择一行!");
    } //选中一行
    else if (rowSlected.length == 1) {
        //td数组从0开始,但新闻编号从1开始
        var rowIndex = valueToName(IdToNewsid, rowSlected[0]) - 1; //就是上面each()中匹配到的index,但那是局部变量,或者还可以在外部定义一个变量,在each()中赋值
        $(".warnPannelUpdate").hide();
        $(".dataUpdatePannel").show();
        //从选中行获取数据,填充到编辑的form面板,参考createTableRow
        addFormDataUpdate(rowIndex);
        // console.log('正在从前端table获取数据');
    } //选中多行
    else {
        $(".warnPannelUpdate").show();
        $(".dataUpdatePannel").hide();
    }
});
//已经修改了,点击编辑面板提交按钮
$("#mybtnUpdate").click(function(e) {
    //阻止默认事件之后点击提交就不会由index.html跳转到updateData.php了
    e.preventDefault(e);

    var titleUpdate = $("#titleUpdate").val();
    titleUpdate = escapeHtml(titleUpdate);
    var newsContentUpdate = $("#newsContentUpdate").val();
    newsContentUpdate = escapeHtml(newsContentUpdate);
    var newsLinkUpdate = $("#newsLinkUpdate").val();
    newsLinkUpdate = newsLinkUpdate.replace(/amp;/g, '');
    newsLinkUpdate = escapeHtml(newsLinkUpdate);
    var imgSrc0Update = $("#imgSrc0Update").val();
    imgSrc0Update = imgSrc0Update.replace(/amp;/g, '');
    imgSrc0Update = escapeHtml(imgSrc0Update);
    var imgSrc1Update = $("#imgSrc1Update").val();
    imgSrc1Update = imgSrc1Update.replace(/amp;/g, '');
    imgSrc1Update = escapeHtml(imgSrc1Update);
    var imgSrc2Update = $("#imgSrc2Update").val();
    imgSrc2Update = imgSrc2Update.replace(/amp;/g, '');
    imgSrc2Update = escapeHtml(imgSrc2Update);
    var srcNetUpdate = $("#srcNetUpdate").val();
    srcNetUpdate = escapeHtml(srcNetUpdate);
    var srcTimeUpdate = $("#srcTimeUpdate").val();
    var srcIcon0Update = $("#srcIcon0Update").val();
    srcIcon0Update = escapeHtml(srcIcon0Update);
    //表单校验
    if (titleUpdate == "" || newsLinkUpdate == "" || srcNetUpdate == "" || srcTimeUpdate == "" || srcIcon0Update == "") {
        //使用update的警告面板
        $(".warnPannelUpdate").show();
        $(".warnPannelUpdate .panel-body").html("新闻标题, 新闻链接, 新闻来源, 新闻时间,标签 为必填字段!");
        return false; //阻止form表单提交
    }
    //由于新闻格式的限制,只能输入0,1,3张图片
    var imgSrcUpdate = [];
    (imgSrc0Update == "") ? "" : imgSrcUpdate.push(imgSrc0Update);
    (imgSrc1Update == "") ? "" : imgSrcUpdate.push(imgSrc1Update);
    (imgSrc2Update == "") ? "" : imgSrcUpdate.push(imgSrc2Update);
    // console.log(imgSrcUpdate.length);
    if (imgSrcUpdate.length == 2) {
        //使用update的警告面板
        $(".warnPannelUpdate").show();
        $(".warnPannelUpdate .panel-body").html("由于新闻格式的限制,只能输入0,1,3张图片!");
        return false; //阻止form表单提交
    }
    //统计选中的行
    //console.log('calSelectRowSingle',calSelectRowSingle());
    //console.log('calSelectRows',calSelectRows());
    if(calSelectRowSingle().length!=0){
        var rowSlected = calSelectRowSingle()||calSelectRows();
        //var rowSlected = calSelectRowSingle(); //写为这样是一样的
    }
    else{
        var rowSlected = calSelectRows();
    }
     //console.log(valueToName(IdToNewsid, rowSlected[0]) + '对应' + rowSlected[0]); //被选中的row的index及其对应的newsid
    //td数组从0开始,但新闻编号从1开始
    var rowIndex = valueToName(IdToNewsid, rowSlected[0]) - 1; //就是上面each()中匹配到的index,但那是局部变量,或者还可以在外部定义一个变量,在each()中赋值
    //table选中row数值更新
    console.log('提交时候:', rowIndex);
    confirmFormDataUpdate(rowIndex);
    //向ajax中发请求,更新MYSQL中数据,注意由于上面已经修改了table中选中row的值,这时就不必再从ajax中获取值,然后刷新页面了
    var table = selectTable();
    $.ajax({
        type: "post",
        url: "/update",
        data: {
            "table": table,
            // 选中的只有1行
            "newsid": rowSlected[0],
            "title": titleUpdate,
            "newsContent": newsContentUpdate,
            "newsLink": newsLinkUpdate,
            "imgSrc0": imgSrc0Update,
            "imgSrc1": imgSrc1Update,
            "imgSrc2": imgSrc2Update,
            "srcNet": srcNetUpdate,
            "srcTime": srcTimeUpdate,
            "srcIcon0": srcIcon0Update
        },
        success: function(data) {
            console.log("更新成功");
            // console.log(data);
            //前面已经从form面板获取数据更新过选中行了,不需要再使用ajax返回的数据来更新table页面了
            queryData();
        },
        error: function() {
            console.log("更新失败");
        }
    });
    //form面板上的数据使用完之后,需要有一些提示语,并且清空form的input供下一次使用,且隐藏编辑面板
    $("#mybtnUpdate").text("修改成功，正在返回……");
    // 防止重复点击
    $("#mybtnUpdate").attr({ disabled: 'disabled' });
    setTimeout(function() {
        $("#mybtnUpdate").removeAttr('disabled');
        $("#mybtnUpdate").text("提交");
        //清空当前编辑面板,放在最后面,不然table选中row数值更新的时候没有值了
        clearFormDataUpdate();
        $(".dataUpdatePannel").hide();
    }, 1000);
});
//点击更新数据面板上的关闭按钮则面板关闭
$(".dataUpdateClose").click(function() {
    $(".dataUpdatePannel").hide();
    //清空数据面板
    clearFormDataUpdate();
});
//点击确定之后警告面板隐藏
$("#warnUpdate").click(function() {
    $(".warnPannelUpdate").hide();
});
// 清空更新数据面板表单数据
function clearFormDataUpdate() {
    $("#titleUpdate").val("");
    $("#newsContentUpdate").val("");
    $("#newsLinkUpdate").val("");
    $("#imgSrc0Update").val("");
    $("#imgSrc1Update").val("");
    $("#imgSrc2Update").val("");
    $("#srcNetUpdate").val("");
    $("#srcTimeUpdate").val("");
    $("#srcIcon0Update").val("");
}
//从前端选中的row获取数据,填充更新面板数据,form表单上不需要新闻编号
function addFormDataUpdate(index) {
    var rowSelectedTd = $("#newsRowBody tr:eq(" + index + ")").children(); //被选中tr下的td数组
    $("#titleUpdate").val(deEscapeHtml($(rowSelectedTd[1]).html()));
    $("#newsContentUpdate").val(deEscapeHtml($(rowSelectedTd[2]).html()));
    $("#newsLinkUpdate").val(deEscapeHtml($(rowSelectedTd[3]).html()));
    $("#imgSrc0Update").val(deEscapeHtml($(rowSelectedTd[4]).html()));
    $("#imgSrc1Update").val(deEscapeHtml($(rowSelectedTd[5]).html()));
    $("#imgSrc2Update").val(deEscapeHtml($(rowSelectedTd[6]).html()));
    $("#srcNetUpdate").val(deEscapeHtml($(rowSelectedTd[7]).html()));
    $("#srcTimeUpdate").attr('value', $(rowSelectedTd[8]).html());
    $("#srcTimeUpdate").val($(rowSelectedTd[8]).html());
    $("#srcIcon0Update").val(deEscapeHtml($(rowSelectedTd[9]).html()));
}
//更新编辑面板上的值,点击提交之后,更新table页面上选中行的值,向ajax发请求,更新MYSQL中的值,并清空编辑面板
//反向从input获取值,赋值给table上的td
function confirmFormDataUpdate(index) {
    var rowSelectedTd = $("#newsRowBody tr:eq(" + index + ")").children(); //被选中tr下的td数组
    // console.log(rowSelectedTd);
    //编号不需要更新,编辑面板上也没有编号的值
    $(rowSelectedTd[1]).html(escapeHtml($("#titleUpdate").val()));
    $(rowSelectedTd[2]).html(escapeHtml($("#newsContentUpdate").val()));
    $(rowSelectedTd[3]).html(escapeHtml($("#newsLinkUpdate").val()));
    $(rowSelectedTd[4]).html(escapeHtml($("#imgSrc0Update").val()));
    $(rowSelectedTd[5]).html(escapeHtml($("#imgSrc1Update").val()));
    $(rowSelectedTd[6]).html(escapeHtml($("#imgSrc2Update").val()));
    $(rowSelectedTd[7]).html(escapeHtml($("#srcNetUpdate").val()));
    $(rowSelectedTd[8]).html(escapeHtml($("#srcTimeUpdate").val()));
    $(rowSelectedTd[9]).html(escapeHtml($("#srcIcon0Update").val()));
}
//通过键值求键名
function valueToName(object, value) {
    for (var i in object) {
        if (object[i] == value)
            return i;
    }
}
// js 正则匹配,去掉html标签
function delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, ""); //去掉所有的html标记
}

function getDate() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    return today;
}
