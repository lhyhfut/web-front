$(function() {
    /*var username = $.cookie()["username"] || window.localStorage.getItem("username");
    if(username !== 'admin'){
        window.location.href = '../backEndManager/login.html';
    }*/
    var selectedNum = $.cookie()["selectedNum"] || window.localStorage.getItem("selectedNum");
    if (selectedNum) { //selectedNum可能是数字0。浏览器测试结果是0,但是却可以进入
        // console.log("cookie ok!",selectedNum);
        //选项卡选中有一个背景颜色
        $(".optionItem:eq(" + selectedNum + ")>a").css({
            'background': "#EEE"
        });
        //设置正文字段的值
        var optionItemValue = $(".optionItemVal:eq(" + selectedNum + ")").html();
        $(".selectedItem:eq(0)").html(optionItemValue);
        $(".selectedItem:eq(1)").html(optionItemValue);
        $(".selectedItem:eq(2)").html(optionItemValue);
    }

    //页面初始化加载table会清空,这时候需要从MYSQL获取数据填充页面
    queryData();
    //点击响应新闻项目相关字段变成相应的新闻项目
    for (var m = 0; m < 26; m++) {
        (function(m) {
            $(".optionItem:eq(" + m + ")").click(function() {
                //点击的时候需要把记忆的选项卡颜色置位
                $(".optionItem:eq(" + selectedNum + ")>a").css({
                    'background': "#F5F5F5"
                })
                var optionItemValue = $(".optionItemVal:eq(" + m + ")").html();
                $(".selectedItem:eq(0)").html(optionItemValue);
                $(".selectedItem:eq(1)").html(optionItemValue);
                $(".selectedItem:eq(2)").html(optionItemValue);
                //与其记录.optionItem:eq("+m+"),不如直接记录m
                setCookie("selectedNum", m);
                window.localStorage.setItem("selectedNum", m);
                queryData();
            });
        })(m);
    }
    //点击登出按钮跳转到登录界面
    $("#loginOut").click(function() {
        $("#warnPannelLogin").show();
    });
    $("#warnULogin").click(function() {
        $("#warnPannelLogin").hide();
        /*window.location.href = '../backEndManager/login.html';
        setCookie("username", null);
        window.localStorage.setItem("username", '');*/
        $.ajax({
            type:'post',
            url:'/bgManager/logout',
            data:{

            },
            success:function(){
               console.log("登出成功");
                window.location.href= "http://127.0.0.1:3000/bgManager/login";
            },
            error:function(){
                console.log("登出失败");

            }

        })
    });

});
//应该按照做侧边栏项目的选择情况来给table赋值
function selectTable() {
    //不应该使用.optionItemVal
    // switch ($(".optionItemVal:eq("+m+")").html())
    switch ($(".selectedItem:eq(0)").html()) {
        case "精选":
            return "news";
        case "百家":
            return "newsBaijia";
        default:
            break;
    }
}
//全局变量,存储id和newsid的映射
var IdToNewsid = {};

function convertIdToNewsid(index, newsid) {
    IdToNewsid[index] = newsid;
    // console.log(IdToNewsid);
}

//td中的delete按钮(单行删除)
var trLength;//当前页面tr的数目,须在queryData()中计算,此处的值为0,因为tr尚未生成
//console.log(trLength);//undefined

//添加一行数据
//从mysql中获得的是全部数据。要把它分行处理。
function createTableRow(data) {
    var newsRow = $("<tr>").appendTo($("#newsRowBody"));
    //不再使用MYSQL中的newsid作为新闻编号,使用返回data的下标即可
    var newsNum = $("<td>").appendTo(newsRow);
    $("<input>").attr({
        'type': 'checkbox',
        'id': function() {
            return "myCheck" + data.index;
        }
    }).appendTo(newsNum);
    $("<span>").html("&nbsp;&nbsp;" + data.index).appendTo(newsNum);
    $("<td>").html(data.title).appendTo(newsRow);
    $("<td>").html(data.newsContent).appendTo(newsRow);
    $("<td>").html(data.newsLink).appendTo(newsRow);
    $("<td>").html(data.imgSrc0).appendTo(newsRow);
    $("<td>").html(data.imgSrc1).appendTo(newsRow);
    $("<td>").html(data.imgSrc2).appendTo(newsRow);
    $("<td>").html(data.srcNet).appendTo(newsRow);
    $("<td>").html(moment(data.srcTime).format('YYYY-MM-DD')).appendTo(newsRow);
    $("<td>").html(data.srcIcon0).appendTo(newsRow);
    //var newsIcon = $("<td>").html(data.srcIcon0).appendTo(newsRow);
    var newsOperate = $("<td>").appendTo(newsRow);
    //$("<br/>").appendTo(newsOperate);
    $("<a>").attr({
        'class':'tdDelete',
        'id':function(){
            return "tdDelete" + data.index;
        }
        //,'innerHTML':'add'
    }).html("delete").appendTo(newsOperate);
    $("<br/>").appendTo(newsOperate);
    $("<a>").attr({
        'class':'tdEdit',
        'id':function(){
            return "tdEdit" + data.index;
        }
        //,'innerHTML':'edit'
    }).html("edit").appendTo(newsOperate);
}
// 清空table内容,删除全部tr
function deleteTable() {
    //children判断子元素是否存在不正确
    if ($("#newsRowBody>tr").length !== 0) {
        $("#newsRowBody>tr").remove();
    }
}
// 查询数据的ajax
function queryData() {
    var table = selectTable();
    // console.log(table);
    $.ajax({
        type: "post",
        //url:"/select",
        //url:"/bgManager",
        url:"/bgManager/select",
        data: {
            //这个函数只接收数据,而不发送数据
            'table': table
        },
        success: function(data) {
            console.log("queryData",data);
            //显示给后端index.html的js操作应该在这里进行

            //添加新数据之前需要清空table
            deleteTable();

            //为从data返回的数组中的对象添加属性index作为新闻编号使用
            data.forEach(function(element, index) {
                //给data中的每一个对象追加index键
                //新闻编号从1开始
                element.index = index + 1;
                // console.log("queryData",element);
                createTableRow(element);
                //在forEach中写没创建一行就会调用1次,但在forEach之外写就无法使用index了
                convertIdToNewsid(element.index, element.newsid);
            });
            // console.log("queryData",data);
            //trLength的计算也必须在这里,放在外面则为0,因为tr尚未生成
            trLength = $("#newsRowBody>tr").length;
            //console.log(trLength);
            //单行删除更新的click事件需要在这里绑定
            var rowSlectedSingle = calSelectRowSingle();
            //console.log('query',rowSlectedSingle);
        },
        error: function() {
            console.log("查询失败");
            //查询失败的时候需要请空table的页面显示
            deleteTable();
        }
    });
}
//cookie需要添加一些可选属性
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    exp.toUTCString();
    $.cookie(name, escape(value), { expires: exp });
}
