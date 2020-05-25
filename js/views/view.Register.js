require('Views.Register', 'View');
OGX.Views.Register = function(){
    construct(this, 'Views.Register');
	'use strict';
	var that = this;
    
	//@Override
    this.construct = function(){        
        OGX.Form.bindForm({
            el:'#register form', 
            forbidden:/<>/,
            submit_cb:onSubmit,     
            validate:true,           
            fields:{     
                username:{
                    allowed:/[a-z0-9@\\._\\-]/
                },
                password:{
                    allowed:/[a-zA-Z0-9@\\._\\-\\!\\?#$%]/
                },
                verify:{
                    allowed:/[a-zA-Z0-9@\\._\\-\\!\\?#$%]/
                }                        
            }    
        });         
    };
       
    //@Override
	this.enable = function(){
        $('#register form:first').find('input[name="first_name"]').focus();		
	};

	//@Override
    this.destroy = function(){
        OGX.Form.bindForm('#register form');
    };

    function onSubmit(__data){       
        if(!__data.valid){            
            var msg = 'Please fill the required missing field(s): ';
			for(var a in validation){
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
        }else{
            if(__data.obj.password !== __data.obj.verify){                
				app.addPopup({     
					id:'popup',              
					title:'Password Mismatch!',
					html:'<span class="popup_message">The passwords are mismatched! Please update.</span>',                       
					height:200,            
					buttons:[{label:'CLOSE', callback:closePopup, params:'popup'}]
				});
                return false;
            }            
            app.addOverlay();
            that.addLoading();   
			/*
			Here you would do your remote call to register then redirect
			*/            
        }        
    }
    
};