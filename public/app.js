let parent = document.getElementById('box');
let body = document.getElementById('body');
let basex = 0;
let basey = 0;
let gravity = -1.4;
let xVariance = 40;
let ybuffer = 20;
let kineticFriction = .995;
let wind = 20;
let height = window.innerHeight;
let width = window.innerWidth;
let mouse = new MouseEvent("buttons");
let mouseX;
let mouseY;

document.addEventListener("mousemove", () => {
    mouseX = event.clientX; // Gets Mouse X
    mouseY = event.clientY; // Gets Mouse 
  });

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
        this.wind = 30;
        this.id = 0;
        this.timer = 0;
        document.addEventListener('keyup', event => {
            if (event.code === 'Space') {
               this.applyWind(this);
            }
        })
        document.addEventListener('keydown', event => {
            if (event.code === 'Space') {
               this.chargeWind(this);
            }
        })
        document.addEventListener('keyup', event => {
            if (event.code === 'ArrowDown') {
               this.increaseGravity();
            }
        })
        document.addEventListener('keyup', event => {
            if (event.code === 'ArrowUp') {
               this.decreaseGravity();
            }
        })
        
        document.addEventListener('keyup', event => {
            if (event.code === 'KeyX') {
                this.applyExplosion(mouseX - width/2, mouseY - height/2);
            }
        })
    }

    applyExplosion(ex, ey){
        this.showExplosion(ex, ey)
        let dx = (ex - this.x)
        let dy = (ey - this.y)
        let fx = Math.min(1 / (dx / 300), 40); //if the distance is equal to the width, force is going to be 1
        let fy = Math.min(1 / (dy / 300), 40); //if the distance is equal to the width, force is going to be 1
        this.applyForce(-fx, fy)
    }
    showExplosion(x, y){
        /*let newFirework = document.createElement("div");
    parent.appendChild(newFirework);
    newFirework.className = "firework";
    */
        let circle = document.createElement("div");
        body.appendChild(circle);
        circle.style.top = (y + height/2 - 300).toString() + "px";
        circle.style.left = (x + width/2 - 100).toString() + "px";
        console.log(x+width/2,y+height/2);
        circle.className = "explosion";
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

    chargeWind(firework){
        firework.wind += 0.5;
    }

    applyWind(firework){
        console.log("wind is being applied")
        firework.applyForce((Math.random() * xVariance) - (xVariance / 2),Math.min(this.wind, 80))
        this.wind = 20;

    }

    increaseGravity(){
        gravity -= .05;
        console.log("increasing gravity")
    }

    decreaseGravity(){
        gravity += .05;
        console.log("decreasing gravity")

    }

    applyFriction(){
        if (this.vy == 0){
            this.vx *= kineticFriction;
        }
        if (Math.abs(this.vx) < 0.5){
            this.vx = 0;
        }
    }

    checkEdge() {
        if (this.x - 10 < -(width / 2)){//left border
            this.x = -width/2 + 10;
            this.vx *= -1;
        } else if (this.x + 10 > (width / 2)){//right border
            this.x = width/2 - 10;
            this.vx *= -1;
        }
        if (this.timer > 5){
            if (this.y < -(height / 2) + ybuffer){
                this.timer = 0;
                this.vy *= -.9;
                this.y = -height/2 + ybuffer;
            }
        }
    }

    stopBouncing() {
        if (this.y <= (-height / 2) + ybuffer && Math.abs(this.vy) <= 3){
            this.vy = 0;
        }
    }



    update(){
        this.checkEdge();
        this.applyForce(0, gravity);
        this.updateVelocity();
        this.applyFriction();
        this.stopBouncing();
        this.applyFriction();
        this.updatePosition();
        this.timer += 1;
        if (mouse.buttons == 1){
            console.log("left mouse button was pressed")
        }
        this.ax = 0;
        this.ay = 0;
        this.counter += 10;
        this.node.style.top = (100 - this.y).toString() + "px";
        this.node.style.left = (100 + this.x).toString() + "px";
    }
}

function spawnFirework() {
    let newFirework = document.createElement("div");
    parent.appendChild(newFirework);
    newFirework.className = "firework";
    let firework = new Firework(newFirework, basex, basey, Math.random() * xVariance - xVariance / 2,25);
    let interval = setInterval(updateFirework, 16, firework);
    firework.id = interval;
}



function updateFirework(firework){

    firework.update();
}


