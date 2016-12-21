* 软件版本:
node 6.0,
gulp: 3.9.1,
gulp-less: 3.1.0
* 本次作业采用gulp+less对week4的作业进行了改进。
1. 在week4作业基础上添加了JS,处理了导航栏搜索框点击显示隐藏。及底部的
回到顶部按钮。
2. 把index.less分成了
base.less
header.less
pager.less
footer.less
然后在index.less中:
```
@import './base.less';   //页面的公共样式及一些'带参数混合'
@import './header.less';   //顶部
@import './pager.less';   //页面主体
@import './footer.less';  //底部加回到顶部按钮
```
3. gulpfile.js
会编译src文件夹中的index.less, 然后输出到css/index.css
4. 使用说明
终端切换到gulpfile.js所在目录, 输入`gulp`命令即可。

批改1:(已解决)
1. 变量:如字体大小, 颜色等单独放到一个文件(vars.less)中。
其实可以放在index.less最上面。但单独放在vars.less中是最合适的。
2. gulp对html和js也应该进行压缩。
使用gulp-htmlmin对index.html进行压缩
使用gulp-uglify对js文件进行压缩。

问题:尝试使用gulp-concat对js文件进行合并,把压缩后的index.js和jquery-3.1.0.js
合并为all.js,  在index.html中改引入index.js和jquery-3.1.0.js为all.js, 为何会报错
$ is not defined呢? 那合并后的文件应该怎么使用呢?




