let ball = function(__radius, __x, __y, __dirX, __dirY, __angle, __speed, __rgb){
    this.radius = __radius;
    this.mass = 0;
    this.angle = __angle;
    this.position = new PVector(__x, __y);
    this.velocity = new PVector(__dirX, __dirY);   
    this.velocity.rotate(this.angle);    
    this.acceleration = new PVector(__speed, __speed);
    this.rgb = __rgb;
};
ball.prototype.applyForce = function(force) {
    let f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};
ball.prototype.calcAttr = function(__ball) {       
    let force = PVector.sub(this.position, __ball.position);
    let distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);                        
    force.normalize();
    let strength = (1*this.mass*__ball.mass)/(distance*distance);
    force.mult(strength);
    return force;
};
ball.prototype.calcMass = function(){
    this.mass = this.radius*6;
};
ball.prototype.update = function(){       
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};
function constrain(__n, __min, __max){
    if(__n < __min){
        return __min;
    }
    if(__n > __max){
        return __max;
    }
    return __n;
}  