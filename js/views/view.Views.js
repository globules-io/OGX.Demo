/*
Simple non physical physic engine
*/
require('Views.Views', 'View');
OGX.Views.Views = function(__config){
    construct(this, 'Views.Views');
	'use strict';
	var that = this;  
    var intv = false; 
    var balls = [];

    //@Override
	this.construct = function(){            
        this.resize();  
        genBalls();           
	};
    
    //@Override
	this.enable = function(){
        if(!intv){
            intv = requestAnimationFrame(onTick);            
        }
	};
	
    //@Override
	this.disable = function(){
        if(intv){
           cancelAnimationFrame(intv);
           intv = false;
        }	
	};   

    //@Override
	this.resize = function(){	        
        sw = this.el.width();
        sh = this.el.height();
        //put balls outside the view back inside
        for(var i = 0; i < balls.length; i++){      
            if(balls[i].x + balls[i].radius*2 >= sw){
                balls[i].x = sw-balls[i].radius*2-balls[i].speed;
            }else{
                if(balls[i].x <= 0){
                    balls[i].x = balls[i].radius*2+balls[i].speed;
                }
            } 
            if(balls[i].y + balls[i].radius*2 >= sh){
                balls[i].y = sh-balls[i].radius*2-balls[i].speed;
            }else{
                if(balls[i].y <= 0){
                    balls[i].y = balls[i].radius*2+balls[i].speed;
                }
            } 
        }       
	}; 	
  
    function onTick(){
        var dist;        
        for(var i = 0; i < balls.length; i++){    
            if(balls[i]){ 
                balls[i].speed *= 1-balls[i].friction;
                balls[i].speed < 0 ? balls[i].speed = 0 : null;
                balls[i].x += balls[i].dirX*balls[i].speed;
                balls[i].y += balls[i].dirY*balls[i].speed;
                //check other balls
                //the bigger one wins
                for(var j = 0; j < balls.length; j++){
                    if(balls[j]){
                        if(i !== j){
                            //just compare distance center to center
                            dist = Math.sqrt(Math.pow(((balls[i].x+balls[i].radius)-(balls[j].x+balls[j].radius)), 2)+Math.pow(((balls[i].y+balls[i].radius)-(balls[j].y+balls[j].radius)), 2));                         
                            if(dist <= balls[i].radius+balls[j].radius){
                                //bigger wins
                                if(balls[i].radius >= balls[j].radius){                                    
                                    balls[i].radius += balls[j].radius/2;
                                    balls[i].friction += 0.001;
                                    balls[i].el.css({'width':balls[i].radius*2+'px', 'height':balls[i].radius*2+'px', 'border-radius':balls[i].radius+'px'});
                                    balls[j].el.remove();
                                    balls[j] = false;        
                                    //OGX.Audio.playSound('drop.mp3', 0.3);                                                                      
                                }                                         
                            }
                        }
                    }
                }
                //check screen bounds
                if(balls[i].x + balls[i].radius*2 >= sw || balls[i].x <= 0){
                    balls[i].dirX *= -1;   
                    balls[i].x += balls[i].dirX*balls[i].speed;    
                }
                if(balls[i].y + balls[i].radius*2 >= sh || balls[i].y <= 0){
                    balls[i].dirY *= -1;
                    balls[i].y += balls[i].dirY*balls[i].speed;   
                }
                balls[i].el.css('transform', 'translate3d('+balls[i].x+'px, '+balls[i].y+'px, 0)');   
            }              
        }
        intv = requestAnimationFrame(onTick);
    }

    function genBalls(){
        var total = 3+Math.round(Math.random()*30);
        var x, y, dirX, dirY, radius, rgb;
        var html = '<span class="msg" style="position:absolute;">'+__config.data.name+'</span>';
        for(var i = 0; i < total; i++){
            dirX = 0.1+Math.random()*0.9;
            dirY = 0.1+Math.random()*0.9;       
            Math.random() > 0.5 ? dirX *= -1 : null;
            Math.random() > 0.5 ? dirY *= -1 : null;
            radius = 4+Math.round(Math.random()*2);
            rgb = [200+Math.round(Math.random()*50), Math.round(Math.random()*100), Math.round(Math.random()*100)];
            x = 1+Math.round(Math.random()*(sw-radius*2-1));
            y = 1+Math.round(Math.random()*(sh-radius*2-1));
            html += '<div class="ball ball_'+i+'" style="width:'+(radius*2)+'px; height:'+(radius*2)+'px; border-radius:'+radius+'px; background-color:rgb('+rgb.join(',')+'); position:absolute;"></div>';
            balls.push({radius:radius, friction:0.0001, dirX:dirX, dirY:dirY, speed:5+Math.round(Math.random()*5), el:'.ball_'+i+':first', x:x, y:y});
        }
        that.el.html(html);
        for(i = 0; i < total; i++){
            balls[i].el = that.el.children(balls[i].el);
        }
    }
};