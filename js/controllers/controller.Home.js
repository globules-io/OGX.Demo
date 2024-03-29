require('Controllers.Home', 'Controller');
OGX.Controllers.Home = function(){
    construct(this, 'Controllers.Home');
    'use strict';    
    let stage, login, carousel;

    this.construct = () => {
        stage = app.getStage();
        login = app.cfind('View', 'login');
        carousel = app.cfind('Carousel', 'carousel'); 
    };   

    this.ux = (__bool) => {     
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
        OGX.Audio.play('click', 0.3);    
        //no JWT here because jwt = false in config
        OGX.Scope.scope(['public', 'private']);
        app.goto('private/intro');
    }     

    function playClick(){		
        setTimeout(function(){
            OGX.Audio.play('click', 0.3);           
        }, 0);			
	}  
};