* 在上周的简单计算器基础上完成
* 功能
1. 操作符:+,-*,/,%,tan,cot,cos,sin,acos,asin,atan,e^x,1/x,√,x^2,10^x,log,ln,π,
2. 基本运算1+2=
3. 同级连续运算:
    1+2+3+   
    1+2+3=  
    2*3*4
    ...
3. 非同级连续运算
    1+2*3=
    1+2*3*
    1+2*3+
    1+2*3√
4. 单目运算
    4√
    1+4√
    1+4√*3+
    1+4√*3=
    1+4√*3*+
5. 连续输入操作符
    2√√√√√√
    2=+/%*
6. 负数输入
7. 小数输入
8. 清零
* 测试用例
    在上面功能中已经说明
* 兼容性
1. ie6中console会报错,js代码中添加了处理
2. css样式的处理
* 思路
1. 整个的计算过程都是对inputStack[]进行操作。在输入过程中把操作符和操作数压栈存储。在计算过程中取出计算。
用计算结果来更新计算过程中使用过的操作符和操作数。
2. calculate()用来进行栈长度及优先级判断,来决定运算的顺序。
如果遇到+,-,=或者单目操作符,则立即计算结果,
如果遇到*,%,/等优先级较高的双目操作符,则停止本次运算,等待下一个操作数
3. calLeftToRight()是个基本的运算函数。解决最基本的2个操作数和1个操作符的计算(双目操作符)
以及1个操作数和1个操作符的计算(单目操作符)。
4. 一共有4类操作符:
=
同级双目操作符
不同级级双目操作符
单目操作符
程序的逻辑按照这个分类。
5. 递归思想
```
while (inputStack.length >= 4) //有2对(操作符+操作数),说明没有计算完
{
    calLeftToRight();
}
```
每次计算一定要把能够把计算的计算出结果,更新inputStack[],否则下次计算从inputStack[]中取操作数和操作符
的时候就会产生错误。能够进行连续运算就在于上面这个while循环。保证了每次都能计算出最终结果。然后把结果
压栈,等待下一次计算。
6. inputStack.length计算的最短长度为2(单目操作符),4(双目操作符),因为每次在输入操作符的时候才进行压栈,每次压入
1个操作符和1个操作数,因为只有输入操作符的时候才能证明操作数已经输入完毕。
7. 连续输入操作数,在一起显示
8. 连续输入操作符,会用新的操作符代替旧的操作符(=及双目操作符),或者直接运算(单目操作符)
* 注意事项
1. 程序中保留了console.log(inputStack);在控制台可提供过inputStack来观测整个计算过程
2. 负数的处理。只在最初的输入可以进行。
    负号有2个作用:表征负数,减法。
    在计算过程中为了消除反复输入负号而引起歧义。只是当减法处理。
    在计算的开始可以直接输入负号来获取负数。
批改1:
  1.\<script>放在\</body>之前
2.事件绑定不再在html中进行,放在JS中。
a.\<script>放在\</body>之前
b.document.getElementById("funcLog").onclick = funcLog;绑定要在funcLog()定义之后
c. command数字输入函数。在html代码中绑定可以带参数,但是在js代码中绑定不能够带参数,自己的采取了稍微费劲一些的处理。
3.被除数为0等的时候,input显示NaN一段时间后就恢复显示0,不再一致显示NaN,这样就不需要手动清屏了
批改2:
解答:事件带参数,在html代码中加上:
```
<button id="testBtn">test<button>
<script type="text/javascript">
window.onload = function(){
    var testBtn = document.getElementById("testBtn");
    var a = {name:"peter",age:20};
    //默认不带参数
    //testBtn.onclick = myTest;
    //如果传递参数的情况下,可以使用bind,apply,call 
    testBtn.onclick = myTest.bind(a);
}
function myTest(){  //这个函数有个默认的参数e,一般是不写的
    console.log(event);
    console.log(this);
    console.log(arguments);
}
在chrome的console中可以看console.log(this);
<script>
```
改为
```
document.getElementById("command0").onclick = command.bind(0);
document.getElementById("command1").onclick = command.bind(1);
document.getElementById("command2").onclick = command.bind(2);
document.getElementById("command3").onclick = command.bind(3);
document.getElementById("command4").onclick = command.bind(4);
document.getElementById("command5").onclick = command.bind(5);
document.getElementById("command6").onclick = command.bind(6);
document.getElementById("command7").onclick = command.bind(7);
document.getElementById("command8").onclick = command.bind(8);
document.getElementById("command9").onclick = command.bind(9);
```
后来在输入数字键的时候input中显示的是object mouseEvent.
以前写为
```
document.getElementById("command0").onclick = command.(0);
...
```
的时候刚刷新页面input就显示0123456789。然后点击就没效果了。因为这些代码相当于在
document.ready中。
改为
```
document.getElementById("command0").onclick = function () {
    command(0);
}
```
这样初始化的时候会调用这个function,command会加载到onclick事件中,但并不会执行,点击的时候才会执行。
1. 建议在输入框内显示边界检查的报错
