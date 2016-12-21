var dataImg = {
    "data": [{ "src": "1.jpg" }, { "src": "2.jpg" }, { "src": "3.jpg" }, { "src": "4.jpg" }, { "src": "5.jpg" },
        { "src": "6.jpg" }, { "src": "7.jpg" }, { "src": "8.jpg" }, { "src": "9.jpg" }, { "src": "10.jpg" }
    ]
};

$(document).ready(function() {
    $(function() {
        //初始加载自适应
        //注:初始的时候可能不满足loadImgOrNot()=true的条件,这样初始就不能正确排版了
        console.log(2);
        imgLocation();
        createImg();
        waterfall();
        //scroll自适应
        window.onscroll = function() {
            if (loadImgOrNot()) {
                createImg();
                imgLocation();
                waterfall()
            }
        }
        //resize自适应
        $(window).on("resize", waterfall);
    });
});

//判断是否加载图片，返回true-false
function loadImgOrNot() {
    var windowHeight = $(window).innerHeight();
    var scrollTop = $(window).scrollTop();
    var lastImgBoxTop = $(".imgBox").last().position().top;
    var lastImgHeight = $(".imgBox").last().height();
    return (lastImgBoxTop < scrollTop + windowHeight) ? true : false;
}
// 批量添加图片
function createImg() {
    $.each(dataImg.data, function(index, value) {
        var imgBox = $("<div>").addClass("imgBox").appendTo($("#container"));
        var img = $("<div>").addClass("img").appendTo(imgBox);
        $("<img>").attr("src", "./img/" + $(value).attr("src")).appendTo(img);
    });
}

//确定图片加载的位置
function imgLocation() {
    var box = $(".imgBox");
    //console.log(box);
    //确定盒子宽度,由于图片是等宽的,获取一排图片第一张宽度即可
    var boxWidth = box.eq(0).width();
    //一排等放置图片的个数
    var num = Math.floor($(window).width() / boxWidth);
    //数组用来存储一排图片的所有高度,然后找到height最小的那个,确定下一排图片的摆放位置
    var boxArr = [];
    //JQ使用each方法,JS使用for循环比较麻烦  (位置,获取到的元素对象)
    box.each(function(index, value) {
        //console.log(index+"--"+value);
        //获取每一个盒子的高度,index为每一个盒子的索引
        var boxHeight = box.eq(index).height();
        //第一排图片不用理会,插入图片从第二排开始
        if (index < num) {
            boxArr[index] = boxHeight;
            //打印第一排盒子高度
            //console.log(boxHeight);
        } else {
            //从第2排开始,插入上一排最小height的位置
            var minboxHeight = Math.min.apply(null, boxArr);
            //console.log(minboxHeight);
            //获取最小height图片的位置
            var minboxIdex = $.inArray(minboxHeight, boxArr);
            //console.log(minboxIdex);
            //元素对象
            //console.log(value);
            //摆放位置
            $(value).css({
                    "position": "absolute",
                    "top": minboxHeight,
                    "left": box.eq(minboxIdex).position().left
                })
                //插入后重新记录高度,第1排height最小的那个+第2排插入的
            boxArr[minboxIdex] += box.eq(index).height();
        }

    })
}

//自适应
function waterfall() {
    var $boxs = $(".imgBox");
    //求出每个盒子的宽度（包括内边距）
    var w = $boxs.eq(0).outerWidth();
    //求出当前窗口所能承载的瀑布流列数
    var cols = Math.floor($(window).width() / w);
    //设置容器的宽度
    $("#container").width(w * cols).css("margin", "0px auto");

    var hArr = []; //保存每一列的高度
    $boxs.each(function(index, value) {
        var h = $boxs.eq(index).outerHeight();

        if (index < cols) {
            $(value).removeAttr("style"); //移除style样式，配合 resize 事件（窗口变化时触发）
            // console.log(index);
            // console.log(value);
            hArr[index] = h;
        } else {
            //最小高度的列
            var minH = Math.min.apply(null, hArr);
            //最小高度的列在数组中的索引
            var minHIndex = $.inArray(minH, hArr);

            $(value).css({
                "position": "absolute",
                "top": minH,
                "left": minHIndex * w
            });

            hArr[minHIndex] += $(value).outerHeight();
        }
    });
}
