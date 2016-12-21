* week9说明
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



* week15说明
本周的作业在week14基础上修改得来。
1. 需开启xammp的mysql和apach
2. 切换到工程目录
    bash baidunews.sh
    即可运行
3. 作业说明
baidunews.sh中
    1. 先对依赖node和pm2进行检测
    2. 运行pm2 start app.js
    3. 对当前node的cpu占用率进行检测,如果大于当前设定的阈值80,则重启node
    pm2 restart all
    4. 如需停止进程。
    pm2 stop app.js即可。

批改1:
1. 目录名最好是英文。在批改视频的终端中中文路径出现了乱码
2. 确实应该把数据库的信息放在config.js中,老师修改了端口号。在代码中就找不到了
3. 老师没用pm2 stop app.js 
而是先找到node的pid, 例如55482(举个例子)
然后kill -9 55482(另外一个终端界面)
然后等到10s重启的时候,就会发现node的pid变了
4. pm2 logs能够显示本应该是node app.js出现的信息