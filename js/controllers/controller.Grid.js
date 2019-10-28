require('Controllers.Grid', 'Controller');
OGX.Controllers.Grid = function(__data){
    construct(this, 'Controllers.Grid');
    'use strict';  
    var grid;  

    //@Override
    this.construct = function(){       
       grid = app.getStage().find(OGX.GridSwiper.NAME, 'grid');
       grid.setMap([
           [displayPoint, displayPoint, displayPoint],
           [displayPoint, displayPoint, displayPoint],
           [displayPoint, displayPoint, displayPoint]
        ]);
    };

    function displayPoint(__abs, __rel){
        var color = [50+Math.round(Math.random()*100), 50+Math.round(Math.random()*100), 50+Math.round(Math.random()*100)];
        return '<div style="display:block; width:100%; height:100%; background-color:rgb('+color.join(',') +'")><span class="msg">Relative Point: '+JSON.stringify(__rel)+'<br>Absolute Point: '+JSON.stringify(__abs)+'</span></div>';
    }
};