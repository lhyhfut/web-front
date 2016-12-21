function findChar() {
    // var arr = ["a", "x", "b", "d", "m", "a", "k", "m", "p", "p", "j", "a"];
    var arr = ["a", "x", "b", "m", "m", "a", "k", "m", "p", "p", "j", "a"];
    var count = [];
    var temp = [];
    var position = {};
    var i = 0,
        j = 0;
    //记录出现次数和出现的位置
    for (i = 0; i < arr.length; i++) {
        temp = arr.slice(0, i);
        //不要重复统计,与之前循环元素不相同的时候再进行遍历
        //否则初始化会置位,循环计数也会导致position错乱
        if (temp.indexOf(arr[i]) < 0) {
            // 最新的a[i]之前没有出现过,若出现过就不执行,不重复统计了
            //初始化和下面的循环计数隔开
            count[arr[i]] = 1;
            position[arr[i]] = i;
            for (j = i + 1; j < arr.length; j++) {
                if (arr[i] === arr[j]) {
                    count[arr[i]]++;
                    position[arr[i]] += "," + j;
                }
            }
        }
    }

    //寻找出现次数最多的字符
    var max = 0;
    //考虑多个字母出现次数最多的情况
    var maxVal = [];

    for (var d in count) //这里不能再用for循环,因为count中的属性不是整数,而是字符
    {
        if (count[d] >= max) {
            max = count[d];
            maxVal.push(d);
        }
    }
    //打印出现次数最多的元素以及出现的位置
    for (d in maxVal) {
        console.log('出现次数最多的元素', maxVal[d]);
        console.log('出现的位置', position[maxVal[d]]);
    }

}

findChar();
