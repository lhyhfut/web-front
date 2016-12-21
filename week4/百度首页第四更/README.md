1.修改了设置span的display,设为inline-block，且把二级下拉菜单的margin-top改为0.这样鼠标从设置span往下移出的时候,二级下拉菜单不会缩回去。
2.把body的min-width增大,使其大于header,middle,footer中内容的width,这样在拉伸屏幕,改变屏幕分辨率的时候不会因为仍然要全部显示内容元素被挤到多行显示。而是会正确隐藏。
3.引入了csshover3.htc,因为ie6只对a标签的hover有效。对li,li等的hover没有效果,这样一来设置按钮的下拉菜单就会无法显示。
4.测试的浏览器:chrome,safari,firefox,opera,,IE6-IE11,edge,360,搜狗,百度,世界之窗,QQ,猎豹,2345,UC,傲游。
5.ie6不支持inline block
导致页面最下面的二维码部分会浮动起来。
解决:
在二维码qrcode 以及foot-text 中加上
*display:inline;
*zoom:1;
6.ie6不支持min-height
middle中有min-height: 600px,但ie6不支持,这样会导致在ie6中中间区域短了一截。
解决:
在#middle中加上    _height: 600px;
7.底部图片不能显示的问题。
雪碧图没能够找到正确的位置。这个需要background的background-position属性。左上角是原点,朝左为x正方向,朝上为y轴正方向。
8.voice和camera按钮的图片在ie6中不能正确显示。
从百度官网上下载的图片背景是灰色的。在网页上截图。背景是白色的。ie6用截图。截图可能会有像素上的差异,需要在input_voice,input_camera,以及它们的hover中调整height和width:
   _height:     _width:
然后就是在ie6中config-list会无视config中的文字,会顶上去。
针对ie6修改config-list的margin-top,和left就可以:
_margin-top
_right
9.更多产品的下拉菜单无法显示:
这是由于用到了.bri:hover ~ .more,中的兄弟选择符~,这是CSS3中的选择符。ie6只支持CSS1中的包含选择符。
有以下解决方案,但都没有成功:
(1)用div，IE6不能用兄弟选择器
(2)修改html文档,但a不能嵌套div,即使这样写,chrome等也不会这样渲染
(3)只用ul，li，sapn，在chrome中显示嵌套失败。IE6中也不行
(4)用selectivizr和MooTools-Core-1.6.0.js，在IE6中不能正确显示。另外暂时也没有学到JS
(5)源代码中不知道是怎么实现的。
源代码用的还是兄弟div，并且在ul 这个div外面。但在chrome的source源文件中没有搜索到  .bri:hover{ display:block}之类的。display:block大多出现在script中的js代码中。怀疑是用js实现的。但也没有找到具体的证据。

注 :关于a标签不能嵌套div的问建议用span和 div,就像"设置"那样,但自己试过,貌似还不行,可能因为自己没写好的关系.

10.百度按钮的底端(包括hover的时候)蓝线的问题:
取消border-bottom: 1px solid #2d78f4;
以及hover时候的的border-bottom: 1px solid #2868c8;就行了。
10.国内的浏览器除了搜狗,百度,世界之窗,猎豹以外另外的浏览器横向拉伸的最短width有个限制,可能与浏览器使用的内核有关,也可能与min-width的设置有关。
11.edge的测试文件不能有中文路径
12.ie8中voice不能正常显示
这个暂时解决不了

ie7设置下拉菜单会挤到上面去,voice不能正常显示
解决:
 /*ie7设置和设置的下拉菜单重合问题*/
     +margin-top: 20px;
    或 /*只针对IE*/
    *margin-top: 20px\9;

ie7 voice不能正确显示
追加
 *background-image: url("../images/voice1.png")\9;
    *background-repeat: no-repeat\9;
    *background-position: 0 50%\9;
    *background-size: 13px 18px\9;
用+ 应该也可以

ie5(不打算做兼容了)更多产品会挤下去,设置不能够弹出下拉菜单,voice和capture会挤到输入框左边,并且hover的时候因为变换图片会位置变化

ie6最新版本的index4.html百度一下不能hover了,上一版的index0.html还可以。

ie6在屏幕拉伸变小的时候,会出现堆叠,可能是overflow:hidden不起作用(不是这个原因)
在body中添加:
_width:810px;  
之后会出现y轴的默认滚动条
添加   *overflow-y: auto;
width=810px的右侧会出现空白区域。
修改为 _width: 100%;大屏幕能正常显示,但又出现缩小屏幕宽度的时候div堆叠的现象。ie6百度官网没有这个问题,不知道是如何解决的。


