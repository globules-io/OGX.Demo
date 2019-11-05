/*
Big Bang Engine by Eric Parlier @globules
Uses processing.js for vector processing
*/
require('Views.BigBang', 'View');
OGX.Views.BigBang = function(__config){
    construct(this, 'Views.BigBang');
	'use strict';
    let that = this;
    let intv = false; 
    let done  = false;
    let balls = [];
    let canvas = false;
    let ctx = false;
    let sw, sh;    
    let bh = true;
    let status = 'exploding';
    let max_radius = 55;
    //140 safe for older phones, desktop can have a lot more
    let max_balls = 140;
    
    //@Override
	this.construct = function(){      
        canvas = this.el.children('.canvas:first')[0];
        //run resize at start to set sw, sh
        this.resize();    
        ctx = canvas.getContext('2d');  
        ctx.save();
        let x = sw/2;   
        let y = sh/2;        
        bh = {x:x, y:y, radius:50};    
        //intro
        setTimeout(function(){            
            that.el.children('.wrapper:first').children('.intro:first').addClass('show');
        }, 8000);
        //overlay
        app.removeOverlay(OGX.Overlay.FADE);
	};
    
    //@Override
	this.enable = function(){       
        if(!intv && !done && canvas){
            intv = requestAnimationFrame(onTick);            
        }       
	};
	
    //@Override
	this.disable = function(){        
        if(intv && !done && canvas){
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

    function drawBlackHole(){      
        ctx.restore();       
        let grd = ctx.createRadialGradient(bh.x, bh.y, 0, bh.x, bh.y, bh.radius);  
        grd.addColorStop(0.000, 'rgba(0, 0, 0, 0.950)');
        grd.addColorStop(1.000, 'rgba(0, 0, 0, 1.000)');
        ctx.lineWidth = 3;
        ctx.fillStyle = grd;
        ctx.strokeStyle = '#111';
        ctx.shadowBlur = 8+Math.round(Math.random()*2);
        ctx.shadowColor = '#e6b00d';
        ctx.beginPath();        
        ctx.arc(bh.x, bh.y, bh.radius, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fill();
    }

    function genBall(){
        let b, x, y, dirX, dirY, angle, speed, radius, rgb; 
        dirX = 0.1+Math.random()*0.9;
        dirY = 0.1+Math.random()*0.9;  
        radius = 2+Math.round(Math.random()*2);
        rgb = [245+Math.round(Math.random()*10), 150+Math.round(Math.random()*50), 5+Math.round(Math.random()*10)];
        x = bh.x;
        y = bh.y;
        angle = Math.random()*360; 
        speed = 5+Math.round(Math.random()*5);
        b = new ball(radius, x, y, dirX, dirY, angle, speed, rgb);
        b.calcMass();
        balls.push(b);  
    }    

    function drawBalls(){ 
        ctx.restore();        
        for(let i = 0; i < balls.length; i++){  
            ctx.fillStyle = 'rgba('+balls[i].rgb.join(',')+', 0.7)';
            ctx.shadowColor = 'transparent';
            ctx.beginPath(); 
            ctx.arc(balls[i].position.x, balls[i].position.y, balls[i].radius, 0, Math.PI * 2, true);
            ctx.fill();            
        }
    }
  
    function onTick(){
        switch(status){  
            case 'exploding':
            bh.radius -= 0.25;   
            if(bh.radius < 1){
                bh = false;
                status = 'colliding';                
            }else{
                if(max_balls){
                    if(balls.length < max_balls){
                        genBall();   
                    }       
                }else{
                    genBall();   
                }        
            } 
            break;

            case 'collapsing':
            //slowly turn black then remove, show black hole and restart`
            balls[0].rgb = [balls[0].rgb[0] - 1, balls[0].rgb[1] - 1, balls[0].rgb[2] - 1];
            //then just hide it and gen black hole with same specs at same position
            balls[0].velocity.div(1.01);  
            if(balls[0].radius > 50){
                balls[0].radius -= 0.1;
            }
            if(balls[0].velocity.x < 0.1 && balls[0].radius < 51){
                balls[0].velocity.x = balls[0].velocity.y = 0;                
                bh = {x:balls[0].position.x, y:balls[0].position.y, radius:balls[0].radius};  
                balls = [];  
                status = 'exploding';          
            }
            break;
        }
        
        let dist, force; 
        let done = false; 
        for(let i = 0; i < balls.length; i++){  
            //check other balls
            //the bigger one wins
            for(let j = 0; j < balls.length; j++){                        
                if(i !== j){
                    //just compare distance center to center
                    dist = Math.sqrt(Math.pow((balls[i].position.x-balls[j].position.x), 2)+Math.pow((balls[i].position.y-balls[j].position.y), 2));  
                    force = balls[j].calcAttr(balls[i]);
                    balls[i].applyForce(force);   
                    if(status === 'colliding'){
                        if(dist <= balls[i].radius+balls[j].radius){
                            //bigger wins
                            if(balls[i].radius >= balls[j].radius){                                    
                                balls[i].radius += balls[j].radius/4;
                                balls[i].radius > max_radius ? balls[i].radius = max_radius : null;
                                balls[i].calcMass();                                  
                                balls[i].velocity.mult(0.8);
                                balls.splice(j, 1);
                                j--;
                                i > 0 ? i-- : null;
                                if(balls.length === 1){
                                    done = true;                                       
                                }
                            }                                         
                        }
                    }
                }                                       
            }  
            //bigger ball should gradually turn into a bh
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
        if(bh){
            drawBlackHole();     
        }      
        if(done){
            status = 'collapsing'; 
        }       
        intv = requestAnimationFrame(onTick);
    }
};