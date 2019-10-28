require('Views.Overlay', 'View');
OGX.Views.Overlay = function(__obj){
    construct(this, 'Views.Overlay');
	'use strict';
	var that = this;    
    var status = 1;
    var intv = false;  
    var loading = __obj.loading;
    var time = 2000+Math.round(Math.random()*7000);   

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
        if(status){
            if(loading){
                that.removeLoading();
            }else{
                that.removeOverlay();
            }
            status = 0;
        }else{
            if(loading){
                that.addLoading();
            }else{
                that.addOverlay();
            }           
            status = 1;
        }
    }
    
};