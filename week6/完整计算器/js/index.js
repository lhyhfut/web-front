//ie6下使用console会报错
if (typeof console === "undefined") {
    var console = { log: function(logMsg) {} };
}
var num = 0, //num是上一次保存的值,用作第一个操作数
    result = 0, //本次计算String(result)被赋值给了numshow用于input的显示,num = result用于存储num,下一次用作第一个操作数
    numshow = "0"; // input显示的值.从calculate()中减法(num - numshow)来看,numshow是当前输入显示的值,num是上一次保存的值
//运算符的优先级
var operatorLevel = {
        '=': 0,
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '%': 2,
        'tan': 3,
        'cot': 3,
        'cos': 3,
        'sin': 3,
        'acos': 3,
        'asin': 3,
        'atan': 3,
        'e^x': 3,
        '1/x': 3,
        '√': 3,
        'x^2': 3,
        '10^x': 3,
        'log': 3,
        'ln': 3,
        'π': 3
    }
    // 状态变量
var operate = 0; //判断输入状态的标志.在运算符及=号操作中为1,在数字及特殊符号输入操作中为0. 并作为后者的输入条件判定。
// 主要是把操作符和操作数的输入区分开来。防止干扰各自中的变量计算
var calcul = 0; //判断计算状态的标志,用于判断运算符,也就是运算类型
var quit = 0; //防止重复按键的标志。quit是为了防止2次输入运算符按键,造成重复调用calculate()进行计算
var inputStack = []; //用于存储读取输入,包含操作符和操作数
// 数字输入
function command(num) {
    var str = String(document.getElementById("numScreen1").value); //获得当前显示数据 
    str = (str != "0") ? ((operate == 0) ? str : "") : ""; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回空值;
    str = str + String(num); //给当前值追加字符 
    document.getElementById("numScreen1").value = str; //刷新显示 
    operate = 0; //重置输入状态 
    quit = 0; //重置防止重复按键的标志

}
document.getElementById("command0").onclick = function command0() {
    command(0);
}
document.getElementById("command1").onclick = function command1() {
    command(1);
}
document.getElementById("command2").onclick = function command2() {
    command(2);
}
document.getElementById("command3").onclick = function command3() {
    command(3);
}
document.getElementById("command4").onclick = function command4() {
    command(4);
}
document.getElementById("command5").onclick = function command5() {
    command(5);
}
document.getElementById("command6").onclick = function command6() {
    command(6);
}
document.getElementById("command7").onclick = function command7() {
    command(7);
}
document.getElementById("command8").onclick = function command8() {
    command(8);
}
document.getElementById("command9").onclick = function command9() {
    command(9);
}


// 双零输入
function dzero() {
    var str = String(document.getElementById("numScreen1").value);
    str = (str != "0") ? ((operate == 0) ? str + "00" : "0") : "0"; //如果当前值不是"0"，且状态为0，则返回当str+"00"，否则返回"0"; 
    document.getElementById("numScreen1").value = str;
    operate = 0;
}
document.getElementById("dzero").onclick = dzero;
// 小数点输入
function dot() {
    var str = String(document.getElementById("numScreen1").value);
    str = (str != "0") ? ((operate == 0) ? str : "0") : "0"; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回"0"; 
    for (i = 0; i <= str.length; i++) { //判断是否已经有一个点号 
        if (str.substr(i, 1) == ".") return false; //如果有则不再插入 
    }
    str = str + ".";
    document.getElementById("numScreen1").value = str;
    operate = 0;
}
document.getElementById("dot").onclick = dot;
// 删除键
function del() {
    var str = String(document.getElementById("numScreen1").value);
    str = (str != "0") ? str : "";
    str = str.substr(0, str.length - 1);
    str = (str != "") ? str : "0";
    document.getElementById("numScreen1").value = str;
}
document.getElementById("del").onclick = del;
//清除数据 
function clearscreen() {
    num = 0;
    result = 0;
    numshow = "0";
    document.getElementById("numScreen1").value = "0";
    //清除键清空栈
    inputStack = [];
}
document.getElementById("clearscreen").onclick = clearscreen;
//加法 
function plus() {
    calcul = 1; //更改计算状态为加

    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        //在计算前存入操作数,是numshow,用户输入->输入函数得到显示的值->calculate()中取到这个值计算.按下运算符键证明本次操作数输入完毕,可以进行压栈了。
        //压栈不能是num值。下面可以看到,num是上一次的计算结果。
        inputStack.push(numshow);
        inputStack.push('+');
        console.log(inputStack);
        calculate(); //调用计算函数
    } else //连续输入操作符(包含相同的操作符和不同的操作符)
    {
        //这句可以不写
        numshow = Number(document.getElementById("numScreen1").value);
        //如果连续输入相同的操作符,这一句就是用'+',代替'+',如果是不同的操作符,这句就是用'+'代替其它操作符,但操作数不变
        inputStack.splice(inputStack.length - 1, 1, '+');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    quit = 1;
    operate = 1; //更改输入状态 
}
document.getElementById("plus").onclick = plus;
//减法 
function minus() {
    calcul = 2;

    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('-');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, '-');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    quit = 1;
    operate = 1;
}
document.getElementById("minus").onclick = minus;
//乘法 
function times() {
    calcul = 3;

    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('*');
        console.log(inputStack);
        console.log(inputStack.length);
        //console.log(inputStack[inputStack.length-2]);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, '*');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    quit = 1;
    operate = 1;
}
document.getElementById("times").onclick = times;
//除法 
function divide() {
    calcul = 4;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('/');
        console.log(inputStack);

        calculate();
        quit = 1;
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, '/');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    quit = 1;
    operate = 1;
}
document.getElementById("divide").onclick = divide;
//求余 
function persent() {
    calcul = 5;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('%');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, '%');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    quit = 1;
    operate = 1;
}
document.getElementById("persent").onclick = persent;
//拓展函数
//正切
function funcTan() {
    calcul = 6;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('tan');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, 'tan');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcTan").onclick = funcTan;
