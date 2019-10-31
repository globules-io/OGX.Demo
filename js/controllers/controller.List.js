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
        list = app.getStage().find(OGX[config.data.list].NAME, config.data.id);      
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
                    //could consider a break point here
                    app.addWindow({
                        id:'winuser',
                        title:__data.first_name+' '+__data.last_name,
                        width:'100%',
                        height:'100%',
                        show:true, 
                        drag:true, 
                        resize:true, 
                        anim:OGX.Window.ANIM_RIGHT,
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
                anim:OGX.Window.ANIM_RIGHT,
                'node:OML':[{
                    'default:Templates.Filters':{
                        id:'#filters',                       
                        'node:OML':{                            
                            '#filter_geo:TreedList':{
                                id:'geotree',
                                list:ls,
                                icon:true,
                                group_by:['state', 'city'],
                                renderer:OGX.RouletteTree.NAME
                            }
                        }
                    }
                }]
            }); 
            //bind the list to input and roulette group
            list.bind({property:'first_name', object:'#filter_fname', mode:'in'});
            list.bind({property:'last_name', object:'#filter_lname', mode:'in'});          
            //treedlist automatically adds _roultree to the id to target RouletteTree
            let rt = app.getStage().find(OGX.RouletteTree.NAME, 'geotree_roultree');
            //no need to name a property here but must be unique so name it anyway - DynamicList will do the links
            list.bind({property:'whatever', object:rt, mode:'in'});
        }
        filters.show();
    }     
};