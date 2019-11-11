require('Controllers.Home', 'Controller');
OGX.Controllers.Home = function(){
    construct(this, 'Controllers.Home');
    'use strict';    
    let stage, login, carousel;

    this.construct = function(){
        stage = app.getStage();
        login = stage.find(OGX.View.NAME, '#login');
        carousel = stage.find(OGX.Carousel.NAME, 'carousel'); 
    };   

    this.ux = function(__bool){     
        if(__bool){
            login.el.on('LOGIN', onLogin);
            carousel.el.on(OGX.Carousel.CHANGE,  playClick);
            carousel.el.on(this.touch.down, '.ogx_dots_item', playClick);
            carousel.el.on(this.touch.down, '.choice', function(){
                playClick();
                carousel.val($(this).data('panel'));                
            });
        }else{
            login.el.off('LOGIN', onLogin);
            carousel.el.off(OGX.Carousel.CHANGE,  playClick);
            carousel.el.off(this.touch.down, '.ogx_dots_item');
            carousel.el.off(this.touch.down, '.choice');
        }       
    }; 

    function onLogin(){
        //backend integration - skipped
        OGX.Audio.playSound('click.mp3', 1);    
        app.scope(['public', 'private']);
        app.goto('private/intro');
    }     

    function playClick(){		
        setTimeout(function(){
            OGX.Audio.playSound('click.mp3', 1);           
        }, 0);			
	}  
};