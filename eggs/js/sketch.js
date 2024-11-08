// let egg1
// let egg2
// let egg3
// let egg4
// let egg5

let basket=[]
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  // egg1=new Egg(random(width),random(height))
  // egg2=new Egg(random(width),random(height))
  // egg3=new Egg(random(width),random(height))
  // egg4=new Egg(random(width),random(height))
  // egg5=new Egg(random(width),random(height))
  basket[0] = new Egg(random(width),random(height))
}

function draw() {
background(50,20,100)
for(let i=0;i< basket.length;i++){
  basket[i].update()
  basket[i].display()
}

}
class Egg{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.scaleFactor = random(0.3, 1);
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0 || this.x > width){
      this.speedX = -this.speedX
    }
    if(this.y < 0 || this.y > height){
      this.speedY = -this.speedY
    }
  }
  display(){

    push();
    translate(this.x,this.y);
    scale(this.scaleFactor)
      noStroke();
      fill(255, 200);
      arc(0, 0, 80, 80,  0,  PI);
      arc(0, 0, 80, 130, PI, 2*PI);

      // egg yolk
      fill(255, 164, 0);
      circle(0, 0, 40)
    
    pop();
  }
}














