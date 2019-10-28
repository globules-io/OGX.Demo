require('Stages.Private', 'Stage');
OGX.Stages.Private = function(){	
    construct(this, 'Stages.Private');
    'use strict';
        	
    //Override
	this.ux = function(__bool){
        if(__bool){
			$(document).on(this.touch.down, '.icon, .tab, .bt, .snd', playClick);  
        }else{     
			$(document).off(this.touch.down, '.icon, .tab, .bt, .snd', playClick);  
        }
	};   

	function playClick(){		
        setTimeout(function(){
            OGX.Audio.playSound('click.mp3');           
        }, 0);			
	} 
};