require('Views.Overlay', 'View');
OGX.Views.Overlay = function(__obj){
    construct(this, 'Views.Overlay');
	'use strict';
	let that = this;    
    let status = 1;
    let intv = false;  
    let loading = __obj.loading;
    let time = 2000+Math.round(Math.random()*7000);   

    //@Override    
	this.ux = (__bool) => {
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