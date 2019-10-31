require('Controllers.Menu', 'Controller');
OGX.Controllers.Menu = function(){
    construct(this, 'Controllers.Menu');
    'use strict';
    let stage, win;

    //@Override
    this.construct = function(){
        stage = app.getStage();
        win = stage.find(OGX.Window.NAME, 'winmenu');  
    };
        
    //@Override
    this.ux = function(__bool){
        if(__bool){
            $('#bar').on(this.touch.down, '.bt', function(){
                stage.addOverlay({anim:OGX.Overlay.FADE, close_on_click:false});  
                win.show();
            });
            win.el.on(OGX.StackedTree.SELECT, function(__e, __data){  
                __e.stopImmediatePropagation();   
                //stop listening to window closing (from swipe or window icon)
                win.el.off(OGX.Window.CLOSING, onClosing);
                //hide the window then show the theater, pass data and window
                win.hide(null, onClosed, {data:__data, win:win});
            });
            win.el.on(OGX.Window.CLOSING, onClosing);
        }else{
            $('#bar').off(this.touch.down, '.bt');
            win.el.off(OGX.StackedTree.SELECT);
            win.el.off(OGX.Window.CLOSING, onClosing);
        }
    };
   
    function onClosing(){
       stage.removeOverlay();
    }

    //if it's a theater link, show theater, otherwise to go url if different
    function onClosed(__obj){
        if(__obj.data.hasOwnProperty('theater')){
            stage.removeOverlay(false);
            app.theater.show();
        }else{                  
            let url = 'private/object/'+__obj.data.label.toLowerCase();
            if(stage.url !== url){
                app.goto(url);                           
            }else{
                stage.removeOverlay();
            }   
            __obj.win.el.on(OGX.Window.CLOSING, onClosing);         
        }  
    }     
};