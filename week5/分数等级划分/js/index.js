function calByIfElse(value) {
    var score = value;
    var level;
    if (score <= 100 && score > 90) {
        console.log("你的等级是", 1);
        level = 1;
    } else if (score <= 90 && score > 80) {
        console.log("你的等级是", 2);
        level = 2;
    } else if (score <= 80 && score > 70) {
        console.log("你的等级是", 3);
        level = 3;
    } else if (score <= 70 && score > 60) {
        console.log("你的等级是", 4);
        level = 4;
    } else if (score <= 60 && score > 50) {
        console.log("你的等级是", 5);
        level = 5;
    } else if (score <= 50 && score > 40) {
        console.log("你的等级是", 6);
        level = 6;
    } else if (score <= 40 && score > 30) {
        console.log("你的等级是", 7);
        level = 7;
    } else if (score <= 30 && score > 20) {
        console.log("你的等级是", 8);
        level = 8;
    } else if (score <= 20 && score > 10) {
        console.log("你的等级是", 9);
        level = 9;
    } else if (score <= 10 && score >= 0) { //有可能<0,但最后这个也不好使用else if
        console.log("你的等级是", 10);
        level = 10;
    }
    return level;
}

function calBySwitch(value) {
    var level;
    var score = value;
    switch (true) {
        case score <= 100 && score > 90:
            level = 1;
            console.log("你的等级是", 1);
            break;
        case score <= 90 && score > 80:
            level = 2;
            console.log("你的等级是", 2);
            break;
        case score <= 80 && score > 70:
            level = 3;
            console.log("你的等级是", 3);
            break;
        case score <= 70 && score > 60:
            level = 4;
            console.log("你的等级是", 4);
            break;
        case score <= 60 && score > 50:
            level = 5;
            console.log("你的等级是", 5);
            break;
        case score <= 50 && score > 40:
            level = 6;
            console.log("你的等级是", 6);
            break;
        case score <= 40 && score > 30:
            level = 7;
            console.log("你的等级是", 7);
            break;
        case score <= 30 && score > 20:
            level = 8;
            console.log("你的等级是", 8);
            break;
        case score <= 20 && score > 10:
            level = 9;
            console.log("你的等级是", 9);
            break;
        case score <= 10 && score >= 0:
            level = 10;
            console.log("你的等级是", 9);
            break;
        default:
            return;
    }
    return level;
}
