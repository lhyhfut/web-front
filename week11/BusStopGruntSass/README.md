* 软件版本
Sass 3.4.22 (Selective Steve)  
Compass 1.0.3 (Polaris)
* Gruntfile.js配置
1. 使用grunt-contrib-htmlmin对html进行压缩
2. 使用grunt-contrib-sass对./index.sass进行编译,并压缩生成的index.css
3. 使用grunt-contrib-watch监测sass任务,监测./index.scss的变化。
* 作业说明
1. 使用sass+grunt 
2. index.scss文件中
(1)变量部分定义了页面使用的颜色,字体大小
(2)混合@mixin displayFlex($content,$align){}定义了flex布局
(3).station用于整体布局,.bus-info用于设置具体显示内容。
(4)由于index.scss内容较少,并没有分模块。
* 使用说明
终端输入grunt命令,即可编译index.scss文件为index.css并压缩之。
然后即可查看页面显示。