//余切
function funcCot() {
    calcul = 7;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('cot');
        console.log(inputStack);

        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, 'cot');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcCot").onclick = funcCot;
//余弦
function funcCos() {
    calcul = 8;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('cos');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, 'cos');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcCos").onclick = funcCos;
//正弦
function funcSin() {
    calcul = 9;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('sin');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, 'sin');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcSin").onclick = funcSin;
//反余弦
function funcACos() {
    calcul = 10;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('acos');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, 'acos');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcACos").onclick = funcACos;
//反正弦
function funcASin() {
    calcul = 11;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('asin');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, 'asin');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcASin").onclick = funcASin;
//反正切
function funcATan() {
    calcul = 12;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('atan');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, 'atan');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcATan").onclick = funcATan;
//e的次幂
function funcEPowerX() {
    calcul = 13;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('e^x');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, 'e^x');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcEPowerX").onclick = funcEPowerX;
//倒数
function funcInverse() {
    calcul = 14;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('1/x');
        console.log(inputStack);

        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, '1/x');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcInverse").onclick = funcInverse;
//平方根
function radical() {
    calcul = 15;
    //单目运算符不需要quit锁止,可以连续输入操作符,反倒是锁止了以后没有command(num)让quit清零,连+-*/都无法输入了
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('√');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, '√');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("radical").onclick = radical;
//平方
function funcPower2() {
    calcul = 16;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('x^2');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, 'x^2');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcPower2").onclick = funcPower2;
//10的次幂
function func10powerX() {
    calcul = 17;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('10^x');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, '10^x');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("func10powerX").onclick = func10powerX;
//e为底的对数
function funcLog() {
    calcul = 18;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('log');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, 'log');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcLog").onclick = funcLog;
//10为底的对数
function funcLn() {
    calcul = 19;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('ln');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, 'ln');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcLn").onclick = funcLn;
