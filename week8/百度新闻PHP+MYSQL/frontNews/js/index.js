var table;
var page = 0; //页数
var pageItem = 3; //一页的新闻数目
// console.log('page: '+ page);
$(document).ready(function() {
    $(function() {
        //初始化加载赋值
        table = "news";
        // console.log(dataImg);
        //初始加载自适应
        if (loadImgOrNotViaMysql(tableToclassName[table])) {
            requestDataViaMysql();
        }
        //scroll自适应
        window.onscroll = function() {
            if (loadImgOrNotViaMysql(tableToclassName[table])) {
                requestDataViaMysql();
            }
        }

        //点击收起,class=show隐藏,生活变更多,收起也隐藏
        $(".less").click(function() {
            $(".show").hide();
            $(".btmMenu").hide();
            $(".life").html("更多");
            $(".life").css({
                'background-image': 'url(./images/nav-down_9d191a2.png)',
                'background-position': 'center right',
                'background-repeat': 'no-repeat',
                'background-size': '10px',
                'position': 'absolute',
                'left': '7px',
                'bottom': '0',
                'top': '0',
                'right': '9px',
                'overflow-y': 'hidden',
                'color': '#fff',
                'text-align': 'center',
                'height': '16px',
                'padding-right': '10px'
            })
        });
        //点击生活,class=show显示,更多变生活
        $(".life").click(function() {
            $(".show").show();
            $(".btmMenu").show();
            $(".life").html("生活");
            $(".life").removeAttr("style");
        });
        //给选中的条目加下划线
        for (var i = 0; i < 23; i++) {
            (function(i) {
                $(".mainMenu>li:eq(" + i + ")").click(function() {
                    $(".mainMenu>li:eq(" + i + ")").addClass("selected");
                    // 除了给点击的条目加下划线,还要保证未点击的条目没有下划线
                    $(".mainMenu>li").each(function(index, element) {
                        if (index == i) {} else {
                            if ($(".mainMenu>li:eq(" + index + ")").hasClass("selected")) {
                                $(".mainMenu>li:eq(" + index + ")").removeClass("selected");
                            }
                        }
                    })
                })
            })(i);
        }
        //由于只写'精选'和'百家',它们的绑定就不写在上面的for循环之中了(如果23个全部写,确实应该写在上面,和上面的逻辑是一样的,互斥)
        $(".mainMenu>li:eq(0)").click(function() {
            $(".table-jingxuan").show();
            $(".table-baijia").hide();
            //设置ajax的table参数
            table = "news";
            //切换选项卡时page清零
            page = 0;
        });
        $(".mainMenu>li:eq(1)").click(function() {
            $(".table-jingxuan").hide();
            $(".table-baijia").show();
            //设置ajax的table参数
            table = "newsBaijia";
            //切换选项卡时page清零
            page = 0;
        });

    })
})

var dataImg = {
    "index": 1,
    "img": [
        [],
        [{ "src": "" }],
        [{ "src": "" }, { "src": "" }, { "src": "" }]
    ],
    "href": [
        [{ "href": "" }],
        [{ "href": "" }],
        [{ "href": "" }]
    ],
    "title": [
        [{ "title": "" }],
        [{ "title": "" }],
        [{ "title": "" }]
    ],
    "newsFrom": [
        [{ "srcNet": "", "srcTime": "", "srcIcon0": "" }],
        [{ "srcNet": "", "srcTime": "", "srcIcon0": "" }],
        [{ "srcNet": "", "srcTime": "", "srcIcon0": "" }]
    ]
};
var tableToclassName = {
    'news': 'table-jingxuan',
    'newsBaijia': 'table-baijia'
};

