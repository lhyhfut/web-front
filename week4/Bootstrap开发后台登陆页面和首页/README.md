* 多看看bootstrap代码,看看它是怎么做到的
* 点击提交能够进入后台界面,a标签即可
* 现在添加的是本地的bootstrap3.css

```
<link rel="stylesheet" href="./css/bootstrap3.css" />
```
但是在线上开发的时候还是添加cdn的url
* 如果不添加

```
<meta name="viewport" content="width=device-width,initial-scale=1" />
```
则在手机浏览器上的缩放效果是不好的。这一句起到的效果就是`支持移动设备`

这一句与是否引入bootstrap貌似没有关系。不引入则会有body的默认边距。引入了之后默认边距都没有了。
如果不用上面一句,则使用`媒体查询(media query)`也是可以完成的。
* 点击提交按钮转到主页,再form中设置action就可以了。
```
<form action="index.html">
```
* container容器自带响应式布局
* 从formlogin这个表单的容器div的设置看出。margin针对父元素和兄弟元素(文档流)。padding针对子元素(内容)。
* label的用法
```
<label for="remeber" class="checkbox">
                        <input type="checkbox" id="rember" value="remeber"/>
                        <small>Remember me</small>
                    </label>
```
这样点击rember选不中复选框。
```
<label class="checkbox">
                        <input type="checkbox"  value="remeber"/>
                        <small>Remember me</small>
                    </label>
```
这样是可以的。
注意前一种的使用场景:是<label for="id">name</label> 点击name可以选中后面的复选框。
但后一种只需要用<label>包裹住<input>就行了。并且貌似不能带for和id。否则不起作用。
在[http://v3.bootcss.com/css/#buttons](http://v3.bootcss.com/css/#buttons)中:
```
<label>
      <input type="checkbox"> Check me out
</label>
```
也是可以的。
* 一般来说在input之外添加一个容器div是比较好的。
1. 可以比较方便的设置这个div的位置。比设置input方便一些。
2. 可以设置div的text-align,padding等达到设置Input的效果。

* 容器div的class开始设为row,checkbox但是会与bootstrap默认的class名字重复。
改为row-con及checkbox-con。

* 用户名,密码左侧的图标。尝试下面这样写。但不行。只是有方框,没有图标。且不能处理与placeholder的关系。
```
.row-user:before {
    content: "\e008";
    font-family: 'Glyphicons Halflings';
    position: absolute;
    top: 7px;
    left: 10px;
    color: rgba(0,0,0,0.4);
}
.row-pwd:before {
    content: "\e033";
    font-family: 'Glyphicons Halflings';
    position: absolute;
    top: 7px;
    left: 10px;
    color: rgba(0,0,0,0.4);
}
```
原因:自己没有`Glyphicons Halflings`。并且content的内容相当于给相应的小图标位置。
这个在[Glyphicons 字体图标](http://v3.bootcss.com/components/)
* con容器加上
```
  min-width: 300px;
    min-height: 300px;
```
不然缩放的时候会有影响。
```
 width: 100%;
    height: 100%;
```
对它貌似没有影响。
本来想把con改为 container,看看bootstrap的响应式布局如何。但这样拉伸效果和con差不多,
但是在全屏的时候有侧栏有留白,图片不能铺满。
* 若想修改bootstrap默认样式。加!important。会改变加载顺序。

**index.html**

* before和after伪元素
* bootstrap还是需要看他的源码具体是如何实现的。而不能仅仅看它定义的一系列新概念。
* .sr-only类可用于隐藏标签
* bootstrap都是用class名字来设置样式。自己自定义可以用id来改变样式。或者在class中设置!important来重置样式。
* bootstrap3只认class名字,不认标签和id。比如有时你设置div或设置span的效果是类似的。当然标签有它自身的特点。
* nav中用到了`class="container-fluid"`,下面主页面也用到了`class="container-fluid"`。尽量保持一致,若用container,
则2个都用container,它和container-fluid的外边距是不一样的。
* 下面2个ul标签中没有链接效果的原因:
```
 <li><a href="#"></a>Nav item</li>
 ```
 错写成了:
```
<li><a href="#">Nav item</a></li>
```
* 自己的第二个container-fluid(nav下面的)与[http://v3.bootcss.com/examples/dashboard/#](http://v3.bootcss.com/examples/dashboard/#)上面不一样。
后者nav与第二个container-fluid不会重叠,不知道它是如何实现的。
自己目前只能给第二个container-fluid设置一个margin-top
尽量还是用class="container-fluid con-body",而非用id="con-body"

并且也没有滚动条。
* 把自己的index.css再bootstrap.css之后引用,应该可以直接重写bootstrap.css中的样式。不需要用!important了。
* 源码有个dashboard.css
* 自己做后台还是得修改。但sidebar,main,table还是需要有的。并且现在的样式太简单了。
* nav-sidebar的margin-right: -21px;和margin-left: -20px;是否有重复?
* padding的使用,对内容显示的调节
```
.main{
    padding: 20px;
}
```
* 例子源码在</body>之前引用js文件,这样页面加载会快一些。  
* 关于导航按钮不能响应的问题。在自己的代码上查不出问题。在例子代码的基础上修改。
只需要jquery.min.js和bootstrap.min.js
与<body youdao="bind">没有关系。
* placeholder中data-src属性加载不了图片,需要用src属性。