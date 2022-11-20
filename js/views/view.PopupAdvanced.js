/*
@View
@Desc: Used for other Popup demos BUT standard
*/
require('Views.PopupAdvanced', 'View');
OGX.Views.PopupAdvanced = function(__config){
    construct(this, 'Views.PopupAdvanced');
	'use strict';
	let that = this;   
    let config = __config;
    let popup;

    //@Override   
    this.construct = function(){
        let conf = genConf();
        if(!conf){
            popup = app.cfind('Popup', 'container');
        }else{
            popup = this.create('Popup', conf); 
        }
        OGX.Audio.play('click', 0.1);
    }; 
    
    function genConf(){
        let conf = {
            id:'popup',
            anim:OGX.Popup.SCALE,
            width:220,   
            show:true,         
            drag:true                
        };
        switch(config.mode){ 
            case 'advanced':  
            conf.title = 'Resize & Drag';
            conf.html = '<span class="popup_message_center">Advanced Popup</span>';
            conf.resize = true;
            conf.height = 200;            
            break;   

            case 'dialogs': 
            conf.title = 'Confirm';
            conf.html = '<span class="popup_message_dialogs">You are sure you want to do that?</span>';
            conf.buttons = [{label:'YES', callback:onAction, params:0}, {label:'MAYBE', callback:onAction, params:1}]
            conf.height = 180;   
            break;

            case 'container':            
            return false;
        }
        return conf;
    }

    function onAction(__action){
        popup.hide(OGX.Popup.FADE, function(){
            that.remove('Popup', 'popup');
            setTimeout(function(){
                let conf = genConf();
                conf.buttons = [{label:'OK', callback:onAction, params:2}];
                switch(__action){
                    case 0:
                    conf.title = 'Done!';
                    conf.html = '<span class="popup_message_dialogs">I mean done-ish, will finish at some point.</span>';   
                    break;

                    case 1:
                    conf.title = 'Postponed!';
                    conf.html = '<span class="popup_message_dialogs">Think about it then and come back later!</span>';   
                    break;

                    case 2:
                    popup = that.create('Popup', genConf());  
                    OGX.Audio.play('click', 0.1);    
                    return;                    
                }  
                popup = that.create('Popup', conf);           
                OGX.Audio.play('click', 0.1);
            }, 1500)}
        );       
    }
};