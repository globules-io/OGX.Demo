/*DEVICE*/  
var debug = false;
var app, geo, click;
if(typeof(cordova) !== 'undefined'){	
	//var console = {};
	//console.log = function(){};    
    //url = 'https://api.globules.co';
}else{	
    debug = true;
	var device = {};
	device.platform = 'android';    
    //url = 'http://api.globules.local'; 
}  
if(!debug){
    document.addEventListener('deviceready', onDeviceReady, false);
   
    function onDeviceReady(){ 
        if(!debug){       
            version = AppVersion.version;
            StatusBar.hide();
            cordova.plugins.Keyboard.disableScroll(true);
        }
        $(document).ready(function(){
            onReady();			
        });        
    }   
}else{	
    $(document).ready(function(){		
		version = 'debug';
        onReady();
    });
}
function exists(__var){
    return typeof(__var) !== 'undefined';
}
/*DOCUMENT*/
function onReady(){   
    $(document).on(OGX.App.READY, function(){
        $(document).off(OGX.App.READY);  
        if(!debug){
            setTimeout(function(){
                navigator.splashscreen.hide();
                $('.ogx_overlay').remove();
            }, 1500);          
        }else{
            $('.ogx_overlay').remove();
        }
    });
    app = new OGX.App();
    geo = new OGX.Geo();      
} 
