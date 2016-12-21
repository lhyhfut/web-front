**header-v1.0**
1. 官方源码
id   wrapper
id    header
id   pager
        section  jkBanner       上面的面板
                            videoContainer
                            bannerInfo
        section     jkJiuye            就业学习                
        section     jkBase              基础学习
        section     jkSku                专项提高
        section     jkDk                我是技术大咖
        section     jkBai               我是纯小白
        section     jkStudent        他们的故事
        section     jkOrganization    让每个人
id    footer     与pager之间有间隔
    gotop  浮在footer上  这是个position:fixed
    doyoo_mon_innner  这个是个在线客服,需要你点击才能够出现。平常不显示。按钮就在上面的gotop这个div中
2. 注意事项
* 在不同的浏览器下打开,界面不一样。比如Firefox下打开就没有背景面板中的视频。可能因为Firefox不支持的缘故。看Firefox源码。
* chrome中由于有adblock这个插件,可能有些区域显示不了。可以对比Safari中的页面
* 这个网站不支持鼠标右键。导致不能在Firefox中另存media source。可以在chrome source中查看。不要遗漏了。
* 除了上面几个用id,其余用class
* section部分用ul,li实现
* 自己可以用div不用section。这是H5的。在低版本的浏览器是不兼容的。ie6中打不开极客学院官网。
* 源码中很多使用怪异盒模型。
* 尽量不采用 *{}  的大面积设定样式的方式,而使用具体的。如button, dd, dl{}等具体的方式。
* 少直接对body进行操作。
* 开发过程中颜色使用#...,不要使用orange之类的
* 在没有添加'会员课程'和'极客社区'这2个li的时候,'职业学院'这个li  hover的时候会晃动。但在加'会员课程'和'极客社区'这2个li之后,就不会有晃动的情况了。可能是挤满了。
后来在有hover的时候还是会晃动,还是hover的问题
* #header .icon-box .app-icon的background-position:0 代表background-position-x:0  background-position-y:center
与background-position: 0 0代表background-position-x:0  background-position-y:0是不一样的
* 有问题多在chrome中调试，而非在编辑器中调试。
* 尚不清楚源码如何处理顶部二级菜单响应hover的问题。但源码把这几个二级菜单的属性写成一样,那就会同时响应hover,自己要添加一个独立属性。
* chrome中图片和css,js文件都可以open in new tab。有时在source中不容易找得到。
* 在chrome中看源码样式,不如看header.css文件。前者遗漏太多,顺序比较乱。自己有时候看了chrome中2处继承样式,把它合写在一起,是错误的。
还有就是有些hover样式在chrome中不容易找到(但却是有的),但在源码css文件中则可以比较清楚的看到。
* 公共样式写在后面也可以,但可能会出现属性覆盖的情况。看你怎么写了。
* 源码中下拉菜单也是采用li中嵌套div,css中使用子元素选择器,而非兄弟选择器,span,div则不行,不能够嵌套div
* display: inline;
* 隐藏的搜索框中的a标签如Android背景框颜色通过background: #f5f5f5设置。字体颜色通过color: #808080;设置。默认的字体颜色是蓝色。
* 在icon-box这个div中有一个<span class="search-icon" id="search-btn"></span>
  在searchbox这个div中有一个<i class="search-icon" id="search-btn"></i>
  因为这2个搜索框貌似是一个。在css代码中只设置了1次。但在html中写了2次,因为不能有相同的id,所以自己把第2个class没改,但id改成了search-btn1
  
  `To do list` 目前这个search-btn只能在icon-box这个di中显示,而不能在searchbox这个div中显示。
  只写1个css样式应该只能定位1个位置。虽然2处的父元素div不一样。不知道源码是如何做到的。
  自己写#header .icon-box .search-icon,这样就把父元素写死了。源码写#header .search-icon,用的是class而非id
