cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        this.node.getChildByName("Play Button").on('click',this.callback,this);
    },

    callback: function(event){
        // var button = event.detail;
        // button.enabled = false;
        // this.setHide();
        cc.director.loadScene("game");
    },
    
    setHide: function(){
        this.node.opacity = 0;
    }
    
});
