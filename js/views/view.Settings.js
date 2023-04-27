require('Views.Settings', 'View');
OGX.Views.Settings = function(__config){
    construct(this, 'Views.Settings');
	'use strict';
	let supported = false;
    let roul;

    //@Override
    this.construct = () => {        
        roul = app.cfind('Roulette', 'theme_roul'); 
        if(supported === -1){           
            cordova.plugins.ThemeDetection.isAvailable(function(__res){
                supported = __res.value;  
                dark_mode = true; 
                if(!supported){
                    roul.val(dark_mode);
                    noSupport();
                }else{
                    roul.val(app.isDarkMode());    
                    app.removeOverlay(OGX.Overlay.FADE);
                }         
            });
        }else{
            if(supported === false){
                roul.val(dark_mode);
                noSupport();
            }else{
                roul.val(app.isDarkMode());    
                app.removeOverlay(OGX.Overlay.FADE);
            }
        }
    };  
	
    //@Override
	this.ux = (__bool) => {
        if(__bool){
            roul.el.on(OGX.Roulette.CHANGE, switchTheme);
        }else{
            roul.el.off(OGX.Roulette.CHANGE, switchTheme);
        }
    }; 

    function noSupport(){ 
        //remove light
        $('head').children('link[data="light"]').remove();
        app.addPopup({
            id:'theme',
            title:'No Direct Support',
            height:200,
            html:'<span class="popup_message">OS built in dark mode not supported with your device. Support is emulated.</span>',
            buttons:[{label:'CLOSE', callback:closePopup, params:'theme'}]
        });       
    }
    
    function switchTheme(__e, __dark){
        if(supported){
            app.toggleTheme();       
        }else{ 
            switchLinks(__dark);  
        }
    }

    function switchLinks(__to_dark){
        dark_mode = __to_dark;
        var href;           
        $('head').children('link[data="dark"]').each(function(__idx, __el){
            href = $(__el).attr('href');
            if(__to_dark){
                href = href.replace('light', 'dark');
            }else{
                href = href.replace('dark', 'light');
            }
            $(__el).attr('href', href);
        });
    }

    function closePopup(){
        app.removeOverlay();
        app.removePopup('theme');        
    }
};