* 目前header几处li在hover时显示下拉菜单。自己是给每个li添加class,单独识别。但貌似源码是一起识别的。但这样做理应该一处li hover一起显示的。
* 公共样式中的#header img,#header ul{...  vertical-align: middle}是必要的。没有这个搜索图标(放大镜)会向上偏移。但有了这个logo的图片会下压到底部。
在#header .nav-wrapper .logo img中添加float:left就行了。
* 在二维码及个人中心的下拉菜单的源码中可以看到span是可以嵌套div的,源码如下:
```
<span class="app-icon loginlist relative" id="appicon">
                    <div class="submenu">
                        <i class="top-icon"></i>
                        <img src="./img/heade-rwm.png">
                    </div>
                </span>
```
* 添加了二维码和个人中心的hover。但hover的时候还是会晃动。原因是右侧的滚动栏scroll。没有hover的时候有scroll,
hover的时候有scroll,但源码中无论hover与否,都是有scroll的。是不是因为height还不够,导致没有右侧的scroll呢?
在源码header.css中没有搜到scroll

* 精简代码
* header的小箭头在nav(arrow-icon)和icon-box(top-icon)。布局有些区别。把共同样式找出来。
* header中箭头的hover也是一样的。有动画。
* header中a标签的hover,变成绿色那个。 仅仅是"首页",但目前来看
```
#header nav a:hover {
	color: #35b558;
}
```
不起作用

对a标签
```
#header nav a {
	color: #333;
}
```
也不起作用,有些a标签的内容依然是蓝色的。

原因:拼写错误。.nav写成了nav

* header中下拉菜单显示的hover(nav和icon-box),有动画
* header中下拉菜单的布局显示,比如一些颜色等。
* cursor: pointer;手型?
* 个人中心下拉菜单内容还有hover。nav的下拉菜单也是。比如hover时候变成灰色。

`to do list`这个区域a标签过小,与
```
#header .icon-box .loginlist .submenu dd a {
	color: #666;
    /*下面几个加了会影响布局*/
	/*height: 35px;
	line-height: 35px;
	display: block;*/
}
```
的位置有关。不添加注释则区域过小,添加注释则布局混乱。
* 平时隐藏的搜索框的动画,暂时先不用,不然一刷新页面这个搜索框就出现了

* **pager**

* pager如何设置样式?min-width: 1000px;  还是width: 100%?

* box-sizing: border-box

* video H5的标签。 loop和autoplay属性。

* jkBanner有个背景图片。videoContainer里面有个video。这个背景图片也是video的图片。应该是防止在不支持video的浏览器上备用的。
<div class="video_mask"></div>是个黑灰色的div区域。估计也是为了防止上面这个原因的。有些重复。这些背景图片和背景颜色对下面一些图片的显示会有影响。

* 颜色的几种表示:background: rgba(0, 0, 0, .6)   #fff  red这几种表示方法

* 职业学院的图标列表里面又是li嵌套a,a嵌套div。看看a如何才能嵌套div

* 包含选择符与子选择符的区别:子选择符只能命中子元素,不能命中孙辈。还有个就是兼容性的问题。
所以.jkBanner .bannerInfo>span 就只针对<span>现在成为极客一员</span>

* css一个样式{}中,最后一行可以不带分号。

* h1,h3是标签名。不是class名。HTML本来就有的。引用的时候直接写h1,不要错写成 .h1了。它是块级元素。

* h1等字体的font-weight在common_sync0_libs_4f30de2.css中有改动。
pager的大部分样式是写在index_sync0_libs_d2d8ab0.css中。

* 那些如index_sync0_libs_d2d8ab0.css的css文件在chrome的source中都可以找得到。

* line-height和height属性的应用

* no-repeat center /141px 44px;这种写法。没有/是不显示的。

* .jkBanner .bannerStatus .haveLogin:hover不需要把.jkBanner .bannerStatus .haveLogin中所有样式重写一遍,会继承的。只需要把需要修改的重写一遍就行了。

* 第三方登录几个可能是旧版的,已经删除了,这里暂时注释,第三方登录对于一些网站还是比较常见的

* .jkBanner .bannerCard>div::last-child

*  p为块级元素。自身可以设置width和height。它里面还有内容如文字等(相对于内容则这个块级元素相当于容器,行内元素也是这样,不过行内元素的大小是内容的大小)。内容如果超出块级元素空间大小则设置overflow:hidden

* 块级元素没有设置width则为父元素的width

* 怪异盒模型  对这些块级元素等都会有影响

* .jkBanner .bannerCard>div .collegeClass ul li:hover span
这次是li span  不仅仅是li div