//π
function funcPi() {
    calcul = 20;
    if (quit != 1) {
        //按下操作符时,操作数和操作符入栈
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.push(numshow);
        inputStack.push('π');
        console.log(inputStack);
        calculate();
    } else {
        numshow = Number(document.getElementById("numScreen1").value);
        inputStack.splice(inputStack.length - 1, 1, 'π');
        console.log(inputStack);
        calculate(); //调用计算函数
    }
    operate = 1;
}
document.getElementById("funcPi").onclick = funcPi;
//等于
function equal() {
    //由于=号下面会清栈,不用防止连续=号按键,不需要用quit锁止
    //先压栈,再计算calculate(),因为后者要用到inputStack[]中的值
    numshow = Number(document.getElementById("numScreen1").value);
    inputStack.push(numshow);
    inputStack.push('=');
    console.log(inputStack);
    calculate();
    operate = 1;
    num = 0;
    result = 0;
    numshow = "0";
    //等号键清空栈
    inputStack = [];
}
document.getElementById("equal").onclick = equal;
//栈长度及优先级判断
function calculate() {
    if (inputStack.length < 4) //1个操作数,1个操作符,不进行计算,只显示输入的操作数. 不过都是2个2个一存储。个数为2*n
    {
        var opRight = inputStack[inputStack.length - 1];
        if (operatorLevel[opRight] < 3) {
            document.getElementById("numScreen1").value = String(inputStack[inputStack.length - 2]);
        } else //单目运算符一次按键(1个操作数,1个操作符,inputStack.length=2)就可以产生结果
        {
            calLeftToRight();
        }
    } else //至少有2个操作数,因为操作数和操作符是成对出现,故也至少有2个操作符(这样才需要判断是否为同级运算)
    {
        var opLeft = inputStack[inputStack.length - 3];
        var opRight = inputStack[inputStack.length - 1]; //最后一个操作符可能为等号

        if (operatorLevel[opRight] > operatorLevel[opLeft]) //右边的运算符优先级>左边的运算符优先级,从右到左运算
        {
            if (operatorLevel[opRight] < 3) {
                //需要等待第三个操作数和第三个操作符(结束运算的符号),numScreen1维持显示上一个操作数二先不运算
                if (inputStack.length < 6) {
                    document.getElementById("numScreen1").value = String(inputStack[inputStack.length - 2]);
                }
            } else //单目运算符一次按键(1个操作数,1个操作符,inputStack.length=2)就可以产生结果,不需要等待第3个操作数
            {
                //单目运算立即计算出结果,还须等待下一个操作符再进行比较操作符优先级,不能直接计算出结果
                calLeftToRight();
            }
        } else //右边的运算符优先级小于或等于左边,则按默认的从左到右的运算顺序
        {
            //inputStack.length==4针对1+2+  1+2= 等这种同级运算
            //(opRight === '='&&inputStack.length>=6)针对1+2*3*  1+2*3= 这种非同级运算,在上一个if分支等待之后会进入这里
            if (((opRight === '=' || opRight === '+' || opRight === '-') && inputStack.length >= 6) || inputStack.length == 4) //=说明没有后续计算,+,-也意味着即使有后续计算但前面也可以全部计算完了
            {
                while (inputStack.length >= 4) //有2对(操作符+操作数),说明没有计算完
                {
                    calLeftToRight();
                }
            } else //有后续计算
            {
                if (operatorLevel[opRight] < 3) {
                    return;
                    //写为下面也可以,但有些冗余,直接return就可以了
                    //document.getElementById("numScreen1").value = String(inputStack[inputStack.length-2]);
                } else //单目运算符不需要后续计算,只需要立刻计算结果
                {
                    calLeftToRight();
                }
            }
        }
    }
}

