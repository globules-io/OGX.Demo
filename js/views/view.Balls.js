/*
Simple non physical physic engine
*/
require('Views.Balls', 'View');
OGX.Views.Balls = function(__config){
    construct(this, 'Views.Balls');
	'use strict';
    let intv = false; 
    let done  = false;
    let balls = [];
    let msg = false;
    let canvas, ctx, sw, sh;    
    //name of the view coming from config
    if(__config.hasOwnProperty('data') && __config.data.hasOwnProperty('name')){
        msg = __config.data.name;
    }

    //@Override - __data passed if coming from GridSwiper : points
	this.construct = function(__points){   
        if(typeof(__points) !== 'undefined'){
            msg = 'Relative Point:'+JSON.stringify(__points.rel)+'<br>Absolute Point:'+JSON.stringify(__points.abs);    
        }
        if(msg){
            this.el.children('.msg:first').html(msg);
        }
        canvas = this.el.children('.canvas:first')[0];
        //run resize at start to set sw, sh
        this.resize();    
        ctx = canvas.getContext('2d');  
        //run resize at start to set sw, sh
        genBalls();           
	};
    
    //@Override
	this.enable = function(){
        if(!intv && !done){
            intv = requestAnimationFrame(onTick);            
        }
	};
	
    //@Override
	this.disable = function(){
        if(intv && !done){
           cancelAnimationFrame(intv);
           intv = false;
        }	
	};   

    //@Override
	this.resize = function(){	        
        sw = this.el.width();
        sh = this.el.height();
        //canvas 
        canvas.width = sw;
        canvas.height = sh;
        //put balls outside the view back inside
        for(let i = 0; i < balls.length; i++){      
            if(balls[i].position.x + balls[i].radius >= sw){
                balls[i].position.x = sw-balls[i].radius-Math.abs(balls[i].velocity.x);
            }else{
                if(balls[i].position.x - balls[i].radius <= 0){
                    balls[i].position.x = balls[i].radius+Math.abs(balls[i].velocity.x);
                }
            } 
            if(balls[i].position.y + balls[i].radius >= sh){
                balls[i].position.y = sh-balls[i].radius-Math.abs(balls[i].velocity.y);
            }else{
                if(balls[i].position.y - balls[i].radius <= 0){
                    balls[i].position.y = balls[i].radius+Math.abs(balls[i].velocity.y);
                }
            } 
        }       
	}; 	
  
    function onTick(){
        let dist, force; 
        for(let i = 0; i < balls.length; i++){  
            for(let j = 0; j < balls.length; j++){                
                if(i !== j){
                    //just compare distance center to center
                    dist = Math.sqrt(Math.pow((balls[i].position.x-balls[j].position.x), 2)+Math.pow((balls[i].position.y-balls[j].position.y), 2));  
                    force = balls[j].calcAttr(balls[i]);
                    balls[i].applyForce(force);                        
                    if(dist <= balls[i].radius+balls[j].radius){
                        //bigger wins
                        if(balls[i].radius >= balls[j].radius){                                    
                            balls[i].radius += balls[j].radius/8;                            
                            balls[i].calcMass();                                  
                            balls[i].velocity.mult(0.5);
                            balls.splice(j, 1);
                            j--;
                            i > 0 ? i-- : null;                           
                        }                                         
                    }
                }                
            }               
            //check screen bounds              
            if(balls[i].position.x + balls[i].radius >= sw || balls[i].position.x - balls[i].radius <= 0){
                balls[i].velocity.x *= -1;
                balls[i].position.x += balls[i].velocity.x;
            }                
            if(balls[i].position.y + balls[i].radius >= sh || balls[i].position.y - balls[i].radius <= 0){                   
                balls[i].velocity.y *= -1;
                balls[i].position.y += balls[i].velocity.y;
            }                
            balls[i].update();  
        }   
        ctx.clearRect(0, 0, sw, sh);                
        drawBalls();  
        if(!done){
            intv = requestAnimationFrame(onTick);
        }
    }

    function genBalls(){
        let total = 3+Math.round(Math.random()*30);  
        let b, x, y, dirX, dirY, angle, speed, radius, rgb;          
        for(let i = 0; i < total; i++){
            dirX = 0.1+Math.random()*0.9;
            dirY = 0.1+Math.random()*0.9;       
            Math.random() > 0.5 ? dirX *= -1 : null;
            Math.random() > 0.5 ? dirY *= -1 : null;
            radius = 2+Math.round(Math.random()*2);
            rgb = [200+Math.round(Math.random()*50), Math.round(Math.random()*100), Math.round(Math.random()*100)];
            x = 1+Math.round(Math.random()*(sw-radius*2-1));
            y = 1+Math.round(Math.random()*(sh-radius*2-1));
            speed = 2+Math.round(Math.random()*5);
            angle = Math.random()*360; 
            b = new ball(radius, x, y, dirX, dirY, angle, speed, rgb);
            b.calcMass();
            balls.push(b);  
        } 
    }

    function drawBalls(){
        for(let i = 0; i < balls.length; i++){
            if(balls[i]){
                ctx.fillStyle = 'rgb('+balls[i].rgb.join(',')+')';
                ctx.beginPath();     
                ctx.shadowBlur = 8+Math.round(Math.random()*2);
                ctx.shadowColor = ctx.fillStyle;
                ctx.arc(balls[i].position.x, balls[i].position.y, balls[i].radius, 0, Math.PI * 2, true);
                ctx.fill();
            }
        }
    }   
};