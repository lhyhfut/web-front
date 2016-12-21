* 此次做的百度新闻是在以前百度首页基础上开发。PC端依然显示百度首页,width<810的时候以及
  移动端会显示百度新闻
* 百度新闻只做了2个选项:精选,百家。分别对应数据库中的news和newsBaijia 2个table。
* baidunews.sql
1. baidunews.sql为这次数据库使用的sql文件,终端  source sql路径,即可创建
数据库:baidunews和2个表:news和newsBaijia
2. 2个table各有4组数据,在http://localhost/phpmyadmin/ 可以看到。
* fontNews文件夹为百度新闻的前端展示界面。完成如下功能
1. 若在本地,页面只会填充2条新闻。若在服务器环境,搭建好MYSQL的情况下在初始化加载以及滚动的时候
可以向后端发ajax请求数据而无限加载。
2. 顶部选项卡点击下划线效果。
3. 顶部选项卡生活,更多,收起的点击显示隐藏效果。
4. 顶部'精选','百家'选项卡点击会切换新闻界面。会从后端2个不同的table加载数据。
* backEndManager为百度新闻后台管理界面
1. 可以直接打开index.html或者从login.html登录跳转进入index.html。
登录时username为admin,password不做要求(不能为空)
2. index.html点击login out会弹出确认登出界面,点击确定会跳转回login.html。
3. index.html的左侧的选项卡对应着前端fontNews中index.html的选项卡。
这里仅仅只做了'精选'和'百家'。点击'精选'和'百家'会显示响应的table的内容,点击其他则没有内容。
4. add按钮提供增加数据的功能。
    由于新闻格式有3种:  
       0张图片,
       1张图片,
       3张图片
    故这里的图片链接不能输入2个。否则会弹出警告界面,表单不能提交。
    
    有一些必填字段:
    新闻标题,新闻链接,来源,事件,标签。这些都是前端index.html展示所必须的。
5. delete按钮提供删除功能。
   可以实现一行或者多行的删除。如果没有选择会弹出警告界面。
6. edit提供数据更新功能。
   更新数据后:
   后台的的展示界面会刷新,
   数据库中数据也会刷新。
7. 前端index.html新闻的分页加载,每滚动一次加载3条新闻,数据库中新闻数据取完了就不再继续加载。

* wee9比week8改进的地方:
1. 不再使用php做后台,删除了week8的php文件,改用nodejs + restify。
2. 由于restify设置静态文件服务器目录的时候不能用根目录:
server.get(/\/?.*!/, restify.serveStatic({
    directory: './frontNews/',     //这样会没效果
    default: 'index.html'
}));
只能把backEndManager和frontNews都放在webapp这个目录里。方便restify设置静态文件目录。
现在的整体访问情况:
服务器是127.0.0.1
端口号是9000
http://127.0.0.1:9000/   访问前端的index.html
http://127.0.0.1:9000/backEndManager/index.html   访问后端的index.html   (如果是未登录用户,则会跳转到login.html)
http://127.0.0.1:9000/backEndManager/login.html    访问后端的login.html (登录时用户名必须为admin,密码不做要求)
3. 本周作业使用的npm包都在package.json中,如果遇到包错误的问题,直接sudo npm install 即可。
   使用的包有restify,mysql,orm,dateformat。
2. app.js为整个项目的入口文件。
整个路由注册也都在这里进行
3. node app.js之后终端会报错:{ Error: Cannot find module './build/Debug/DTraceProviderBindings' }
这个错误不会影响程序的正常运行,DTraceProvider貌似是DTraceProvider的一个包,
目前还没找到解决这个问题的有效方法。
3. config.js主要封住了数据库的一些信息,以及一些表的模板。
   关于函数的封装,还有一部分直接在app.js中进行。因为有些函数依赖于外层嵌套函数的参数,
   在config.js中封装反倒麻烦。
