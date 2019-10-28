require('Views.Object', 'View');
OGX.Views.Object = function(__config){
    construct(this, 'Views.Object');
	'use strict';
    var that = this;
    var config = __config;
    var popup = false;
    var oml;

    this.construct = function(__data, __route_data){
        //demo
        oml = JSON.parse(JSON.stringify(config.data.demoml));
        if(oml){
            OGX.OML.render(this, oml); 
        }
        if(!config.data.hasOwnProperty('help') || !config.data.help){
            $('.demo .help:first').addClass('disabled');
        }
        if(!config.data.hasOwnProperty('option') || !config.data.option){
            $('.demo .option:first').addClass('disabled');
        }
        //overlay
        app.removeOverlay(OGX.Overlay.FADE);
    };

    //@Override
    this.ux = function(__bool){
        if(__bool){
            this.el.on(this.touch.down, '.woml', showOML);
            this.el.on(this.touch.down, '.code', showDocs);
            this.el.on(this.touch.down, '.help', showHelp);
        }else{
            this.el.on(this.touch.down, '.woml', showOML);
            this.el.off(this.touch.down, '.code', showDocs);
            this.el.off(this.touch.down, '.help', showHelp);
        }
    }  

    function showDocs(){
        app.getStage().reveal(OGX.Html.NAME, '#doc');      
    }  

    function showHelp(){
        if(config.data.hasOwnProperty('help') && config.data.help){
            that.addOverlay(OGX.Overlay.FADE);
            if(!popup){
                popup = that.create(OGX.Popup.NAME, {
                    id:'help',
                    title:'Help',
                    width:300,
                    height:200,
                    html:'<span class="popup_message_center">'+config.data.help+'</span>',
                    buttons:[{label:'CLOSE', callback:closePopup}]            
                });   
            }        
            popup.show(OGX.Popup.FADE);
        }
    }

    function closePopup(){
        that.removeOverlay(OGX.Overlay.FADE);
        popup.hide(OGX.Popup.FADE);
    }
   
    function showOML(){
        if(app.windowExists('oml')){
            app.removeWindow('oml');
        }
        app.addWindow({
            id:'oml',
            title:'Demo OML',
            style:OGX.Window.STYLE_BACK,
            width:'100%',
            anim:OGX.Window.ANIM_RIGHT,
            'node:OML':[
                {'default:Html':{
                    instance:true,
                    scroll:true,                    
                    html:'<span class="demoml"><pre><code class="json">'+JSON.stringify(config.data.demoml, null, 3).replace(/</g, '&lt;').replace(/>/g, '&gt;')+'</code></pre></span>'                   
                }}
            ]
        });
        app.showWindow('oml');
    }    
}