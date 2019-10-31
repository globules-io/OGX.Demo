require('Stages.Private', 'Stage');
OGX.Stages.Private = function(){	
    construct(this, 'Stages.Private');
    'use strict';
        	
    //Override
	this.ux = function(__bool){
        if(__bool){
			$(document).on(this.touch.down, '.icon, .tab, .bt, .snd', playClick);  
            $(document).on(OGX.StackedTree.BACK+' '+OGX.Window.CLOSING+' '+OGX.Popup.HIDE+' '+OGX.Tabs.SELECT+' '+OGX.Roulette.CHANGE+' '+OGX.RouletteTree.CHANGE+' '+OGX.DynamicList.SELECT, playClick);
        }else{     
			$(document).off(this.touch.down, '.icon, .tab, .bt, .snd', playClick);  
            $(document).off(OGX.StackedTree.BACK+' '+OGX.Window.CLOSING+' '+OGX.Popup.HIDE+' '+OGX.Tabs.SELECT+' '+OGX.Roulette.CHANGE+' '+OGX.RouletteTree.CHANGE+' '+OGX.DynamicList.SELECT, playClick);
        }
	};   

	function playClick(){		
        setTimeout(function(){
            OGX.Audio.playSound('click.mp3', 0.1);           
        }, 0);			
	} 
};