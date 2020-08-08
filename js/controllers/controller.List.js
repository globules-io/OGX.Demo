require('Controllers.List', 'Controller');
OGX.Controllers.List = function(__config){
    construct(this, 'Controllers.List');
    'use strict';
    let list;
    let config = __config;
    let filters = false;

    //@Override
    this.construct = function(){
        //find groupedlist or dynamiclist
        list = app.cfind(config.data.list, config.data.id);      
    };	
    
    //@Override
	this.ux = function(__bool){
        if(__bool){
            $('.demo .option').on(this.touch.down, showFilters);
            list.el.on(OGX.DynamicList.SELECT, function(__e, __data){
                if(['user'].indexOf(__data.type) !== -1){
                    if(app.windowExists('winuser')){
                        app.removeWindow('winuser');
                    }
                    //shortcut to adding to current stage              
                    app.addWindow({
                        id:'winuser',
                        title:__data.first_name+' '+__data.last_name,
                        width:'100%',
                        height:'100%',
                        show:true, 
                        drag:true, 
                        resize:true, 
                        anim:'right',
                        'node:OML':[{
                            'default:Templates.Profile':{
                                css:'user profile',
                                data:__data,
                                scroll:true
                            }
                        }]
                    });
                }
            });
        }else{
            $('.demo .option').off(this.touch.down, showFilters);
            list.el.off(OGX.DynamicList.SELECT);
        }
    };    

    //@Override
    this.destroy = function(){
        if(filters){
            app.removeWindow(filters.id);
        }
    };

    function showFilters(){
        if(!filters){
            let ls = list.val();   
            //This is created at runtime, addWindow shortcut to create windows on current stage   
            filters = app.addWindow({
                id:'filterwin',
                title:'Filters',
                width:'50%',
                min_width:260,
                height:'100%',
                drag:true, 
                resize:false, 
                anim:'right',
                'node:OML':[{
                    'default:Templates.Filters':{
                        id:'#filters',  
                        'node:OML':{                            
                            '#filter_geo:TreedList':{
                                id:'geotree',
                                list:ls,
                                icon:true,
                                group_by:['location.state', 'location.city'],
                                renderer:'RouletteTree'                               
                            }
                        }
                    }
                }]
            }); 
            //bind the list to input and roulette group
            list.bind({property:'first_name', object:'#filter_fname', mode:'in'});
            list.bind({property:'last_name', object:'#filter_lname', mode:'in'});          
            let rt = app.getStage().find('RouletteTree', 'geotree_roultree');
            list.bind({property:'location', object:rt, mode:'in', remote_property:['state', 'city']});
        }
        filters.show();
    }     
};