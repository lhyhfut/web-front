* 本次作业是使用cocos2d-js完成的2048消除类游戏。
1. 由于cocos2d-x官网上的cocos2d-x太大,编译Android应用后的项目都超过1.5G了。无法提交,
采用http://www.cocos2d-x.org/filecenter/jsbuilder  提供的单文件引擎。直接嵌入到html代码
中就能用。
2. 开始的时候采用最新的cocos2d-js-v3.12.js, 但下载的Demo在浏览器中一直报错:
HelloWorld.html中cc.game.run("gameCanvas");这一行cocos2d-js-v3.12.js在解析它的时候报错:
Uncaught TypeError: Cannot read property 'modules' of null
换为cocos2d-js-v3.8.js。
但新的问题是canvas的背景是黑色的。
在HelloWorld.html中设置css样式不起作用。  HelloWorld.html中 l8
只得在Helloworld这个初始加载的scene中绘制一个和canvas相同大小的矩形并填充颜色才醒。

另外就是由于给canvas设置margin-top不起作用,canvas会挨在chrome顶部。只得给body设置padding-top。
3. 如果是本地运行HelloWorld.html。则浏览器会有一个跨域的报错
cocos2d-js-v3.8.js:405 XMLHttpRequest cannot load /project.json. 
Cross origin requests are only supported for protocol schemes: 
http, data, chrome, chrome-extension, https, chrome-extension-resource.

这是cocos2d-js-v3.8.js在请求project.json。

可以在终端以跨域方式打开chrome:
open -a "Google Chrome" --args --disable-web-security --user-data-dir

本来尝试在xammp中打开HelloWorld.html。但总是Access forbidden。 基本上把xammp中
所有的httpd.conf类似文件都改成
Order allow,deny
Allow from all
没用。
只得如上所说终端以跨域方式打开chrome测试。

问题:
cocos2d-js与canvas的关系到底如何?
为什么在HelloWorld.html中给canvas设置样式(如上面2中设置背景颜色以及margin-top)
不起作用呢?默认显示是黑色的。


解答:
hao123作业。localstorge在chrome中是可以用file文件记录的。
但cookie只能存储于服务器端(比如xammp的htdocs文件夹),apache承载的就是服务。
所以本地访问的话,就会报错。因为不存在file这个文件。
本地打开会有file前缀。服务器打开会有IP地址或者域名。
不是不能跨域,用文件打开不存在域。

视频中把代码放在htdocs中。

canvas的背景设置。用canvas自己的方法。drawColor
设置margin-top也用它自己的方法。需要设置相应的宽高。
[drawColor方法：设置背景颜色](http://book.51cto.com/art/201204/328263.htm)
```
protected void onDraw(Canvas canvas) {  
    // TODO Auto-generated method stub  
    super.onDraw(canvas);  
    paint.setColor(Color.BLACK);                        //设置画笔颜色  
    canvas.drawColor(Color.YELLOW);                 //设置背景颜色  
    canvas.drawLine(50, 50, 450, 50, paint);            //绘制直线  
    canvas.drawRect(100, 100, 200, 600, paint);         //绘制矩形  
    canvas.drawRect(300, 100, 400, 600, paint);         //绘制矩形  
}  
```
