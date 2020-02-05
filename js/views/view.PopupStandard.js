require('Views.PopupStandard', 'View');
OGX.Views.PopupStandard = function(__config){
    construct(this, 'Views.PopupStandard');
	'use strict';
    let that = this;
    let intv = false; 
    let objs = [{node:'#std0', popup:0}, {node:'#std1', popup:0}];
    let current = 0;
    let words = ['Welcome to OGX!', 'Hello there e-traveller!', 'So, you like Javascript?', 'Follow us @globules-io', 'OGX.JS v1.0 Demo', 'Standard Popup']
    let time;  

    //@Override 
    this.construct = function(){
		time = 2000+Math.round(Math.random()*2000);
	};
   	
    //@Override   
    this.ux = function(__bool){
        onOff(__bool);
    };     
	
    function onOff(__bool){
        if(__bool){
            intv = setInterval(onTime, time);
        }else{
            clearInterval(intv);
            intv = false;
        }
    }

    function onTime(){       
        //view A or B?   
        if(objs[current].popup){
           objs[current].popup.hide(OGX.Popup.FADE, onHidden, current);
        }else{
            let rnd = Math.random();
            let title = false;
            rnd > 0.5 ? title = 'I have a title!' : null;
             objs[current].popup = OGX.Object.create(OGX.Popup.NAME, {
                id:'popup'+current,
                container:objs[current].node,
                parent:that,
                width:220,
                height:100,
                title:title,
                anim:OGX.Popup.FADE,
                html:'<span class="popup_message_center">'+words[Math.floor(Math.random()*words.length)]+'</span>'
            });     
            that.add(objs[current].popup);   
            objs[current].popup.show(OGX.Popup.FADE); 
            OGX.Audio.playSound('click.mp3', 0.1);
        }
        current ? current = 0 : current = 1;
    }  

    function onHidden(__current){          
        that.remove(OGX.Popup.NAME, objs[__current].popup.id);
        objs[__current].popup = 0;
    }
    
};