function loadImgOrNotViaMysql(className) {
    var windowHeight = $(window).outerHeight();
    var scrollTop = $(window).scrollTop();
    var lastNewsItemTop = $("." + className + " .news-item").last().position().top; //" .news-item"中有个空格
    var lastNewsItemHeight = $("." + className + " .news-item").last().height();
    return (lastNewsItemTop + lastNewsItemHeight / 2 <= windowHeight + scrollTop) ? true : false;
}
// 添加第1栏新闻,0张图片
function createNewsItemTpl1(className) {
    var newsItem = $("<div>").addClass("news-item tpl-1").appendTo($("." + className + ""));
    // 追加a标签
    var newsLink = $("<a>").attr({
        "href": dataImg.href[0][0].href,
        "title": dataImg.title[0][0].title
    }).addClass('news-link').appendTo(newsItem);
    // 内容
    var infoContent = $("<div>").addClass("info-content").appendTo(newsLink);
    // 文本
    var textContent = $("<div>").addClass("text-content").appendTo(infoContent);
    $("<h2>").html(dataImg.title[0][0].title).appendTo(textContent);
    // 来源
    var newsFrom = $("<div>").addClass("news-from").appendTo(infoContent);
    $("<span>").html(dataImg.newsFrom[0][0].srcNet).addClass("src-net").appendTo(newsFrom);
    $("<span>").html(dataImg.newsFrom[0][0].srcTime).addClass("src-time").appendTo(newsFrom);
    $("<span>").html(dataImg.newsFrom[2][0].srcIcon0).addClass("src-icon0").appendTo(newsFrom);
}
// 添加第2栏新闻,1张图片
function createNewsItemTpl2(className) {
    var newsItem = $("<div>").addClass('news-item tpl-2').appendTo($("." + className + ""));
    // 追加a标签
    var newsLink = $("<a>").attr({
        "href": dataImg.href[1][0].href,
        "title": dataImg.title[1][0].title
    }).addClass('news-link').appendTo(newsItem);
    // 图片
    var picContent = $("<div>").addClass("pic-content").appendTo(newsLink);
    $("<img>").attr("src", dataImg.img[1][0].src).appendTo(picContent); //网络
    // 内容
    var infoContent = $("<div>").addClass("info-content").appendTo(newsLink);
    // 文本
    var textContent = $("<div>").addClass("text-content").appendTo(infoContent);
    $("<h2>").html(dataImg.title[1][0].title).appendTo(textContent);
    // 来源
    var newsFrom = $("<div>").addClass("news-from").appendTo(infoContent);
    $("<span>").html(dataImg.newsFrom[1][0].srcNet).addClass("src-net").appendTo(newsFrom);
    $("<span>").html(dataImg.newsFrom[1][0].srcTime).addClass("src-time").appendTo(newsFrom);
    $("<span>").html(dataImg.newsFrom[1][0].srcIcon0).addClass("src-icon0").appendTo(newsFrom);
}
// 添加第3栏新闻,2张图片
function createNewsItemTpl3(className) {
    var newsItem = $("<div>").addClass("news-item tpl-3").appendTo($("." + className + ""));
    // 追加a标签
    var newsLink = $("<a>").attr({
        "href": dataImg.href[2][0].href,
        "title": dataImg.title[2][0].title
    }).addClass('news-link').appendTo(newsItem);
    // 文本
    var textContent = $("<div>").addClass("text-content").appendTo(newsLink);
    $("<h2>").html(dataImg.title[2][0].title).appendTo(textContent);
    // 图片
    var picContent = $("<div>").addClass("pic-content").appendTo(newsLink);
    var imgWrap = $("<div>").addClass("img-wrap").appendTo(picContent);
    $("<img>").attr("src", dataImg.img[2][0].src).appendTo(imgWrap); //网络
    var imgWrap1 = $("<div>").addClass("img-wrap").appendTo(picContent);
    $("<img>").attr("src", dataImg.img[2][1].src).appendTo(imgWrap1); //网络
    var imgWrap2 = $("<div>").addClass("img-wrap").appendTo(picContent);
    $("<img>").attr("src", dataImg.img[2][2].src).appendTo(imgWrap2); //网络
    // 来源
    var newsFrom = $("<div>").addClass("news-from").appendTo(newsLink);
    $("<span>").html(dataImg.newsFrom[2][0].srcNet).addClass("src-net").appendTo(newsFrom);
    $("<span>").html(dataImg.newsFrom[2][0].srcTime).addClass("src-time").appendTo(newsFrom);
    $("<span>").html(dataImg.newsFrom[2][0].srcIcon0).addClass("src-icon0").appendTo(newsFrom);
}
/*向后端的selectData.php请求数据,即使用MYSQL的数据,当然也可以在前端的index.php
中模仿后端的selectData.php连接数据库,但既然后端的selectData.php已经写好了,没必要重复
用的都是一个MYSQL*/
function requestDataViaMysql() {
    page++;
    // console.log('page: '+ page);
    $.ajax({
        type: 'post',
        url: '../backEndManager/php/selectDataFront.php',
        data: {
            'table': table,
            'page': page,
            'pageItem': pageItem
        },
        success: function(data) {
            console.log('请求成功');
            // console.log(data);
            // console.log(data[0]);
            data.forEach(function(element, index) { //用each失败
                // console.log(element);
                var imgSrc = [];
                // var newsItemTpl;
                (element['imgSrc0'] == "") ? "" : imgSrc.push(element['imgSrc0']);
                (element['imgSrc1'] == "") ? "" : imgSrc.push(element['imgSrc1']);
                (element['imgSrc2'] == "") ? "" : imgSrc.push(element['imgSrc2']);
                // console.log(imgSrc.length);
                if (imgSrc.length == 0) { //0张图片
                    // dataImg属性赋值
                    //按照上面createNewsItemTpl1()函数中赋值就可以了
                    dataImg.href[0][0].href = element['newsLink'].replace(/amp;/g, '');
                    dataImg.title[0][0].title = element['title'];
                    dataImg.newsFrom[0][0].srcNet = element['srcNet'];
                    dataImg.newsFrom[0][0].srcTime = element['srcTime'];
                    dataImg.newsFrom[2][0].srcIcon0 = element['srcIcon0'];
                    createNewsItemTpl1(tableToclassName[table]);
                } else if (imgSrc.length == 1) //1张图片
                {
                    dataImg.href[1][0].href = element['newsLink'].replace(/amp;/g, '');
                    dataImg.title[1][0].title = element['title'];
                    dataImg.img[1][0].src = imgSrc[0].replace(/amp;/g, '');
                    dataImg.newsFrom[1][0].srcNet = element['srcNet'];
                    dataImg.newsFrom[1][0].srcTime = element['srcTime'];
                    dataImg.newsFrom[1][0].srcIcon0 = element['srcIcon0'];
                    createNewsItemTpl2(tableToclassName[table]);
                } else if (imgSrc.length == 3) { //3张图片
                    dataImg.href[2][0].href = element['newsLink'].replace(/amp;/g, '');
                    dataImg.title[2][0].title = element['title'];
                    dataImg.img[2][0].src = imgSrc[0].replace(/amp;/g, '');
                    dataImg.img[2][1].src = imgSrc[1].replace(/amp;/g, '');
                    dataImg.img[2][2].src = imgSrc[2].replace(/amp;/g, '');
                    dataImg.newsFrom[2][0].srcNet = element['srcNet'];
                    dataImg.newsFrom[2][0].srcTime = element['srcTime'];
                    dataImg.newsFrom[2][0].srcIcon0 = element['srcIcon0'];
                    createNewsItemTpl3(tableToclassName[table]);
                }

            })

        },
        error: function() {
            console.log('请求失败');
        }
    })
}
// 从返回的object中删除name属性
function deleteName(object, name) {
    var newObject = {};
    for (var i in object) {
        if (i !== name) {
            newObject[i] = object[i];
        }
    }
    return newObject;
}
