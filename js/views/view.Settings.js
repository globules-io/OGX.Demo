require('Views.Settings', 'View');
OGX.Views.Settings = function(__config){
    construct(this, 'Views.Settings');
	'use strict';
    let roul;

    //@Override
    this.construct = function(){        
        roul = this.find(OGX.Roulette.NAME, 'theme_roul');
        roul.val(app.isDarkMode());
        app.removeOverlay(OGX.Overlay.FADE);
    };  
	
    //@Override
	this.ux = function(__bool){
        if(__bool){
            roul.el.on(OGX.Roulette.CHANGE, switchTheme);
        }else{
            roul.el.off(OGX.Roulette.CHANGE, switchTheme);
        }
    }; 
    
    function switchTheme(){
        app.toggleTheme();       
    }
};