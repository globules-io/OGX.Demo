require('Views.Login', 'View');
OGX.Views.Login = function(){
    construct(this, 'Views.Login');
	'use strict';
	var that = this;
    var md5 = false;
    
	//@Override
    this.construct = function(){           
        OGX.Form.bindForm({
            container:'#login form', 
            forbidden:/<>/,
            submit_cb:onSubmit,     
            validate:true,           
            fields:{
                username:{
                    allowed:/[a-z0-9@\\._\\-]/
                },
                password:{
                    allowed:/[a-zA-Z0-9@\\._\\-\\!\\?#$%]/
                }                         
            }    
        });       
    };    
    
    //@Override
	this.focus = function(){
        $('#login form:first').find('input[name="username"]').focus();
	};	
	
    function onSubmit(__data){  
        if(!__data.valid){          
			var msg = 'Please fill the required missing field(s): ';
			for(var a in __data.error){
				msg += a+', ';
			}
			msg = msg.substr(0, msg.length-2);
			msg += '!';
			app.addPopup({  
				id:'popup',              
				title:'Incorrect Entries!',
				html:'<span class="popup_message">'+msg+'</span>',                       
				height:200,            
				buttons:[{label:'CLOSE', callback:closePopup, params:'popup'}]
			}); 
			return;
        }              
        that.addLoading();         
        /*    
		Here you would do you remote login call then trigger LOGIN on success
        */  
        that.el.trigger('LOGIN');
    }  
    
    this.destroy = function(){
        OGX.Form.unbindForm('#login form');
        this.removeLoading();
    };        
   
};