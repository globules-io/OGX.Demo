/*APP*/  
var app;	
$(document).ready(function(){
    $(document).on(OGX.App.READY, function(){
        $(document).off(OGX.App.READY);          
        $('.ogx_overlay').remove();        
    });
    app = new OGX.App();  
});
/*GLOBALS*/
function exists(__var){
    return typeof(__var) !== 'undefined';
}