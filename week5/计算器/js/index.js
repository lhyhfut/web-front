var num = 0,
    result = 0,
    numshow = "0";
// 状态变量
var operate = 0; //判断输入状态的标志 
var calcul = 0; //判断计算状态的标志 
var quit = 0; //防止重复按键的标志 

// 数字输入
function command(num) {
    var str = String(document.getElementById("numScreen1").value); //获得当前显示数据 
    str = (str != "0") ? ((operate == 0) ? str : "") : ""; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回空值; 
    str = str + String(num); //给当前值追加字符 
    document.getElementById("numScreen1").value = str; //刷新显示 
    operate = 0; //重置输入状态 
    quit = 0; //重置防止重复按键的标志 
}
// 双零输入
function dzero() {
    var str = String(document.getElementById("numScreen1").value);
    str = (str != "0") ? ((operate == 0) ? str + "00" : "0") : "0"; //如果当前值不是"0"，且状态为0，则返回当str+"00"，否则返回"0"; 
    document.getElementById("numScreen1").value = str;
    operate = 0;
}
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
// 删除键
function del() {
    var str = String(document.getElementById("numScreen1").value);
    str = (str != "0") ? str : "";
    str = str.substr(0, str.length - 1);
    str = (str != "") ? str : "0";
    document.getElementById("numScreen1").value = str;
}
//清除数据 
function clearscreen() {
    num = 0;
    result = 0;
    numshow = "0";
    document.getElementById("numScreen1").value = "0";
}
//加法 
function plus() {
    calculate(); //调用计算函数 
    operate = 1; //更改输入状态 
    calcul = 1; //更改计算状态为加 
}
//减法 
function minus() {
    calculate();
    operate = 1;
    calcul = 2;
}
//乘法 
function times() {
    calculate();
    operate = 1;
    calcul = 3;
}
//除法 
function divide() {
    calculate();
    operate = 1;
    calcul = 4;
}
//求余 
function persent() {
    calculate();
    operate = 1;
    calcul = 5;
}
//等于 
function equal() {
    calculate();
    operate = 1;
    num = 0;
    result = 0;
    numshow = "0";
}
// 计算
function calculate() {
    // Number比parseInt更严格
    numshow = Number(document.getElementById("numScreen1").value);
    if (num != 0 && quit != 1) { //判断前一个运算数是否为零以及防重复按键的状态 
        switch (calcul) { //判断要输入状态 
            case 1:
                result = parseFloat((num + numshow).toFixed(8));
                break; //计算"+" 
            case 2:
                result = parseFloat((num - numshow).toFixed(8));
                break; //计算"-" 
            case 3:
                result = parseFloat((num * numshow).toFixed(8));
                break;
            case 4:
                if (numshow != 0) {
                    result = parseFloat((num / numshow).toFixed(8));
                } else {
                    document.getElementById("note").innerHTML = "被除数不能为零！";
                    //不能一直显示,下面也有清空提示的函数
                    setTimeout(clearnote, 4000);
                }
                break;
            case 5:
                result = num % numshow;
                break;
            default:
                return;
        }
        quit = 1; //避免重复按键 
    } else {
        result = numshow;
    }
    numshow = String(result);
    document.getElementById("numScreen1").value = numshow;
    num = result; //存储当前值 
}

function clearnote() { //清空提示 
    document.getElementById("note").innerHTML = "";
}
