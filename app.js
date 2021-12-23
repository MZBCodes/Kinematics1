class Firework {
    constructor(node, x, y, fx, fy){
        this.node = node;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = fx;
        this.ay = fy;
        this.counter = 0;
        this.id = 0;
    }

    updatePosition() {
        this.x += this.vx;
        this.y += this.vy;
    }

    updateVelocity() {
        this.vx += this.ax;
        this.vy += this.ay;
    }

    applyForce(fx, fy){
        this.ax += fx;
        this.ay += fy;

    }

    applyFriction(){
        this.vx *= .99;
        console.log("applying");
    }

    checkEdge() {
        if (this.x - 10 < -(width / 2)){//left border
            this.x = -width/2 + 10;
            this.vx *= -1;
        } else if (this.x + 10 > width / 2){//right border
            this.x = width/2 - 10;
            this.vx *= -1;
        }

        if (this.y - 10 < -(height / 2 + 20)){
            this.vy *= -.999;
            this.y = -height/2 - 20;
        }
    }



    update(){
        this.checkEdge();
        this.applyForce(0, -1.4);
        this.updateVelocity();
        this.updatePosition();
        this.ax = 0;
        this.ay = 0;
        this.counter += 10;
        this.node.style.top = (100 - this.y).toString() + "px";
        this.node.style.left = (100 + this.x).toString() + "px";
    }
}



let parent = document.getElementById('box');
let change = 0;
let x = 0;
let basex = 0;
let basey = 0;
let intervals = [];
let height = window.innerHeight;
let width = window.innerWidth;
console.log("that's it");
console.log(height,width)


function spawnFirework() {
    let newFirework = document.createElement("div");
    parent.appendChild(newFirework);
    newFirework.className = "firework";
    let firework = new Firework(newFirework, basex, basey, Math.random() * 20 - 10,20);
    if (firework.node.y < -1000){

    }
    let interval = setInterval(updateFirework, 16, firework);
    firework.id = interval;
}



function updateFirework(firework){

    firework.update();
}


