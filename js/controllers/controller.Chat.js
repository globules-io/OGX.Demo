require('Controllers.Chat', 'Controller');
OGX.Controllers.Chat = function(){
    construct(this, 'Controllers.Chat');
    'use strict';  
    let chat;

    //@Override  
    this.construct = function(){
        chat = app.cfind('Chat', 'chat');
        chat.users([{_id:1031, first_name:'Globules', last_name:'Robot'}, {_id:1032, first_name:'Your', last_name:'Name'}]);
        chat.user(1032);
        chat.addMessage({from:1031, body:'Hi! Welcome to OGX.JS! We\'re not available right now but leave a message!', date:moment()});
    };  

    //@Override  
    this.ux = function(__bool){};     

};