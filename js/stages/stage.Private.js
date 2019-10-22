require('Stages.Private', 'Stage');
OGX.Stages.Private = function(){	
    construct(this, 'Stages.Private');
    'use strict';
        	
    //Override
	this.ux = function(__bool){
        if(__bool){
			$(document).on(this.touch.down, '.icon, .tab, .bt, .snd, .ogx_window_icon, .ogx_window_main_icon', playClick);  
        }else{     
			$(document).off(this.touch.down, '.icon, .tab, .bt, .snd, .ogx_window_icon, .ogx_window_main_icon', playClick);  
        }
	};   

	function playClick(){		
        setTimeout(function(){
            OGX.Audio.playSound('click.mp3');           
        }, 0);			
	} 
};