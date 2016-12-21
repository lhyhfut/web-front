$(document).ready(function() {
        $(window).on("load", function() {
            //有些部分不需要在onload中进行

            //换肤功能
            //换肤面板显示
            $("#skin-area").click(function() {
                    $("#hd-header").hide();
                    $(".middle_up").hide();
                    $(".s-skin-layer").slideDown("slow");
                })
                //换肤面板收起
            $(".skin-bg-icon>span").click(function() {
                $(".s-skin-layer").slideUp();
                setTimeout(function() {
                    $("#hd-header").show();
                    $(".middle_up").show();
                }, 500);
            })
            var bg_imgTheme = $.cookie()["bg_img"] || window.localStorage.getItem("bg_img");
            if (bg_imgTheme) {
                $("body").css({
                    //正确的写法
                    //'background': "bg_imgTheme",
                    //错误的写法
                    'background': bg_imgTheme,
                    'background-size': 'cover',
                    'background-position': 'center center',
                    'background-attachment': 'fixed'
                });
                /*$("#logoImg").attr({
                    //'src': 'url("images/logo_white.png")'
                    src: "images/logo_white.png"
                });*/
                if (bg_imgTheme === "none") {
                    $("#logoImg").attr({
                        //'src': 'url("images/logo_white.png")'
                        src: "images/bd_logo1.png"
                    });
                    $("#to-top").css({
                        'background-color': '#e3e3e3'
                    });
                    $("#icon-mask").css({
                        'background-color': '#eee'
                    });
                    $("#foot-text").css({
                        'color': '#999'
                    });
                    $("#foot-text a").css({
                        'color': '#999  '
                    });
                } else {
                    $("#logoImg").attr({
                        //'src': 'url("images/bd_logo1.png")'
                        src: "images/logo_white.png"
                    });
                    $("#to-top").css({
                        'background-color': 'transparent'
                    });
                    $("#icon-mask").css({
                        'background-color': 'transparent'
                    });
                    $("#foot-text").css({
                        'color': '#fff'
                    });
                    $("#foot-text a").css({
                        'color': '#fff'
                    });
                }
            }
            //背景图片选择
            //'url("images/bg("+m+").jpg"中变量m不能被识别
            for (var m = 0; m < 6; m++) {
                (function(m) {
                    $(".skin-img-item:eq(" + m + ")").click(function() {
                        $("body").css({
                            //正确的写法
                            //'background': 'url("images/bg1).jpg")',
                            'background': "url(images/bg" + (m + 1) + ".jpg)",
                            //错误的写法
                            //'background': 'url(images/bg"+(m+1)+".jpg)',
                            //'background': 'url("images/bg1.jpg")',
                            //'background': 'url("images/bg"+(m+1)+".jpg")',
                            //'background': "url("images/bg"+(m+1)+".jpg")",
                            'background-size': 'cover',
                            'background-position': 'center center',
                            'background-attachment': 'fixed'
                        });
                        $("#logoImg").attr({
                            //'src': 'url("images/logo_white.png")'
                            src: "images/logo_white.png"
                        });
                        $("#to-top").css({
                            'background-color': 'transparent'
                        });
                        $("#icon-mask").css({
                            'background-color': 'transparent'
                        });
                        $("#foot-text").css({
                            'color': '#fff'
                        });
                        $("#foot-text a").css({
                            'color': '#fff'
                        });
                        setCookie("bg_img", "url(images/bg" + (m + 1) + ".jpg)");
                        localStorage.setItem("bg_img", "url(images/bg" + (m + 1) + ".jpg)");
                    })
                })(m);
            }


            $(".skinset-title").click(function() {
                $("body").css({
                    'background': 'none',
                    'background-size': 'cover',
                    'background-position': 'center center',
                    'background-attachment': 'fixed'
                });
                $("#logoImg").attr({
                    //'src': 'url("images/bd_logo1.png")'
                    src: "images/bd_logo1.png"
                });
                $("#to-top").css({
                    'background-color': '#e3e3e3'
                });
                $("#icon-mask").css({
                    'background-color': '#eee'
                });
                $("#foot-text").css({
                    'color': '#999'
                });
                $("#foot-text a").css({
                    'color': '#999  '
                });
                setCookie("bg_img", "none");
                localStorage.setItem("bg_img", "none");
            })


            //左上角"天气"二级下拉菜单的显示与隐藏,应在hover中发ajax请求
            $("#weather-wrapper").hover(
                    function() {
                        $("#weather-panel").css({
                            'display': 'block'
                        });
                        $.ajax({
                            type: 'GET',
                            url: 'https://api.heweather.com/x3/weather?cityid=CN101280601&key=d115887d1abe4824a559e0705f5d8fa2',
                            dataType: 'json',
                            success: function(data) {
                                console.log(data); //服务器响应成功的话，响应体以data参数的形式传入函数中供调用。
                            },
                            error: function() {
                                console.log('请求失败');
                            }
                        })
                    },
                    function() {
                        $("#weather-panel").css({
                            'display': 'none'
                        })
                    }
                )
                //左上角隐藏天气面板点击"设置"按钮显示设置面板,点击显示,消失
            $("#lunar-setting-btn").click(function() {
                $("#weather-setting").css({
                    'display': 'block'
                });
                $("#weather-content").css({
                    'display': 'none'
                });
            })

            $("#setting-save,#setting-cancel").click(function() {
                $("#weather-setting").css({
                    'display': 'none'
                });
                $("#weather-content").css({
                    'display': 'block'
                });
            })

            //右上角"用户名"二级下拉菜单的显示与隐藏
            $("#account,#account_list").hover(
                    function() {
                        $("#account_list").css({
                            'display': 'block'
                        })
                    },
                    function() {
                        $("#account_list").css({
                            'display': 'none'
                        })
                    }
                )
                //右上角"设置"二级下拉菜单的显示与隐藏
            $("#config,#config_list").hover(
                    function() {
                        $("#config_list").css({
                            'display': 'block'
                        })
                    },
                    function() {
                        $("#config_list").css({
                            'display': 'none'
                        })
                    }
                )
                //右上角"更多产品"二级下拉菜单的显示与隐藏
            $("#bri,#more").hover(
                function() {
                    $("#more").css({
                        'display': 'block'
                    })
                },
                function() {
                    $("#more").css({
                        'display': 'none'
                    })
                }
            )


            //主页选项卡的页面点击选择
            //页面刷新时读取
            //cookie需要在服务器条件下测试
            var tabClassName = $.cookie()["selectedName"] || window.localStorage.getItem("selectedName");
            //定义为themeClassNames,不要与下面的elements数组重名了,影响下面的操作
            var themeClassNames = ['#myAttention', '#recommend', '#navigation', '#video', '#shopping'];
            //var themeContentNames = ["#att-content","#rec-content","#nav-content","#video-content","#shop-content"];
            var themeContentNames = {
                    '#myAttention': "#att-content",
                    '#recommend': "#rec-content",
                    '#navigation': "#nav-content",
                    '#video': "#video-content",
                    '#shopping': "#shop-content"
                }
                //console.log('检测', themeContentNames['#myAttention']);
            var themePos = themeClassNames.indexOf(tabClassName);
            if (tabClassName) {
                $(tabClassName).css({
                    'background-color': '#9a9da2',
                    'color': '#fff'
                });
                $(themeContentNames[tabClassName]).css({
                    'display': 'block'
                });
                if (tabClassName == '#myAttention') {
                    $("#my-icon").css({
                        'background-position': '-144px 0'
                    });
                }
                themeClassNames.splice(themePos, 1);
                themeClassNames.forEach(function(element) {
                    $(element).css({
                        'background-color': '#FFFFFF',
                        'color': '#333'
                    });
                    $(themeContentNames[element]).css({
                        'display': 'none'
                    });
                })
            }
            var elements = ['#myAttention', '#recommend', '#navigation', '#video', '#shopping'];
            var eleContent = {
                '#myAttention': "#att-content",
                '#recommend': "#rec-content",
                '#navigation': "#nav-content",
                '#video': "#video-content",
                '#shopping': "#shop-content"
            };
            //var elements = themeClassNames.concat();
            //var eleContent = deepCopy(themeContentNames);
            //console.log('elements', elements);
            console.log('eleContent', eleContent);
            var pos; //记录被删除元素的位置
            for (var i = 0; i < elements.length; i++) {
                (function(i) {
                    $(elements[i]).click(
                        function() {
                            // 点击的选项卡设为深灰色
                            $(this).css({
                                'background-color': '#9a9da2',
                                'color': '#fff'
                            });
                            $(eleContent[elements[i]]).css({
                                'display': 'block'
                            });
                            if (elements[i] == '#myAttention') {
                                $("#my-icon").css({
                                    'background-position': '-144px 0'
                                });
                            } else {
                                $("#my-icon").css({
                                    'background-position': '-15px 0'
                                });
                            }
                            setCookie("selectedName", elements[i]);
                            window.localStorage.setItem("selectedName", elements[i]);
                            pos = elements.indexOf(elements[i]);
                            elements.splice(pos, 1);
                            elements.forEach(function(element) {
                                $(element).css({
                                    'background-color': '#FFFFFF',
                                    'color': '#333'
                                });
                                $(eleContent[element]).css({
                                    'display': 'none'
                                });
                            });
                            //console.log('click中的elements', elements);
                            //需要恢复,不然几次点击,elements就为空了
                            elements = ['#myAttention', '#recommend', '#navigation', '#video', '#shopping'];
                        }
                    )
                })(i);
            }
            //主页点击设置按钮,显示设置面板
            $("#setting,#config-content").click(function(e) {
                $("#config-content").css({
                    'display': 'block'
                });
                e.stopPropagation();
                $("#config-content").removeClass("active");
            });
            $(document).click(function() {
                if (!$("#config-content").hasClass("active")) {
                    $("#config-content").css({
                        'display': 'none'
                    });
                    $("#config-content").addClass("active");
                }
            });

            //回到顶部按钮
            $(window).scroll(function() {
                if ($(window).scrollTop() > 100) {
                    $("#to-top").fadeIn(1000);
                } else {
                    $("#to-top").fadeOut(1000);
                }
                console.log($(window).scrollTop());
            })
            $("#to-top").click(function() {
                    $('body,html').animate({ scrollTop: 0 }, 1000);
                    return false;
                })
                //to-top hover移入的时候显示文字,hover移除的时候显示图标
            $("#to-top").hover(
                function() {
                    $("#icon-mask").css({
                        'display': 'block'
                    });
                    $("#icon").css({
                        'display': 'none'
                    });
                },
                function() {
                    $("#icon-mask").css({
                        'display': 'none'
                    });
                    $("#icon").css({
                        'display': 'block'
                    });

                }
            )


        });

    })
    //cookie需要添加一些可选属性
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    exp.toUTCString();
    $.cookie(name, escape(value), { expires: exp });
}
//对象的深拷贝
function deepCopy(source) {
    var result = {};
    for (key in source) {
        //如果是对象,则继续调用deepCopy()
        result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
    }
    return result;
}
