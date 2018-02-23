var Bus = require("bus");
var tmpscore = require("number");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        this.node.getChildByName("retry").on('click',this.callback,this);
        this.tscore = cc.find("Canvas/number").getComponent(tmpscore);
        this.tscore.setScore(Bus.score);
    },

    callback:function(){
        cc.director.loadScene("game");
        Bus.score = 0;
    }
});