ie最好单用* html 容器,不要与其它容器混了。

ie7在全屏情况下可以看到x轴有个默认的滚动条,
解决:
 *overflow-x:auto;

点评:
(1)关于a标签不能嵌套div的问建议用span和 div,就像"设置"那样,但自己试过,貌似还不行,可能因为自己没写好的关系.
(2)不建议直接对body进行操作,另外做一个容器

----------------------------
**百度首页第四更**
* 不再用body,用容器wrapper,设置min-width和min-height。
`To do list`但这样做有个缺点:min-width：810px; overflow:scroll放到wrapper之后,压缩屏幕的时候又出现footer内容被挤到下一行的情况。
但header不会这样。并且 overflow: scroll;放在wrapper中还会造成多一个右侧的滚动栏。
* 下拉菜单用a/span/li 嵌套div,可以先一个html中尝试一下
* media query实现响应式设计。同时也在手机上测试。
* 关于a元素和ul,li,span,div等的嵌套。
  a可以嵌套ul,li,span,div等元素。但不能嵌套a元素。即使非直接嵌套也不行。
  就以百度首页的二级菜单为例:
  ```
  <a class="bri" href="http://www.baidu.com/more/" title="更多产品" target="_blank" style="display: block;">
      更多产品
                    <ul class="nav_more">
                        <li class="nav_more_title">
                            更多产品
                        </li>
                        <li>
                            <a href="">
                                <div class="icon3"></div>
                                <span>音乐</span>
                            </a>
                        </li>
                    </ul>
    </a>
  ```
  在chrome中是这样解析的:
  ![](http://7xpy7l.com1.z0.glb.clouddn.com/%E5%89%8D%E7%AB%AFa%E6%A0%87%E7%AD%BE%E4%B8%8D%E8%83%BD%E5%B5%8C%E5%A5%97a%E6%A0%87%E7%AD%BE.png)

不能出现a标签中嵌套a标签的情况。

如果把li中的a标签去掉:

```
<a class="bri" href="http://www.baidu.com/more/" title="更多产品" target="_blank" style="display: block;">
      更多产品
                    <ul class="nav_more">
                        <li class="nav_more_title">
                            更多产品
                        </li>
                        <li>
                                <div class="icon3"></div>
                                <span>音乐</span>
                        </li>
                    </ul>
    </a>
```

![](http://7xpy7l.com1.z0.glb.clouddn.com/%E5%89%8D%E7%AB%AFa%E6%A0%87%E7%AD%BE%E4%B8%8D%E8%83%BD%E5%B5%8C%E5%A5%97a%E6%A0%87%E7%AD%BE1.png)

当需要2个a标签的时候,一般写为兄弟元素的形式。
```
<a class="bri" href="http://www.baidu.com/more/" title="更多产品" target="_blank" style="display: block;">更多产品</a>
                     <ul class="nav_more">
                        <li class="nav_more_title">
                            更多产品
                        </li>
                        <li>
                            <a href="">
                                <div class="icon3"></div>
                                <span>音乐</span>
                            </a>
                        </li>
                    </ul>
```
比较好的做法:模仿极客学院header右上角的写法。
```
<span class="login">
<a class="bri" href="http://www.baidu.com/more/" title="更多产品" target="_blank" style="display: block;">更多产品</a>
 <ul class="nav_more">
                        <li class="nav_more_title">
                            更多产品
                        </li>
                        <li>
                            <a href="">
                                <div class="icon3"></div>
                                <span>音乐</span>
                            </a>
                        </li>
                    </ul>
</span>

.login:hover .nav_more{
    display:block
} 
```
也就是对span hover,而非a标签。这样与a标签没什么关系。a标签主要起到了提供链接的作用。

整个的右上角可以写为:
```
<div>
<a class="mnav" href="https://www.nuomi.com/?cid=002540" title="百度糯米" target="_blank">糯米</a>
            <a class="mnav" href="http://news.baidu.com/" title="百度糯米" target="_blank">新闻</a>
            <a class="mnav" href="https://www.hao123.com/" title="hao123" target="_blank">hao123</a>
            <a class="mnav" href="http://map.baidu.com/" title="百度地图" target="_blank">地图</a>
            <a class="mnav" href="http://v.baidu.com/" title="百度视频" target="_blank">视频</a>
            <a class="mnav" href="http://tieba.baidu.com/" title="百度贴吧" target="_blank">贴吧</a>
            <a class="lb" href="https://passport.baidu.com/v2/?login&tpl=mn&u=http%3A%2F%2Fwww.baidu.com%2F" title="登录百度帐号" target="_blank">登录</a>
            <a class="pf" href="https://www.baidu.com/gaoji/preferences.html" title="搜索设置" target="_blank">
                <span class="config">设置
                                <ul class="config_list">
                                    <li class="config_item">搜索设置</li>
                                    <li class="config_item">高级搜索</li>
                                    <li class="config_item">关闭预测</li>
                                    <li class="config_item">搜索历史</li>
                                </ul>
                </span>
             </a>
             <span>
              <a class="bri" href="http://www.baidu.com/more/" title="更多产品" target="_blank" style="display: block;">更多产品</a>
                 <div class="more">
                    <div class="nav_more_title">
                        <span>更多产品</span>
                    </div>
                    <div class="nav_more">
                        <ul>
                            <li>
                                <a href="">
                                    <div class="icon3"></div>
                                    <span>音乐</span>
                                </a>
                            </li>
                         </ul>
                    </div>
             </span>
</div
```
可以看到:
1. 前面几个a标签没必要用span包裹,因为不涉及到嵌套元素。
2. 设置用a标签嵌套span,再去嵌套ul,li,由于li中没有a标签,所以不会出现a标签嵌套a标签的情况。
3. 更多产品中如果像设置这么写,出现a标签嵌套a标签的情况。
    那就把a和下拉div写为兄弟元素。但不对a去hover,而是对它的父元素span去hover。
    因为ie6不支持兄弟选择器,支持子元素选择器。
4. 如果是兄弟选择器的写法,就不写外层的span。直接对a标签进行hover就行了。
5. 不用ul,li用dl,dd也是可以的。
6. 还有个拼写错误
```
.bri-con:hover .more,
/*.bri:hover ~ .more, */
.more:hover 
{
    display: block;
}
```
当初把.bri:hover ~ .more, 注释掉换为.bri-con:hover .more的时候,span hover的时候没有效果。
原因:.bri-con:hover .more后面少了逗号。因为后面还有.more:hover 呢。
`.more:hover `大概的意思是:脱离了span,但在more上(前提是more已经出现)还会显示。
但实际测试发现即使删除了这句,也是可以的。

`可能的原因:`more为span的子元素,且span现在是block元素,more显示的时候,会撑大span。也就是说,
more显示的时候,more的区域也就是span的区域,所以不写这句也是可以的。
1. 子元素的区域就是父元素的区域?一定情况下成立。即使再chrome上调试看到的蓝色块并不这么显示。
2. 逗号。
7. 边距的调整。再ie6,7,8上仍有些问题。
chrome上开始的时候"更多产品"位置也不对。
后来把"更多产品"的span容器由display:block改为display:inline-block
把u1中的a也都改为display:inline-block,这样这几个元素就都能够在一行显示了。
然后再去调整margin。以及u1的padding。微调。
现在最好不要用left,right。有些再ie上效果不好。可以适当用top。最好使用margin-top。
还有就是position的几种设置。具体可见git的这次commit
8. 还有一个问题:ie7离开了span放在more上more就不显示了。ie6没这个问题。
9. 还有一种写法:用li标签把a标签包裹起来:
```
<ul id="header">
			<li><a href=""><span><strong>糯米</strong></span></a></li>
			<li><a href=""><span><strong>新闻</strong></span></a></li>
			<li><a href=""><span><strong>hao123</strong></span></a></li>
			<li><a href=""><span><strong>地图</strong></span></a></li>
			<li><a href=""><span><strong>视频</strong></span></a></li>
			<li><a href=""><span>贴吧</span></a></li>
			<li><a href=""><span>登录</span></a></li>
			<li id="config">
				<span>设置</span>
				<div id="config_list">
					<div>&nbsp</div>
					<ul>
						<li class="config_item">搜索设置</li>
						<li class="config_item">高级搜索</li>
						<li class="config_item">关闭预测</li>
						<li class="config_item">搜索历史</li>
					</ul>
				</div>

			</li>
			<li><a href="" id="hd_morelink"><span id="hd_moretext">更多产品</span></a>
				<div id="more">
					<div id="nav_more_title">
						<span>更多产品</span>
					</div>
					<div id="nav_more">
						<ul>
							<li><a href=""><div class="icon3"></div><span>音乐</span></a></li>
							<li><a href=""><div class="icon4"></div><span>图片</span></a></li>
							<li><a href=""><div class="icon2"></div><span>知道</span></a></li>
							<li><a href=""><div class="icon5"></div><span>文库</span></a></li>
							<li><a href=""><div class="icon6"></div><span>风云榜</span></a></li>
							<li><a href=""><div class="icon7"></div><span>百度推广</span></a></li>
							<li><a href=""><span id="allproduct_link">全部产品>></span></a></li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
```

* 响应式百度首页
1. 左上角天气的面板的显示关闭暂时不做
2. 右上角换肤的跳转暂时不做
3. 输入框中点击voice会弹出voice和capture
4. 手机上"更多"也有下拉菜单
5. 下面还有个"关注","推荐","奥运"的选项卡。这个用bootstrap时貌似也得用JS。
    "关注"的右上角也有个下拉菜单。
6. 手机上估计不支持hover,PC端hover显示的功能,估计再手机上都得用JS响应触摸(鼠标?)事件来实现。
7. 不同移动设备的适配。如Android和iPhone。各种设备的屏幕尺寸也不一样。
对字体大小等有影响。
8. 天气的下拉菜单并非响应下拉箭头,而是响应整个weather这个div
9. 在搜索框输入文字后会显示这个下拉菜单(suggest-div 搜索建议) `清除历史记录`,`直达号`,`关闭`
不过这个div平时也是隐藏的。这个div如何在输入文字的时候才能显示搜索建议。
10. 源码结构:
```
id="page" 
    id="index-card"
        id="weather"
            class="weather-outline"
                class="icon-weather-default"
                class="weather-num"
                class="weather-status"
                class="icon-down"
            class="weather-detail"  隐藏
                class="weather-detail-status"
                    class="weather-detail-gps"
                    class="weather-detail-temperature"
                    class="weather-detail-sky"
                    class="icon-weather-toggle noTapColor"
                    a标签:查看更多
                class="weather-detail-forecast"
        id="header"
            id="userinfo-wrap"
                id="login-wraps"
                    id="login"
            id="skin-wrap"
                id="skin"
                    class="icon-skin"
            id="logo"
                img
            form
                class="con-wrap"
                    input
                    class="se-inner"
                        class="callicon-wrap"
                            class="baiduapp-icon"
                            class="baiduappcall-wrap"隐藏
                            button  id="index-bn"
                id="index-box"
                    class="suggest-div" 隐藏
                        class="suggest-direct"
                        class="suggest-panel"
                        class="suggest-title"
                        class="suggest-close"
                    8个hidden的input
               id="navs"
                6个a标签。最后一个"更多"的下拉菜单由JS实现。
        class="menu-container"
                3个span选项卡。"关注","推荐","奥运"。选项卡的切换不知道由什么完成。貌似不是JS。
     id="search-card"  隐藏
```
* mobile的源码也是可以下载到的。有些资源文件则下载不到，需要到source中去看
* 需要用JS操作的尽量用id而非class
* 源码中的expand
```
 #weather.expand~ #header {
            position: relative;
            z-index: 2
}  
#weather.expand,
#weather.expand~ #plus-card {
      z-index: 1
}
```
* 移动设备和PC端的div应该不存在重叠复用的情况(老师课堂上的例子是存在的)
* 移动端的一些小图标(比如天气等)在source中下载不到。目前用的是别人下载的
* 更多使用javascript实现,现实不做
```
<a href="javascript:;"><i class="navs-more"></i>更多</a>
```
* 字体小图标,可以从源码
```
@font-face {
            font-family: 'icons';
            src: url(//m.baidu.com/static/index/iconfont/iconfont_c7ccca59.eot);
            src: url(//m.baidu.com/static/index/iconfont/iconfont_c7ccca59.eot#iefix) format('embedded-opentype'), 
            url(//m.baidu.com/static/index/iconfont/iconfont_c7ccca59.woff) format('woff'), 
            url(//m.baidu.com/static/index/iconfont/iconfont_c7ccca59.ttf) format('truetype'), 
            url(//m.baidu.com/static/index/iconfont/iconfont_c7ccca59.svg?#iconfont) format('svg');
            font-weight: normal;
            font-style: normal
        }
```
中下载到
打开ttf可以看见图标,在chrome中打开svg可以看到位置比如E047之类的。
* 推荐中"pic-content"和"text-content"不能排成一排的问题。
都设为display:inline-block或float:left。但前者是底部对齐,后者是顶部对齐。
并且两者宽度设的有问题。
图片太大的问题。
* 几个遗留问题
1. body,wrapper设置背景颜色#f1f1f1不起作用。必须具体设置mobile-header等
可能因为自己有一段把它们分别设为了#fff
2. "推荐"第一栏中图片大小设置不好。也可能因为有时候
3. 有些字体图标找不到。导致不能用新的。但旧的缺少右上角的皮肤图标
4. 搜索输入框的长度没设置好。
5. 新闻navs左侧少一个边距。
6. 整体的media query
* 百度源码PC端其实是不支持media query的。源码的移动端和PC端用了2套代码。
但自己的PC端也要支持media query。
* 外层容器con-wrap的width设为100%之后是可以宽度自适应的。
但里面的4个控件:文本输入框,voice,下拉图标,button样式设置有误。导致width变化的时候
这些控件位置会变形。这是因为直接应用了百度源码的缘故。但它不支持PC端的media query。
并且为了一些隐藏的控件。样式设置的很复杂。
* 现在的字体图标都采用伪元素before和after的方式来加载。如果是直接加载图片,应该怎么做?
* 搜索框中的input,voice,voice-down,button排成一排的问题。
因为要宽度自适应,width设为100%,布局上不能使用position:absolute及display:inline-block的方式排成一排。
而应该使用float:left  margin-left:-100%等方式(有些类似于双飞翼布局的做法)。
* voice和voice-down图标的显示。采用源码伪元素的方式。不能显示。那就用div,给div设置bcakground的方式。
还有就是图片的位置。不要使用position:absolute,top,left或者margin(用marin-top可以实现),最好使用background-position-y的方式。
使用line-height: 39px;vertical-align: middle或padding-top: 5px的方式是不行的。
* width为810px的时候页面不能正确显示。header等没有了。
* 手机屏幕侧边留白原因:con-wrap容器padding-right: 122px
* 审查元素，查看盒子模型是解决BUG的一个重要方法,因为元素的实际样式可能与你设定想象的不一样,然后先在chrome上调试。
* 实时热点hotword-lists中第一栏目(包含span)不能对齐(有div挤压)的原因:
hotword-item a 设为display: inline;就行了。这个本来是默认的。
但前面我设置了公共样式.blank-frame a 为display: block;这样大面积设置并不好。
还要注意display的3种设置inline,inline-block,block的区别。inline就是行内元素(内容撑开区域)。
inline-block是行内块元素(内容和区域有区别,不换行),block就是行间元素(内容和区域有区别,换行)
只要有block,内容显示可能就不能对齐了。
但只有block才可以设置宽高。使用盒模型的margin,padding,border等。
同理blank-frame a的margin也会导致hotword-item a的margin显示有问题。需要给后者重置。
* PC端width压缩,实时热点第一栏内容会挤压到图片下面。(前面解决了移动端实时热点第一栏内容会挤压到图片下面的问题)。
tpl-2 .pic-content使用了display: inline-block,后面的tpl-2 .info-content也使用display: inline-block,当压缩到内容的宽度大于
屏幕的宽度的时候,就会换行。
现在把tpl-2 .pic-content改用float:left,当压缩到内容的宽度大于屏幕的宽度的时候,它会纵向撑开,而非换行,但这样又有缺陷,width变大的时候,下一栏会上来。这样更不好。
但最好是给body设置一个min-width,让压缩到一定的宽度时候overflow:hidden或者overflow:scroll。
* 移动端屏幕分辨率变大为100%的时候,y轴不能完全显示。
给body设置min-height: 1000px;这样150%的时候都能够完全显示。
不过这个其实是正常的。min-height过大会导致移动端50%及PC端显示的时候y轴有大量留白。并且有不同的手机机型及屏幕,不可能
对每一个都设置一个min-height,源码因为内容比较多,所以会一直显示。
* 源码中的字体图标通过
```
#skin i:before {
    content: '\e824';
    color: #666;
    font: 24px/1 icons;
}
```
设置。下载了源码的svg文件,但还是找不到824这些id。
* 批阅问题
1.form的action和method有区别
2.链接没有http或https
3.PC端的响应式布局没有问题了,但不同手机屏幕还是有问题,特别是实时热点栏目
