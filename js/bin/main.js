/*APP*/  
var app;	
$(document).ready(function(){
    $(document).on(OGX.App.READY, function(){
        $(document).off(OGX.App.READY);          
        $('.ogx_overlay').remove();        
    });
    app = new OGX.App();  
    OGX.Debug.level(1,2,3);
});
/*GLOBALS*/
function exists(__var){
    return typeof(__var) !== 'undefined';
}