3. login.html登录输入admin即可,密码不做要求。
4. 增加了初始进入  http://127.0.0.1:9000/backEndManager/index.html  的用户权限控制。
在login.js中使用cookie和localstorge存储了usename,如果是一登录用户,可以直接进入
http://127.0.0.1:9000/backEndManager/index.html ,
如果是未登录用户(被存储的用户名不是admin),则会跳转到登录页面
http://127.0.0.1:9000/backEndManager/login.html


* 问题：(批改1已解决)
1. 本周作业在form表单中存储的日期假设是2016-09-22, 在http://localhost/phpmyadmin 中查看也是
2016-09-22, 但node-orm从数据库中取出数据之后就变成了2016-09-21T16:00:00.000Z。 
返回给前端,后台index.html的日期都变成了这种类型的值。
注: MYSQL中日期类型设置的是Date,  orm中日期类型设置的是Date

在下面的这篇文章中提到了使用sequelize(类似于orm)的过程中也遇到了这个问题,貌似是时区的影响(上面后一个
时间好像进行了时区转换)。但貌似也没有很好的解决办法。
 [关于“时间”的一次探索](https://segmentfault.com/a/1190000004292140)
 自己使用了dateformat包对orm从mysql读取的数据进行处理(app.js):
 news.srcTime =dateFormat((news.srcTime), "yyyy-mm-dd");
 但没用,前端,后台index.html时间还是乱的。
 请问有什么很好的解决办法呢?
 2. 在login.js的登录按钮的点击事件中,
 如果不阻止默认事件,点击登录,由login.html跳转到index.html会报错:
 "code": "MethodNotAllowedError",
    "message": "POST is not allowed"

只有阻止默认事件,
  $("#myLogin").click(function(e) {
        e.preventDefault();
才能正常的由login.html跳转到index.html。
这个登录按钮(type="submit")的默认事件不就是跳转到index.html吗, 但现在为什么需要阻止了才能够正常跳转呢?

* 批改1
1. UTC时间格式
使用moment.js
2. 把点击add按钮form表单从后端index.html table页面中读取数据的测试代码取消。
不然会被误以为add和edit按钮用了一个form,其实用了2个。这个只是为了方便添加测试add新闻。忘记屏蔽了。
3. 后端index.html的table界面的edit和add按钮,应该添加在每个新闻row的右侧。
不然滚动到下面的新闻的得回滚到页面顶部才能够点击delete等按钮。这是个不好的用户体验。
但这需要改动的代码量比较大(HTML,CSS,JS)。暂时不做。
4. 删除前端indexhtml的静态新闻条目。完全用ajax从MSQL中读取。MSQL中的数据有新闻 重复。
5. 关于问题1, 可能的原因:
  (1) 可能是form中忘记添加action和method。
  可以看到login in这个<button type="submit"在
  <form action="index.html" method="post">里面。
  可以把method改为get。
  然后在$("#myLogin").click(function(e)中的
   e.preventDefault();后面添加return(或者把 e.preventDefault();直接删除),
   就可以发现可以直接由login.html跳转到index.html。 

  (2)把submit改为button试试。这样就没有submit的默认事件了。
6. add操作的时候会从MYSQL读取数据进行整体table的刷新。
   delete和uopdate操作的时候,为了减小开销,并没有从MYSQL读取数据进行整体table的刷新,
   而是从form表单读取数据刷新了修改的一行。由于没有使用从MYSQL中读取的数据刷新,
   页面看起来好像没刷新一样,但事实上更改的row已经刷新了,只是在前端操作的。为了减小开销的缘故。
7. 解决了前端index.html初始化加载时候不能从MYSQL读取数据的几种情况(包括初始化加载第一次点击选项卡切换的时候)

批改3:问题
1. xss只对script标签进行了过滤,但没有进行转义。正常情况下应该转义为&gt;script&lt;
2. 老师视频中演示edit按钮不能刷新修改行,但自己的是可以的。
3. 在每一行都应该添加edit和add等按钮。