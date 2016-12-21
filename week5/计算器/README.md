* 操作数,操作符作为计算函数的参数
* if else/switch分支是否写完的问题。不写最后的else,都用else if,有些不太合适(正如switch中都用case,那么default到底应该怎么写)。如果把最后一项用else写,
恐怕又会混杂了其他的情况。汽车程序是不写最后的else, 直接else if到底。
用switch case的话,default中可以不写代码,就像有时候else{}中是空的一样。或者else{return}。
如果最后一个else或者default写的是最后一种情况,那么最好进行输入检查,否则就会像上面说的那样,最后一个else会参杂其他的情况。
1. 不写最后的else, 直接else if到底。对应switch也就是不要default分支了?
2. 把最后一项作为else或者default,执行体中用return
3. 最后一个用else/default,。但是把其他的情况考虑完备。不要让以外的情况进入最后的else分支。
* 减法要考虑减数和被减数的顺序。否则就用绝对值。
* 输入参数可以直接在函数中使用,不需要另外赋值
* 不要忘记返回值
* default中没有break
* col-md-4宽度是4个栅格
col-md-offset-2偏移量是2个栅格
* 参数是函数
```
function updateFunc(func,inputValue,output_result){
			var returnValue = func(inputValue);
}
在C语言中是没有这种形式的。并且可以把函数和参数分别传过来,在另一个函数中执行 
```
* 输入框暂时不能够识别空格。点击空格,会默认为分数0。添加input.value===" "判断就可以了。
* 标签的宽度和偏移量
<label for="Score" class="col-sm-offset-5 col-sm-4 control-label">
col-sm-offset-5配合下面展示面板的长度和偏移量正好使得label居中
* calByIfElse()和calBySwitch()中
可以直接用参数value,不需要var score = value;
* 行间样式的写法
* id和name
获取值的区别。
[HTML中id、name、class 区别](http://blog.csdn.net/ithomer/article/details/8080912)   
* 除了用Number()(calculate()中调用)把字符串转化为数字。比parseInt()严格一些。
还有String()(command()等输入函数中调用)把数字转化为字符串。
* 找到了document.getElementById("numScreen1").value不显示的原因
1. 前面用var  numScreenValue =  document.getElementById("numScreen1").value;然后就后面一直把numScreenValue作为左值。这是不起作用的。应该把document.getElementById("numScreen1").value作为左值
2. document.getElementById("numScreen1").innerHTML应该也是一样的道理
3. 看来DOM中的是值传递?不是引用传递?
问了一下。这里面不是这个传递的问题。这里面只是把value赋值给左边。但重新设置的话还是需要document.getElementById("numScreen1").value

无论是var  numScreenValue =  document.getElementById("numScreen1").value;
还是var numScreen1 = document.getElementById("numScreen1");然后再numScreen1.value都是不行的。
* 使用document.getElementById("numScreen1").innerHTML不能够刷新input内容
必须使用document.getElementById("numScreen1").value或者document.calculator.numScreen.value,前者是id后者是name
1. document.getElementById("numScreen1").innerHTML
2. document.getElementById("numScreen1").value
3. document.calculator.numScreen.value
三者之间的关系。

* 批改
1. 测试3.3*6   1.1+2.2计算结果不对。
(3.3*6).toFixed(8)
在乘法运算中加上toFixed(8)
2. 还需要在结果上parseFloat(),不然一直都是8位小数。
3. 连续运算还没有实现。