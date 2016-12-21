* 压缩屏幕时,点击导航栏右上角按钮不能出现下拉菜单:
需要引入jquery.min.js和bootstrap.min.js
* 点击正文左侧边栏链接不能跳转到正文相应地方:
1. 引入bootstrap-responsive.min.css。在侧边栏和正文的<li>-><a>->href中添加相应的id如#26等。
2. bootstrap-responsive.min.css必须放在bootstrap.min.css之前,否则会导致压缩屏幕的时候body等会
有padding的变化。得手动修补,非常麻烦,且效果不好。
* `To do list`
正文还没有对手机端做字体的media  query
* code标签的使用:
```
<code>  
    &lt;h1 class="nir"&gt;[content]&lt;/h1&gt;
    </code>
```