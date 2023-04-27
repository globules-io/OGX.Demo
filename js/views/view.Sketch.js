require('Views.Sketch', 'View');
OGX.Views.Sketch = function(){
    construct(this, 'Views.Sketch');
	'use strict';
	let that = this;
    let canvas, ctx, controls, colors, brushes, image;
    let started = false;
    let brush = 1;
    let color = '#000';
    let offX, offY;

    //@Override
    this.construct = () => {       
        canvas = $('#sketch').find('.board:first');
        ctx = canvas[0].getContext('2d');
        controls = app.cfind('DynamicList', 'controls');
        colors = app.cfind('DynamicList', 'colors');
        brushes = app.cfind('DynamicList', 'brushes'); 
        colors.select('color', '#000000');
        brushes.select('size', 1);
        that.resize();   
    };

    //@Override
    this.resize = () => {
        offY = canvas.offset().top;
        offX = canvas.offset().left; 
        image = ctx.getImageData(0, 0, canvas[0].width, canvas[0].height);
        resizeCanvas();
        ctx.putImageData(image, 0, 0);
    };

    //@Override
    this.ux = (__bool) => {        
        if(__bool){       
            canvas.on(this.touch.down, function(__e){               
                if(!started){
                    started = true;
                    __e = that.event(__e);
                    ctx.lineWidth = brush;
                    ctx.strokeStyle = color;   
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(__e.clientX-offX, __e.clientY-offY);
                }                    
            });
            canvas.on(this.touch.move, function(__e){
                if(started){
                    __e = that.event(__e);
                    ctx.lineTo(__e.clientX-offX, __e.clientY-offY);
		            ctx.stroke();
                }
            });
            canvas.on(this.touch.up, function(__e){
                started = false;
            });
            controls.el.on(OGX.DynamicList.SELECT, function(__e, __data){
                switch(__data.id){
                    case 'clear':
                    that.addOverlay();
                    app.addPopup({
                        id:'popup',
                        title:'Clear Artboard?',
                        width:300,
                        height:180,
                        anim:'scale',
                        html:'<span class="popup_message">Please confirm that you want to clear the artboard.</span>',
                        buttons:[{label:'CLEAR', callback:clearBoard}, {label:'CANCEL', callback:closePopup}]
                    }, that);                 
                    break;

                    case 'save':
                    that.addOverlay();
                    app.addPopup({
                        id:'popup',
                        title:'Send Sketch?',
                        width:300,
                        height:180,
                        anim:'scale',
                        html:'<span class="popup_message">Please confirm that you want to send out the artboard.</span>',
                        buttons:[{label:'SEND', callback:sendSketch}, {label:'CANCEL', callback:closePopup}]
                    }, that);                 
                    break;
                }                
            });
            colors.el.on(OGX.DynamicList.SELECT, function(__e, __data){
                color = __data.color;
            });
            brushes.el.on(OGX.DynamicList.SELECT, function(__e, __data){
                brush = __data.size;
            });
        }else{
            canvas.off(this.touch.down);
            canvas.off(this.touch.move);
            canvas.off(this.touch.up);
            controls.el.off(OGX.DynamicList.SELECT);
            colors.el.off(OGX.DynamicList.SELECT);
            brushes.el.off(OGX.DynamicList.SELECT);
        }
    }; 

    function resizeCanvas(){
        let w = that.el.width();
        let h = that.el.height(); 
        canvas.attr('width', w);
        canvas.attr('height', h);
    }

    function clearBoard(){
        closePopup();
        ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
    }

    function closePopup(){
        that.removeOverlay(false);
        app.removePopup('popup', false);
    }

    function sendSketch(){
        app.removePopup('popup', false);
        that.removeOverlay(false);
        that.addLoading();
        //api...
        setTimeout(function(){
            resizeCanvas();
            that.removeLoading(false);
            that.addOverlay(false);
            app.addPopup({
                id:'popup',
                title:'Sketch Sent!',
                width:300,
                height:180,
                anim:'scale',
                html:'<span class="popup_message">Your sketch has been submitted!</span>',
                buttons:[{label:'CLOSE', callback:closePopup}]
            }, that);
        }, 2000);
    }
}