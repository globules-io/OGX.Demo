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
        return '<span class="msg">Relative Point: '+JSON.stringify(__rel)+'<br>Absolute Point: '+JSON.stringify(__abs)+'</span>';
    }
};