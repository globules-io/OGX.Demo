require('Stages.Private', 'Stage');
OGX.Stages.Private = function(){	
    construct(this, 'Stages.Private');
    'use strict';
        	
    //Override
	this.ux = function(__bool){
        if(__bool){
			$(document).on(this.touch.down, '.icon, .tab, .bt, .snd, .ogx_stage_exit, .ogx_popup_button', playClick);  
            $(document).on(OGX.StackedTree.BACK+' '+OGX.StackedTree.ENTER+' '+OGX.Window.CLOSING+' '+OGX.Popup.HIDE+' '+OGX.Tabs.SELECT+' '+OGX.Roulette.CHANGE, playClick);
        }else{     
			$(document).off(this.touch.down, '.icon, .tab, .bt, .snd, .ogx_stage_exit, .ogx_popup_button', playClick);  
            $(document).off(OGX.StackedTree.BACK+' '+OGX.StackedTree.ENTER+' '+OGX.Window.CLOSING+' '+OGX.Popup.HIDE+' '+OGX.Tabs.SELECT+' '+OGX.Roulette.CHANGE, playClick);
        }
	};   

	function playClick(){		
        setTimeout(function(){
            OGX.Audio.play('click', 0.3);           
        }, 0);			
	} 
};