* bannerCard    width: 1020px;而非width: 1000px,源码中是1000px,但自己这里可能有些公共样式或者怪异盒模型等设置有差别,在chrome中调试需要1020。
还有一部分原因就是它内部的a元素等有一些公共样式没有设置。大了,自己的怪异盒模型估计没设置好,把div给撑大了,就到下一行中去了。
比如这里面的a标签还是蓝色,还有下划线。
common_sync0_libs_4f30de2.css
```
a,dd,div,dl,i,img,input,li,p,span,ul {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -moz-box-sizing: border-box
}
```
加上之后还是不行。
原因:
.jkBanner .bannerCard>div:last-child{
    margin-right: 0;
}
(1):last-child错写成::last-child了。这个错误的原因是有些自动补全自己没看到,多写了一次。
3个选项面板最后一个margin-right: 0;否则就会落入公共样式margin-right: 20px,则会把最后一个div挤下去
(2)这样修改之后,3个div总体也能够水平居中了

* 职业学院面板中  前端学院 等是蓝色字体且偏大挤压的愿意不是a标签的设置问题,而是.jkBanner .bannerCard>div .collegeClass ul li span漏写了

* 专项课程面板中图标离信息远 是公共样式的怪异盒模型的问题
/*common_sync0_libs_4f30de2.css*/
```
a,dd,div,dl,i,img,input,li,p,span,ul {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -moz-box-sizing: border-box
}
```

* bannerCard中职业学院和专项课程面板<span>GO学院</span>中文字有下划线,并非span的设置,而是a标签的设置。
```
.jkBanner .bannerCard a{
    text-decoration: none;
}
```
可以考虑设置a标签的公共样式,但暂时先分别设置。header中也有类似设置
```
a{
    color:#333;
    text-decoration: none;
}
```

* .section .h2Container>span:before

* background: #2d85ca url(../img/h2icon_a96e146.png) no-repeat center /15px 14px;

* .jkJiuye ul>li:nth-child(4)
.jkJiuye ul>li:last-child
这种命中元素的写法

* 页面背景颜色灰色再body中设置。
```
 background: #f5f5f5
 ```
 * /*li和:nth之间不能有空格*/
 ```
.jkBase ul>li:nth-child(4)
```

* li中的img再鼠标停留的时候有动画,要么是hover,要么是animaton
这是共同样式

```
.section>ul>li:nth-child(n+2):hover{
    border: 1px solid #ccc;
    box-shadow: 0 2px 6px #ccc;
    transition: box-shadow .5s;
    -moz-transition: box-shadow .5s;
    -webkit-transition: box-shadow .5s;
    -o-transition: box-shadow .5s
}
```
造成的

* .jkSku ul .h2Container>span:before

* ul>li:nth-child(3)的计数从1开始

* block,inline,inline-block,float:left区别

* 几个搭配使用
color
font-size
background
width
height
line-height
text-align
margin 0 auto
vertical-align
display
float
position
top right bottom left区别
margin-top    margin-right
padding-top   padding-right
border-left-top
border-radius
z-index

* box-sizing:border-box的影响。主要在(块级)(父)元素设置width和height的时候要受到margin和padding的影响

* a标签内容有默认样式,如蓝色,字体,下划线等
```
a{
    text-decoration:none;
    color:#333;
    // #666 #fff #eee
    font-size:12px;
}
```

* /*p本来就是块级元素,不需要重新设置了*/

```.jkStudent>ul>li .s_status```

* postion  left top定位相当于给元素找位置。
  找到了位置以后
  你还需要处理内部的内容:padding
  你还需要与邻居处理关系:margin

* 块级元素才设为box-sizing: border-box;

```
#footer div,
#footer p,
#footer dd,
#footer dl,
#footer dt
```

* psotion  display

```
#footer .jkinfor-block .jkinfor .jk-logo{
    position: absolute;
    left: 0;
    top: 25px;
    display: inline-block;
    width: 160px;
}
```

* `To do list`
把css,js文件模块化处理,按需加载。

* common_sync0_libs_4f30de2.css

```
.mar-t50 {
    margin-top: 50px!important;
}
```
自己把这个添加到了:
#footer 中

* dl dd dt的使用

* cursor: pointer;

```
#footer .jkinfor dl dd a {
	color: #999999;
    /*不设置这个鼠标为箭头,而非手型*/
    cursor: pointer;
}
```

* #footer .copyright a.down-sina /*a.down-sina之间不能有空格*/
有空格就变成子元素了