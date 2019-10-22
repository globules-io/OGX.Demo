require('Controllers.Menu', 'Controller');
OGX.Controllers.Menu = function(){
    construct(this, 'Controllers.Menu');
    'use strict';
    var stage, win;

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
                win.el.off(OGX.Window.CLOSING, onClosing);
                win.hide();
                setTimeout(function(){
                    if(__data.hasOwnProperty('theater')){
                        stage.removeOverlay(false);
                        app.theater.show();
                    }else{                  
                        var url = 'private/object/'+__data.label.toLowerCase();
                        if(stage.url !== url){
                            app.goto(url);                           
                        }else{
                            stage.removeOverlay();
                        }   
                        win.el.on(OGX.Window.CLOSING, onClosing);         
                    }  
                }, 30);        
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
     
};