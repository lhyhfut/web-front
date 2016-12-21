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
   可以实现一行或者多行的删除。如果没有选择,也不会报错。只是一次数据查询失败。
6. edit提供数据更新功能。
   更新数据后:
   后台的的展示界面会刷新,
   数据库中数据也会刷新。

* 问题
1.使用jquery,在js文件中绑定提交按钮的click事件之后,input的required="required"属性在index.html页面中就不能校验了。
后来使用jQuery.Validate插件也不行。后来只能自己在JS文件中校验,不满足条件时候return false阻止表单提交才可以,这是怎么回事呢?

* 批改1
1.  删除时候弹出提示面板。
2. 分页加载
3. php公共文件
4. 传入文章类型,建立一个表格。

* 批改1修复记录
1. 完成了删除时候弹出提示面板。有确定,等待2个按钮。并附有相关的提示文字。
2. 完成了将php文件中相同部分封装成函数。简化了代码。
3. 完成了分页加载功能。前端向后端发page(页码)和pageItem(每页新闻数目)。 
  (1)page在发ajax的时候自增。MYSQL使用LIMIT查询。
  (2)page在选项卡点击事件中清零。
  (3)由于后端不需要分页加载,base.php中的公共函数前端就不适合使用,前端改为请求selectDataFront.php。
  (4)效果。现在仍然制作了`精选`和'百家' 2个选项卡。每个数据库15条新闻。
  pageItem=3,以每个page显示完全问条件,满足条件的滚轮滚动事件发生时发ajax请求。知道数据库数据查询完位置。
4. 关于使用一个数据库news。也尝试过按照老师所说的把标签当做类别来使用。但后来发现自己对newsid和后端index.html 
  的table页面的新闻编号index进行了映射。切由于数据库查询最要用到index。不能删除。如果想修改则改动量非常大。
  所以暂时没有修改,仍然使用2个数据库。请老师谅解,谢谢!

* 批改2
1. 后端index.html应该做一个权限控制。直接进入index.html则会跳转到login.html 
2. 对login.html应该对username和password进行cookie和session的存储。
3. php中连接数据库的部分应该放在一个单独的config.php文件中。现在的公共函数有待改进。
4. 后端index.html中在input中输入<script></script>111  等看看是否能够转义。貌似是test_input()的作用。
没想到这个借过来的函数会起到这个作用。


