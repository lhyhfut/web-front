$(function() {
    //alert($);

    //顶部搜索框的点击效果
    $("#search-btn").click(function() {
        $("#searchbox").css({
            'display': 'block'
        })
    })
    $("#close-btn").click(function() {
        $("#searchbox").css({
            'display': 'none'
        })
    })

    //课程库右侧二级菜单的显示隐藏

    for (var j = 0; j < 10; j++) {
        (function(j) {
            $(".couseListDiv:eq(" + j + ")").hover(
                function() {
                    //右侧二级菜单的显示与隐藏
                    $(".list-show:eq(" + j + ")").css({
                        'display': 'block'
                    });
                },
                function() {
                    //右侧二级菜单的显示与隐藏
                    $(".list-show:eq(" + j + ")").css({
                        'display': 'none'
                    });
                }
            )
        })(j)
    }
    //pager——main——lesson-list和lesson-list的切换
    $(".kuai-icon").click(function(){
        $(".lesson-list").show();
        $(".lesson-list2").hide();
    });
    $(".list-icon").click(function(){
        $(".lesson-list").hide();
        $(".lesson-list2").show();
    })

    //pager——main——lesson-list顶部分类下拉菜单及动画
    //pager——main——lesson-list课程内容显示
    //第6种方法,注意
    // 1.选择器中不是:eq(i),而应该是:eq("+i+")
    //2.需要时用(function(i){})(i)不然绑定for循环事件函数有问题
    for (var i = 0; i < 24; i++) {
        (function(i) {
            $(".cf>li:eq(" + i + ")").hover(
                function() {
                    //console.log($(".cf>li"));
                    //console.log($(".cf>#2899"));
                    //console.log(1);
                    //收藏按钮
                    $(".lesson-shoucang:eq(" + i + ")").show();
                    //点播按钮
                    $(".lessonplay:eq(" + i + ")").fadeIn();
                    //说明文字
                    $(".lesson-infor:eq(" + i + ")").css({
                        'height': '175px'
                    });
                    $(".lesson-info-p:eq(" + i + ")").css({
                        'height': '52px'
                    });
                    //滑动方式显示p元素
                    $(".lesson-info-p:eq(" + i + ")").slideDown();
                    $(".lesson-info-p:eq(" + i + ")").fadeIn();
                    $(".zhongji:eq(" + i + ")").css({
                        'display': 'block'
                    });
                    $(".learn-number:eq(" + i + ")").css({
                        'display': 'block'
                    })
                },
                function() {
                    $(".lesson-shoucang:eq(" + i + ")").hide();
                    $(".lessonplay:eq(" + i + ")").fadeOut();
                    $(".lesson-infor:eq(" + i + ")").css({
                        'height': '88px'
                    });
                    $(".lesson-info-p:eq(" + i + ")").css({
                        'height': '0'
                    });
                    //滑动方式隐藏p元素
                    $(".lesson-info-p:eq(" + i + ")").slideUp();
                    $(".lesson-info-p:eq(" + i + ")").fadeOut();
                    $(".zhongji:eq(" + i + ")").css({
                        'display': 'none'
                    });
                    $(".learn-number:eq(" + i + ")").css({
                        'display': 'none'
                    })
                }
            )
        })(i)
    }

    //回到顶部按钮
    //点击按钮的显示与隐藏
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $("#top").fadeIn();
        } else {
            $("#top").fadeOut();
        }
    })
    $("#top").click(function() {
        $('body,html').animate({ scrollTop: 0 }, 1000);
        return false;
    })

    //二维码hover的显示
    $(".erwma").hover(
        function() {
            $(".erwma>img").css({
                'display': 'block'
            })
        },
        function() {
            $(".erwma>img").css({
                'display': 'none'
            })
        }
    )

})