/*
  运算基本单元:同级连续运算.
  把num和numshow转换为result,并在inputStack[]中把num,操作符,numshow更新为result
  输入:num = inputStack[inputStack.length-4]; numshow = inputStack[inputStack.length-2];
  输出:把result显示在numScreen1中.
*/
function calLeftToRight() {
    num = inputStack[inputStack.length - 4];
    numshow = inputStack[inputStack.length - 2];
    var opRight = inputStack[inputStack.length - 1];
    //双目运算符和单目运算符要分开处理,因为用的不是一组if条件
    if (operatorLevel[opRight] < 3) {
        if (inputStack[inputStack.length - 3] === "+") //可以用case
        {
            result = parseFloat((num + numshow).toFixed(8));
        } else if (inputStack[inputStack.length - 3] === "-") {
            result = parseFloat((num - numshow).toFixed(8));
        } else if (inputStack[inputStack.length - 3] === "*") {
            result = parseFloat((num * numshow).toFixed(8));
        } else if (inputStack[inputStack.length - 3] === "/") {
            if (numshow != 0) { //第二个操作数
                result = parseFloat((num / numshow).toFixed(8));
            } else {
                document.getElementById("note").innerHTML = "被除数不能为零！";
                result = NaN;
                //不能一直显示,下面也有清空提示的函数
                setTimeout(clearnote, 3000);
            }
        } else if (inputStack[inputStack.length - 3] === "%") {
            result = parseFloat((num % numshow).toFixed(8));
        }
    } else //单目运算
    {
        //拓展函数
        //正切
        if (inputStack[inputStack.length - 1] === "tan") {
            //由于无法手动输入精确的pi/2,这里不做边界检查,MATH.PI也不精确
            result = parseFloat((Math.tan(numshow * Math.PI/180)).toFixed(8));
        }
        //余切
        else if (inputStack[inputStack.length - 1] === "cot") {
            //只对0点进行边界检查
            if (numshow != 0) {
                result = parseFloat((1 / (Math.tan(numshow * Math.PI/180))).toFixed(8));
            } else {
                document.getElementById("note").innerHTML = "输入不能为0！";
                result = NaN;
                //不能一直显示,下面也有清空提示的函数
                setTimeout(clearnote, 3000);
            }
        }
        //余弦
        else if (inputStack[inputStack.length - 1] === "cos") {
            result = parseFloat((Math.cos(numshow * Math.PI/180)).toFixed(8));
        }
        //正弦
        else if (inputStack[inputStack.length - 1] === "sin") {
            result = parseFloat((Math.sin(numshow * Math.PI/180)).toFixed(8));
        }
        //反余弦
        else if (inputStack[inputStack.length - 1] === "acos") {
            if (numshow <= 1 && numshow >= -1) {
                result = parseFloat((Math.acos(numshow)).toFixed(8));
            } else {
                document.getElementById("note").innerHTML = "输入需在-1到1之间！";
                result = NaN;
                //不能一直显示,下面也有清空提示的函数
                setTimeout(clearnote, 3000);
            }
        }
        //反正弦
        else if (inputStack[inputStack.length - 1] === "asin") {
            if (numshow <= 1 && numshow >= -1) {
                result = parseFloat((Math.asin(numshow)).toFixed(8));
            } else {
                document.getElementById("note").innerHTML = "输入需在-1到1之间！";
                result = NaN;
                //不能一直显示,下面也有清空提示的函数
                setTimeout(clearnote, 3000);
            }
        }
        //反正切
        else if (inputStack[inputStack.length - 1] === "atan") {
            result = parseFloat((Math.atan(numshow)).toFixed(8));
        }
        //e的次幂
        else if (inputStack[inputStack.length - 1] === "e^x") {
            result = parseFloat(Math.pow(Math.E, numshow).toFixed(8));
        }
        //倒数
        else if (inputStack[inputStack.length - 1] === "1/x") {
            if (numshow != 0) { //第二个操作数
                result = parseFloat((1 / numshow).toFixed(8));
            } else {
                document.getElementById("note").innerHTML = "输入不能为零！";
                result = NaN;
                //不能一直显示,下面也有清空提示的函数
                setTimeout(clearnote, 3000);
            }
        }
        //平方根
        //单目运算符不需要的等待第3个操作数,位置是inputStack.length-1而非inputStack.length-3
        else if (inputStack[inputStack.length - 1] === "√") {
            if (numshow >= 0) {
                result = parseFloat((Math.sqrt(numshow)).toFixed(8));
            } else {
                document.getElementById("note").innerHTML = "根号内数值不能小于零！";
                result = NaN;
                //不能一直显示,下面也有清空提示的函数
                setTimeout(clearnote, 3000);
            }
        }
        //平方
        else if (inputStack[inputStack.length - 1] === "x^2") {
            result = parseFloat(Math.pow(numshow, 2).toFixed(8));
        }
        //10的次幂
        else if (inputStack[inputStack.length - 1] === "10^x") {
            result = parseFloat(Math.pow(10, numshow).toFixed(8));
        }
        //e为底的对数
        else if (inputStack[inputStack.length - 1] === "log") {
            if (numshow > 0) {
                result = parseFloat((Math.log(numshow)).toFixed(8));
            } else {
                document.getElementById("note").innerHTML = "log内数值不能小于或等于零！";
                result = NaN;
                //不能一直显示,下面也有清空提示的函数
                setTimeout(clearnote, 3000);
            }
        }
        //10为底的对数
        else if (inputStack[inputStack.length - 1] === "ln") {
            if (numshow > 0) {
                result = parseFloat((Math.log(numshow) / Math.LN10).toFixed(8));
            } else {
                document.getElementById("note").innerHTML = "log内数值不能小于或等于零！";
                result = NaN;
                //不能一直显示,下面也有清空提示的函数
                setTimeout(clearnote, 3000);
            }
        }
        //π
        else if (inputStack[inputStack.length - 1] === "π") {
            result = parseFloat((numshow * Math.PI).toFixed(8));
        }
    }


    document.getElementById("numScreen1").value = String(result);

    //把num,操作符,numshow更新为result,即把计算过程更新为计算结果,没有参与计算的不更新
    if (operatorLevel[opRight] < 3) {
        inputStack.splice(inputStack.length - 4, 3, result);
    } else //单目运算符需要用result替换numshow和单目运算符
    {
        inputStack.splice(inputStack.length - 2, 2);
        //需要重置quit,不然radical()里面在quit=1的时候是不压操作数的,连续求平方根就会出现问题
        quit = 0;

    }
    console.log(inputStack);
}


function clearnote() { //清空提示 
    document.getElementById("note").innerHTML = "";
    document.getElementById("numScreen1").value = '0';
}
