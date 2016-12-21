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
4. 本次作业是在week10-百度首页第六更fis3 的基础之上修改得来。
(1)文件监听使用fis3 release -w即可
如果使用node 6.0, 会有DeprecationWarning: process.EventEmitter is deprecated. Use require('events') instead.
报错。这可能是fis3的问题,不影响继续调试
(2) 浏览器自动刷新使用fis3 release -wL即可
(3)修正了week10中fis3不能找到seajs,use使用的lunarCalendar.js的问题。
(4)使用单例模式对index.js中的代码进行了重构。

问题:
1. fis3和seajs搭配使用的原理还不是很清楚,暂时只是能够使用不出错。
但fis3到底是如何解析seajs所依赖模块以及使用seajs的模块的呢?还请老师解答谢谢!




