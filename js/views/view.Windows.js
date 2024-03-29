require('Views.Windows', 'View');
OGX.Views.Windows = function(__config){
    construct(this, 'Views.Windows');
	'use strict';
	var that = this;    

	//@Override
    this.construct = () => {  
        var wins = this.gather('Window');
        var t = 0;
        for(var i = 0; i < wins.length; i++){
            showWin(wins[i], t);     
            t += 1000;       
        }
    };    

    //@Override
    this.ux = (__bool) => {
        if(__bool){
            this.el.on(OGX.Window.CLOSED, function(__e, __window){
                setTimeout(() => {
                    that.find('Window', __window.id).show();
                }, 1000+Math.round(Math.random()*3000));
            });
        }else{
            this.el.off(OGX.Window.CLOSED);
        }
    };
     
    function showWin(__win, __t){       
        setTimeout(() => {
            __win.show();
        }, __t);     
    }
};