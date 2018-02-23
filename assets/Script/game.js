cc.Class({
    extends: cc.Component,

    properties: {
        bomb:{
            default:null,
            type:cc.Prefab
        },
        coin:{
            default:null,
            type:cc.Prefab
        },
        playerY:-269,
        leftx1:-420,// -960/2 + 50 ,左边墙的边缘
        rightx1:420,//   960/2 - 50 ,右边墙的边缘
        movedis:10,//每次移动距离
        runTime1:0.1//移动时间
    },

    // use this for initialization
    onLoad: function () {
        this.init();
        this.updateObject();
    },
    
    updateObject:function(){
        this.schedule(this.updateBomb,1.5);//1s update a bomb
        this.schedule(this.updateCoin,1);//1s update a coin
    },

    init: function(){
        var self = this;
        // 添加键盘事件监听器
        var listener = {
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                //37 left   39 right  65 a  68 dcc
                switch(keyCode){
                    case 37:
                        if(self.stop("left",self.node.getChildByName("player").x)){
                            self.moveDistance(1);
                        }
                        break;
                    case 39:
                        if(self.stop("right",self.node.getChildByName("player").x)){
                            self.moveDistance(2);
                        }
                        break;
                    case 65:
                        if(self.stop("left",self.node.getChildByName("player").x)){
                            self.moveDistance(1);
                        }
                        break;
                    case 68:
                        if(self.stop("right",self.node.getChildByName("player").x)){
                            self.moveDistance(2);
                        }
                        break;
                    default:
                        break;
                }
            },
            onKeyReleased: function (keyCode, event) {
                
            }
        }
        // 绑定键盘事件
        cc.eventManager.addListener(listener, this.node);
        
    },
    //根据type决定左移还是右移
    moveDistance:function(type){
        if(type == 1){
            var tempx = this.node.getChildByName("player").x - this.movedis;
            var action = cc.moveTo(this.runTime1,cc.p(tempx,this.playerY));
            this.node.getChildByName("player").runAction(action);
        }else if(type == 2){
            var tempx1 = this.node.getChildByName("player").x + this.movedis;
            var action1 = cc.moveTo(this.runTime1,cc.p(tempx1,this.playerY));
            this.node.getChildByName("player").runAction(action1);
        }
    },
    
    //判断是否碰壁
    stop:function(type,distance){
        if(type == "left"){
            cc.log("left====="+this.leftx1)
            if(distance <= this.leftx1){
                return false;
            }
        }else if(type == "right"){
            if(distance >= this.rightx1){
                return false;
            }
        }
        return true;
    },

    callback: function(event) {
        var button = event.detail;
        cc.log(button);
    },
    
    updateBomb:function(){
        this.newBomb();
    },

    updateCoin:function(){
        this.newCoin();
    },

    newBomb:function(){
        // 使用给定的模板在场景中生成一个新节点
        var newBomb = cc.instantiate(this.bomb);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newBomb,0);
        // 为newBomb设置一个随机位置
        newBomb.setPosition(this.getNewStarPosition());
        var moveto = cc.moveTo(3.8, cc.p(newBomb.getPositionX(), - this.node.height/2 - 250));
        var finish = cc.moveTo(3.8, cc.p(newBomb.getPositionX(), - this.node.height/2 - 50));
        var myAction = cc.sequence(moveto, finish);
        newBomb.runAction(myAction);
    },
    
    newCoin:function(){
        // 使用给定的模板在场景中生成一个新节点
        var newCoin = cc.instantiate(this.coin);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newCoin,0);
        // 为newCoin设置一个随机位置
        newCoin.setPosition(this.getNewStarPosition());
        var moveto = cc.moveTo(5.8, cc.p(newCoin.getPositionX(), - this.node.height/2 - 250));
        var finish = cc.moveTo(3.8, cc.p(newCoin.getPositionX(), - this.node.height/2 - 50));
        var myAction = cc.sequence(moveto, finish);
        newCoin.runAction(myAction);
    },
    //动态生成坐标
    getNewStarPosition: function () {
        // 随机得到一个物品的 y 坐标
        var randX = 460 - 2 * cc.random0To1() * 460;
        //var randX = 100;
        // 根据屏幕宽度，随机得到一个物品 x 坐标
        var randY = this.node.height/2 + 100;
        // 返回坐标
        return cc.p(randX, randY);
    },

});
