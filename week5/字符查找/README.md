* 遍历用for循环
* 键值对  Object,keys
* 统计出现的次数,记录下来,比较,并记录每一个出现的位置,打印输出
* 数组的特殊性体现在，它的键名是按次序排列的一组整数（0，1，2…）
```
var arr = ['a', 'b', 'c'];
Object.keys(arr)
// ["0", "1", "2"]
```
1. 遍历,找到各个字符出现的次数
2. 比较出现的次数,找到最大的次数
3. 找到最大的次数对应的值
4. 找到这个值对应的位置
5. 不只是找到,还要记录下来

* map方法
map方法接受一个函数作为参数。该函数调用时，map方法会将其传入三个参数，分别是当前成员、当前位置和数组本身。
```
[1, 2, 3].map(function(elem, index, arr) {
  return elem * index;
});
// [0, 2, 6]
```
上面代码中，map方法的回调函数的三个参数之中，elem为当前成员的值，index为当前成员的位置，arr为原数组（[1, 2, 3]）
* forEach方法
forEach方法的参数与map方法一致，也是一个函数，数组的所有成员会依次执行该函数。它接受三个参数，分别是当前位置的值、当前位置的编号和整个数组。
```
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9
这样写与上面map方法中
[2, 5, 9].forEach(function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
});
是一样的。
```
不要函数名log也是可以的:
```
[2, 5, 9].forEach(function(element, index, array) {
  console.log('[' + index + '] = ' + element);
});
```
可以只带2个参数:
```
[2, 5, 9].forEach(function(element, index) {
  console.log('[' + index + '] = ' + element);
});
```
如果想继续删除index参数的话,需要把函数体内对index参数的引用也删除:
```
[2, 5, 9].forEach(function(element) {
  console.log('['+'] = ' + element);
});
```
* 开始本来想用三维数组依次记录出现的次数,数值,在arr数组中的位置。但不如用2个数组分别来记录。
还有就是用对象存储数值,用字符串存储。
* 数组本质上是对象的一种，所以我们可以为数组添加属性，但是这不影响length属性的值。
```
//键为非整数
var a = [];
a['p'] = 'abc';
a;  // []
a['p']   //'abc'
//键为非整数
a[2.1]='q'
a;  // []
a[2.1]     //'q'
//键为非整数
a[1]='p'
a //[undefined × 1, "p"]
a[1]  //"p"
```
如果为数组添加了非整数属性。就不能再用for(var i=0;i<arr.length,i++)来遍历数组arr。1.i只能是整数 2.length也只能是整数属性对应的值?
只能够用for(i in arr){arr[i]}的形似。

*问答区代码的含义
```
arr.forEach(function(value, index) {

        if (count[value]) { //判断是否相同如何理解这句IF一般IF不是都有个对比吗例如x >y 或是0 和1  //count["a"]

            count[value]++; //找到相同后增加  //count["a"]=3  

            add[value] += "," + index; //记录位置并赋给当前字符

        } else {  //下面相当于初始化,因为count[value]最开始是没有赋值的。这样是NaN还是undefined?

            count[value] = 1;  //count["a"]=1

            add[value] = index; //add["a] = 0;

        }

    });
```

```
var arr = ["a", "x", "b", "d", "m", "a", "k", "m", "p","p", "j", "a"];
var count = [];
var add = {};
arr.forEach(function(value, index) {
 console.log(count[value]);
})
```
在arr.forEach()内部打印是undefined。在arr.forEach()外部打印是报错:Uncaught ReferenceError: value is not defined

```
var arr = ["a"];
var count = [];
var add = {};
arr.forEach(function(value, index) {
    if(count[value])
    {
        console.log(count[value]);
    }
    else
    {
        console.log(count[value]);
        count[value] = 1;  
    }
})
```
这样只会打印undefined
* 上面还涉及到if的条件
http://javascript.ruanyifeng.com/grammar/basic.html#toc8

if (expression)
  statement;

if结构先判断一个表达式的布尔值，然后根据布尔值的真伪，执行不同的语句。

下面就涉及到布尔值的true和false。这个控制着上面的程序流程。
''空字符串对应的布尔值是false
undefined对应的布尔值是false
空数组（[]）和空对象（{}）对应的布尔值，都是true。

* switch 最后的default后没有break语句
* 几个打印函数
1. alert()
2.console系列
console.log()    console.warn()  console.error()  console.info()
3.document.write()
* 数组属于一种特殊的对象。
typeof运算符会返回数组的类型是object。
数组的特殊性体现在，它的键名是按次序排列的一组整数（0，1，2…）。
var arr = ['a', 'b', 'c'];
Object.keys(arr)
// ["0", "1", "2"]
* 对象的键名(属性)对应着键值
* 复合运算符+=不能分开写为+ = 
* JS代码也可以先在console中调试
* indexOf()
indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。
indexOf方法还可以接受第二个参数，表示搜索的开始位置。
这个方法可以判断某个元素是否属于数组。并且可以给出第一次出现的位置。
* lastIndexOf()
lastIndexOf方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。
这个方法也可以判断某个元素是否属于数组。并且可以给出最后一次出现的位置。
* in运算符
检查某个键名是否存在的运算符in，适用于对象，也适用于数组。
* for…in 循环和数组的遍历
for...in循环不仅可以遍历对象，也可以遍历数组，毕竟数组只是一种特殊对象。
for...in不仅会遍历数组所有的数字键，还会遍历非数字键。
```
var a = [1, 2, 3];
a.foo = true;
for (var key in a) {
  console.log(key);
}
// 0
// 1
// 2
// foo
```
上面代码在遍历数组时，也遍历到了非整数键foo。所以，不推荐使用for...in遍历数组。
数组的遍历可以考虑使用for循环或while循环。
* for循环只能遍历数组的数字键吗?
问了一下,老师说当i是非数字时也可以遍历数组的非数字键。
* 访问对象键值
```
var o = {
  p: 'Hello World'
};

o.p // "Hello World"
o['p'] // "Hello World"
```
1. 上面代码分别采用点运算符和方括号运算符，读取属性p。
2. 请注意，如果使用方括号运算符，键名必须放在引号里面，否则会被当作变量处理。但是，数字键可以不加引号，因为会被当作字符串处理。
```
var o = {
  0.7: 'Hello World'
};

o['0.7'] // "Hello World"
o[0.7] // "Hello World"
```
3. 方括号运算符内部可以使用表达式。
4. 数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符。
* 访问对象属性(键名)
Object.keys方法。
```
var o = {
  key1: 1,
  key2: 2
};
Object.keys(o);
// ['key1', 'key2']
```
* 批改
要考虑多个字母出现次数最多的情况。