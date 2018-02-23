cc.Class({
    extends: cc.Component,

    properties: {
        number:0,
        //积分更新
        scores: {
            default: null,
            type: cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        // this.number = 0;
    },
    
    updateScore:function(){
        this.scores.string = this.number.toString();
    },
    
    setScore: function(tmpscore)
    {
        this.number += tmpscore;
    },
    
     // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.updateScore();
    },

});
