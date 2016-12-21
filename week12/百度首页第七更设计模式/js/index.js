            /*单例模式,换肤*/
            var changeSkin = {
                init: function() {
                    this.render();
                    this.bind();
                },
                render: function() {
                    /*var me = this;
                    me.skinShow = $("#skin-area");
                    me.skinHide = $(".skin-bg-icon>span");*/
                    this.skinShow = $("#skin-area");
                    this.skinHide = $(".skin-bg-icon>span");
                },
                bind: function() {
                    var me = this;
                    me.skinShow.click(function() {
                        $("#hd-header").hide();
                        $(".middle_up").hide();
                        $(".s-skin-layer").slideDown("slow");
                    });
                    me.skinHide.click(function() {
                        $(".s-skin-layer").slideUp();
                        setTimeout(function() {
                            $("#hd-header").show();
                            $(".middle_up").show();
                        }, 500);
                    });

                }
            };

            /*单例模式,切换背景图片*/
            var changeBgImage = (function() {
                var bg_imgTheme = $.cookie()["bg_img"] || window.localStorage.getItem("bg_img");
                bg_imgTheme = decodeURIComponent(bg_imgTheme);
                var logoImgPath = __uri("images/logo_white.png");
                var logo1ImgPath = __uri("images/bd_logo1.png");

                function init() {
                    readImgFromMemory();
                    changeImg();
                    doNotUseSkin();
                }
                //页面刷新从cookie读取背景图片
                function readImgFromMemory() {
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
                                // src: "images/bd_logo1.png"
                                src: logo1ImgPath
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
                                // src: "images/logo_white.png"
                                src: logoImgPath
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
                }
                // 切换背景图片
                function changeImg() {
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
                                    // src: "images/logo_white.png"
                                    src: logoImgPath
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
                }
                // 不使用换肤按钮
                function doNotUseSkin() {
                    $(".skinset-title").click(function() {
                        $("body").css({
                            'background': 'none',
                            'background-size': 'cover',
                            'background-position': 'center center',
                            'background-attachment': 'fixed'
                        });
                        $("#logoImg").attr({
                            //'src': 'url("images/bd_logo1.png")'
                            // src: "images/bd_logo1.png"
                            src: logo1ImgPath
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
                }
                return init;
            })();

            /*单例模式,左上角天气信息*/
            var weatherInfo = {
                init: function() {
                    this.render();
                    this.bind();
                },
                render: function() {
                    this.weatherPanelControl = $("#weather-wrapper");
                    this.weatherSettingControl = $("#lunar-setting-btn");
                    this.weatherSettingSaveAndCancel = $("#setting-save,#setting-cancel");
                },
                bind: function() {
                    var me = this;
                    me.weatherPanelControl.hover(
                        function() {
                            $("#weather-panel").css({
                                'display': 'block'
                            });
                            $.ajax({
                                type: 'GET',
                                url: 'https://api.heweather.com/x3/weather?cityid=CN101280601&key=d115887d1abe4824a559e0705f5d8fa2',
                                dataType: 'json',
                                success: function(data) {
                                    // console.log(data); //服务器响应成功的话，响应体以data参数的形式传入函数中供调用。
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
                    );
                    me.weatherSettingControl.click(function() {
                        $("#weather-setting").css({
                            'display': 'block'
                        });
                        $("#weather-content").css({
                            'display': 'none'
                        });
                    });
                    me.weatherSettingSaveAndCancel.click(function() {
                        $("#weather-setting").css({
                            'display': 'none'
                        });
                        $("#weather-content").css({
                            'display': 'block'
                        });
                    });
                }
            };

            /*单例模式,右上角"用户名","设置","更多产品"二级菜单显示与隐藏*/
            var rightTopControl = {
                init: function() {
                    this.render();
                    this.bind();
                },
                render: function() {
                    this.accountMenu = $("#account,#account_list");
                    this.configMenu = $("#config,#config_list");
                    this.productMenu = $("#bri,#more");
                },
                bind: function() {
                    var me = this;
                    me.accountMenu.hover(
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
                    );
                    me.configMenu.hover(
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
                    );
                    me.productMenu.hover(
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
                    );
                }
            };

            /*单例模式,主页选项卡的页面点击选择*/
            var mainMenu = (function() {
                function readselectedTabFromMemory() {
                    //页面刷新时读取
                    //cookie需要在服务器条件下测试
                    var tabClassName = $.cookie()["selectedName"] || window.localStorage.getItem("selectedName");
                    tabClassName = decodeURIComponent(tabClassName);
                    //定义为themeClassNames,不要与下面的elements数组重名了,影响下面的操作
                    var themeClassNames = ['#myAttention', '#recommend', '#navigation', '#video', '#shopping'];
                    //var themeContentNames = ["#att-content","#rec-content","#nav-content","#video-content","#shop-content"];
                    var themeContentNames = {
                        '#myAttention': "#att-content",
                        '#recommend': "#rec-content",
                        '#navigation': "#nav-content",
                        '#video': "#video-content",
                        '#shopping': "#shop-content"
                    };
                    //console.log('检测', themeContentNames['#myAttention']);
                    var themePos = themeClassNames.indexOf(tabClassName);
                    if ('tabClassName') {
                        $('tabClassName').css({
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
                }

                function changeTab() {
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
                    // console.log('eleContent', eleContent);
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
                }

                function configPanelControl() {
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
                }

                function init() {
                    readselectedTabFromMemory();
                    changeTab();
                    configPanelControl();
                }
                return init;
            })();

            /*单例模式,回到顶部按钮*/
            var goTop = {
                init: function() {
                    this.render();
                    this.bind();
                },
                render: function() {
                    this.scrollBar = $(window);
                    this.goTopBtn = $("#to-top");
                },
                bind: function() {
                    var me = this;
                    me.scrollBar.scroll(function() {
                        if ($(window).scrollTop() > 100) {
                            $("#to-top").fadeIn(1000);
                        } else {
                            $("#to-top").fadeOut(1000);
                        }
                        // console.log($(window).scrollTop());
                    });
                    me.goTopBtn.click(function() {
                        $('body,html').animate({ scrollTop: 0 }, 1000);
                        return false;
                    });
                    me.goTopBtn.hover(
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
                    );
                }
            };

            /*各个单例的调用*/
            var baiDuHomePage = (function() {
                changeSkin.init();
                changeBgImage();
                weatherInfo.init();
                rightTopControl.init();
                mainMenu();
                goTop.init();
            })();
            //cookie需要添加一些可选属性
            function setCookie(name, value) {
                var Days = 30;
                var exp = new Date();
                exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                exp.toUTCString();
                // $.cookie(name, escape(value), { expires: exp });
                $.cookie(name, encodeURIComponent(value), { expires: exp });
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
