1. 本次作业使用的node版本node-v  v6.0.0
                                        fis版本  v3.4.24
2. 需要安装一些fis3插件。已经本地安装。
```
"fis-optimizer-html-minifier"
"fis3-hook-cmd"
"fis3-postpackager-loader"
```
3. 使用fis3 release发布项目。
然后fis3 server start会自动跳转到http://127.0.0.1:8080/  
有时候第一次跳转到页面不能正常显示,刷新即可。
4. 本次作业是在week7-百度首页第五更jquery 的基础之上修改得来。
较上次有以下修改:
(1)解决了服务器环境下点击页面个人信息选项卡不能够响应的问题。需把index.js中
tabClassName等变量名在使用的时候加单引号。jquery-3.1.0.js在服务器下使用的时候
需要这样。
(2)使用encodeURIComponent()和decodeURIComponent()对cookie中的特殊字符进行处理,
解决了服务器下cookie特殊字符有误导致背景图片在刷新页面的时候不能正确加载的问题。
(3)index.js中对baodulogo的图片位置进行了__uri()处理。解决在给png打md5的时候找不到
相应资源的问题。
(4)fis-conf.js中是fis的一些配置:
   * 对js,css,png格式的文件打md5
   * seajs方面的处理。
   由于作业只是部分用到了seajs。所以把lunarCalendar.js,jquery.js等用到了sea.js的部分
   放在了seajs文件夹。剩余的包括sea.js在内的没用到sea.js的部分放在了js文件夹。
   在配置的时候只对seajs文件夹中的js文件定义CMD规范。打包处理等
   * 对html,js,css,图片资源等的压缩处理
(6)文件监听使用fis3 release -w即可
如果使用node 6.0, 会有DeprecationWarning: process.EventEmitter is deprecated. Use require('events') instead.
报错。这可能是fis3的问题,不影响继续调试
(7) 浏览器自动刷新使用fis3 release -wL即可

问题:
1. 没有对jpg格式打md5,因为这样以后就找不到背景图片了。尝试用__uri()去解决(上面已经用这个解决了png资源的问题),
但失败。可能因为背景图片在index.js中字符串中使用了变量:
'background': "url(images/bg" + (m + 1) + ".jpg)"
修改为:
var bgPic = __uri("url(images/bg" + (m + 1) + ".jpg)");
'background': bgPic,

在chrome——console中还是会提示找不到 bg2.jpg, 这个报错没有加md5。可能fis3
没有对有变量这种情况加处理。
2. seajs的2个文件seajs目录中的jquery.js和lunarCalendar.js也是上述问题。
打了md5以后还是提示找不到lunarCalendar.js。
在index.html的行间javascript中改为:
var baseURL = __uri("./seajs/");
base: baseURL,  还是不行。

还请老师解答谢谢!



