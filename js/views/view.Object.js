require('Views.Object', 'View');
OGX.Views.Object = function(__config){
    construct(this, 'Views.Object');
	'use strict';
    let that = this;
    let config = __config;
    let popup = false;
    let oml;

	//@Override
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
        app.removeOverlay('fade');
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
        app.cfind('Html', 'doc').reveal();      
    }  

    function showHelp(){
        if(config.data.hasOwnProperty('help') && config.data.help){
            that.addOverlay('fade');
            if(!popup){
                popup = that.create('Popup', {
                    id:'help',
                    title:'Help',
                    width:300,
                    height:200,
                    html:'<span class="popup_message_center">'+config.data.help+'</span>',
                    buttons:[{label:'CLOSE', callback:closePopup}]            
                });   
            }        
            popup.show('fade');
        }
    }

    function closePopup(){
        that.removeOverlay('fade');
        popup.hide('fade');
    }
   
    function showOML(){
        if(app.windowExists('oml')){
            app.removeWindow('oml');
        }
        app.addWindow({
            id:'oml',
            title:'Demo OML',
            head:'back',
            width:'100%',
            anim:'right',
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