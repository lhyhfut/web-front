var Helloworld = cc.Layer.extend({
    firstX:null,
    firstY:null,
    cardArr:null,
    score:0,
    scoreLabel:null,
    gameOverLayer:null,
    gameWinLayer:null,

    init:function () {
        this._super();

        var size=cc.winSize;
        var react = new cc.DrawNode();//用于绘制一些图形
        react.drawRect(cc.p(0,0),cc.p(800,450),cc.color(180, 170, 160, 255),0,cc.color(255,255,255,255));
        this.addChild(react);

        // 设置单点触摸
        // 创建一个事件监听器 OneByOne 为单点触摸
        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,                        // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。

            onTouchBegan:function (touch, event) {
                var touchPoint = touch.getLocation();
                self.firstX = touchPoint.x;
                self.firstY = touchPoint.y;

                return true;
            },

            onTouchEnded:function (touch, event) {
                var touchPoint = touch.getLocation();
                var offsetX = self.firstX - touchPoint.x;
                var offsetY = self.firstY - touchPoint.y;

                if(Math.abs(offsetX) > Math.abs(offsetY))
                {
                    if(offsetX > 5)
                    {
                        self.doLeft();
                        self.doCheckGameOver();
                        self.setScore(self.score);
                    }
                    else if(offsetX < -5)
                    {
                        self.doRight();
                        self.doCheckGameOver();
                        self.setScore(self.score);
                    }
                }
                else
                {
                    if(offsetY > 5)
                    {
                        self.doDown();
                        self.doCheckGameOver();
                        self.setScore(self.score);
                    }
                    else if(offsetY < -5)
                    {
                        self.doUp();
                        self.doCheckGameOver();
                        self.setScore(self.score);
                    }
                }
            }
        });
        cc.eventManager.addListener(listener, this);



        // 背景层->设置颜色
        var lazyLayer = cc.LayerColor.create(new cc.Color(180, 170, 160, 255) , null, null);
        this.addChild(lazyLayer);

        // 显示分数
        var label = cc.LabelTTF.create("Score : ", "Arial", 20);
        label.setAnchorPoint(0,0);
        label.setPosition(size.width/2 - 50, size.height-50);
        this.addChild(label);
        this.scoreLabel = cc.LabelTTF.create("0", "Arial", 20);
        this.scoreLabel.setAnchorPoint(0,0);
        this.scoreLabel.setPosition(size.width/2 + 20, size.height-50);
        this.addChild(this.scoreLabel);

        // 创建卡片数组
        this.cardArr = new Array(4);
        for(var i=0; i<4; i++)
        {
            this.cardArr[i] = new Array(4);
        }

        // 初始化卡片数组
        this.createCards(size);

        // 随机生成两个数字
        this.autoCreateCardNumber();
        this.autoCreateCardNumber();

        // 打开触摸
        //this.setTouchEnabled(true);
        return true;
    },

    // 向上***************************************
    doUp:function(){
        var isdo = false;
        for (var x=0; x<4; ++x)
        {
            for (var y=3; y>=0; --y)
            {
                for (var y1=y-1; y1>=0; --y1)
                {
                    if (this.cardArr[x][y1].getNumber() > 0)
                    {
                        if (this.cardArr[x][y].getNumber() <= 0)
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y1].getNumber());
                            this.cardArr[x][y1].setNumber(0);
                            ++y;
                            isdo = true;
                        }
                        else if(this.cardArr[x][y].getNumber() == this.cardArr[x][y1].getNumber())
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber()*2);
                            this.cardArr[x][y1].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  // increase score
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    // 向下***************************************
    doDown:function() {
        var isdo = false;
        for (var x=0; x<4; ++x)
        {
            for (var y=0; y<4; ++y)
            {
                for (var y1=y+1; y1<4; ++y1)
                {
                    if (this.cardArr[x][y1].getNumber() > 0)
                    {
                        if (this.cardArr[x][y].getNumber() <= 0)
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y1].getNumber());
                            this.cardArr[x][y1].setNumber(0);
                            --y;
                            isdo = true;
                        }
                        else if(this.cardArr[x][y].getNumber() == this.cardArr[x][y1].getNumber())
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber()*2);
                            this.cardArr[x][y1].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  // increase score
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    // 向左***************************************
    doLeft:function() {
        var isdo = false;
        for (var y=0; y<4; ++y)
        {
            for(var x=0; x<4; ++x)
            {
                for(var x1=x+1; x1<4; ++x1)
                {
                    if(this.cardArr[x1][y].getNumber() > 0)
                    {
                        if(this.cardArr[x][y].getNumber() <= 0)
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x1][y].getNumber());
                            this.cardArr[x1][y].setNumber(0);
                            --x;
                            isdo = true;
                        }
                        else if(this.cardArr[x][y].getNumber() == this.cardArr[x1][y].getNumber())
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber()*2);
                            this.cardArr[x1][y].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  // increase score
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    // 向右***************************************
    doRight:function() {
        var isdo = false;
        for (var y = 0; y < 4; ++y)
        {
            for (var x = 3; x >= 0; --x)
            {
                for (var x1 = x - 1; x1 >= 0; --x1)
                {
                    if (this.cardArr[x1][y].getNumber() > 0)
                    {
                        if (this.cardArr[x][y].getNumber() <= 0)
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x1][y].getNumber());
                            this.cardArr[x1][y].setNumber(0);
                            ++x;
                            isdo = true;
                        }else if(this.cardArr[x][y].getNumber() == this.cardArr[x1][y].getNumber())
                        {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber()*2);
                            this.cardArr[x1][y].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  // increase score
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    // 初始化卡片数组*******************************
    createCards:function(size)
    {
        var unitSize = (size.height - 80)/4;
        for(var i=0; i<4; i++)
        {
            for(var j=0; j<4; j++)
            {
                var card = CardSprite.createCardSprite(0, unitSize, unitSize, unitSize*i + 210, unitSize*j + 30);
                this.cardArr[i][j] = card;
                this.addChild(card);
            }
        }
    },
    // 随机生成新的2或4的卡片************************
    autoCreateCardNumber:function()
    {
        while(1)
        {
            var i = Math.floor(Math.random()*4);  // generate a number between 0 and 3
            var j = Math.floor(Math.random()*4);

            if (this.cardArr[i][j].getNumber() == 0)
            {
                this.cardArr[i][j].setNumber(Math.floor(Math.random()*10) < 1 ? 4 : 2);
                break;
            }

            if (!this.shouldCreateCardNumber())
            {
                break;
            }
        }
    },
    // 判断是否应该自动生成卡片数字******************
    shouldCreateCardNumber:function()
    {
        var should = false;
        for(var i=0; i<4; ++i)
        {
            for(var j=0; j<4; ++j)
            {
                if (this.cardArr[i][j].getNumber() == 0)
                {
                    should = true;
                    break;
                }
            }
        }
        return should;
    },
    // 判断游戏是否结束*******************************
    doCheckGameOver:function()
    {
        var size=cc.winSize;

        var isGameOver = true;
        for(var y=0; y<4; ++y)
        {
            for(var x=0; x<4; ++x)
            {
                if(this.cardArr[x][y].getNumber() == 0 ||
                    (x>0&&(this.cardArr[x][y].getNumber() == this.cardArr[x-1][y].getNumber())) ||
                    (x<3&&(this.cardArr[x][y].getNumber() == this.cardArr[x+1][y].getNumber())) ||
                    (y>0&&(this.cardArr[x][y].getNumber() == this.cardArr[x][y-1].getNumber())) ||
                    (y<3&&(this.cardArr[x][y].getNumber() == this.cardArr[x][y+1].getNumber())))
                {
                    isGameOver = false;
                }
            }
        }

        if (isGameOver)  // if the game is over
        {
            console.log("The Game Is Over!");
            this.gameOverLayer = cc.LayerColor.create(new cc.Color(0,0,0,100), null, null);
            var labelGameOver = cc.LabelTTF.create("Game Over!!!", "Arial", 60);
            labelGameOver.setPosition(size.width/2, size.height/2);
            this.gameOverLayer.addChild(labelGameOver);
            this.getParent().addChild(this.gameOverLayer, 1);

            this.scheduleOnce(this.removeGameOverLayer, 2);

        }
        else
        {
            if (this.shouldCreateCardNumber())
            {
                this.autoCreateCardNumber();
            }
        }

        if(this.isWin())   // if win
        {
            this.gameWinLayer = cc.LayerColor.create(new cc.Color(0,0,0,100), null, null);
            var labelGameWin = cc.LabelTTF.create("You Win!!!", "Arial", 60);
            labelGameWin.setPosition(size.width/2, size.height/2 + 30);
            var text = cc.LabelTTF.create("Your Score : ", "Arial", 30);
            text.setPosition(size.width/2 - 50, size.height/2 - 30);
            var labelScore = cc.LabelTTF.create(this.score, "Arial", 30);
            labelScore.setPosition(size.width/2 + 75, size.height/2 - 30);
            this.gameWinLayer.addChild(labelGameWin);
            this.gameWinLayer.addChild(text);
            this.gameWinLayer.addChild(labelScore);
            this.getParent().addChild(this.gameWinLayer, 1);

            this.scheduleOnce(this.removeGameWinLayer, 4);
        }
    },
    // 判断是否胜利
    isWin:function()
    {
        var Win = false;
        for (var i=0; i<4; ++i)
        {
            for(var j=0; j<4; ++j)
            {
                if (this.cardArr[i][j].getNumber() == 2048)
                {
                    Win = true;
                    break;
                }
            }
        }
        return Win;
    },
    // 更新分数
    setScore:function(s)
    {
        this.scoreLabel.setString(s);
    },
    // 移除GameOverLayer
    removeGameOverLayer:function(dt)
    {
        this.gameOverLayer.removeFromParent();
        // cc.director.runScene(cc.TransitionFade.create(1, new HelloWorldScene()));
        cc.director.replaceScene(cc.TransitionFade.create(1, new HelloWorldScene()));
    },
    // 移除GameWinLayer
    removeGameWinLayer:function(dt)
    {
        this.gameWinLayer.removeFromParent();
        // cc.director.runScene(cc.TransitionFade.create(1, new HelloWorldScene()));  
        cc.director.replaceScene(cc.TransitionFade.create(1, new HelloWorldScene())); 
    }
});

// scene
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Helloworld();
        layer.init();
        this.addChild(layer);
    }
});



