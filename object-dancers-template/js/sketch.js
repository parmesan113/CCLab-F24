/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new Myc(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Myc {
  constructor(startX, startY) {
    this.x = startX- sin(frameCount * 0.01) * 15;
    this.y = startY+ sin(frameCount * 0.01) * 15;
    this.scaleFactor = 1; 
    this.colors = [];
    this.dia=40
    this.isMousePressed = false
    
    for (let i = -75; i < 40; i++) {
      let r = lerp(255, 0, (i + 75) / 115); 
      let b = lerp(180, 255, (i + 75) / 115); 
      this.colors.push(color(r, 0, b)); 
    }
  }

  update() {
  this.scaleFactor = 0.5
  if (this.isMousePressed) {
    this.dia = map(sin(frameCount * 0.03), -1, 1, 20, 40); 
  }
}

mousePressed() {
  this.isMousePressed = true; 
  }
  

  display() {
    push();
    translate(this.x + sin(frameCount * 0.01) * 15, this.y- sin(frameCount * 0.01) * 15);
    scale(this.scaleFactor);
    noStroke();

    // head
    fill(255, 0, 180);
    beginShape();
    curveVertex(100, -100); 
    curveVertex(70, -130);
    curveVertex(35, -135);
    curveVertex(0, -150);
    curveVertex(-35, -140);  
    curveVertex(-70, -130);  
    curveVertex(-100, -100); 
    curveVertex(-80, -90 + sin(frameCount * 0.03) * 10);
    curveVertex(-60, -90 - sin(frameCount * 0.03) * 10);
    curveVertex(-40, -90 + sin(frameCount * 0.03) * 10);
    curveVertex(-20, -90 - sin(frameCount * 0.03) * 10);
    curveVertex(0, -90 + sin(frameCount * 0.03) * 10);
    curveVertex(20, -90 - sin(frameCount * 0.03) * 10);
    curveVertex(40, -90 + sin(frameCount * 0.03) * 10);
    curveVertex(60, -90 - sin(frameCount * 0.03) * 10);
    curveVertex(80, -90 + sin(frameCount * 0.03) * 10);
    endShape(CLOSE); 
    fill(128,0,128)
    for(let i = -90; i<=90; i+=15)
    ellipse(i,-100,5,10)
    
    
    // body
    

    for (let i = -75; i < 40; i++) {
      let interColor = lerpColor(this.colors[0], this.colors[this.colors.length - 1], map(i, -75, 40, 0, 1));
      fill(interColor);
      rect(-10, -10 + i, 20, 80); 

      fill(255,0,180);
    circle(0, -95,this.dia,100);
    
    }

    // feet
    fill(0, 0, 255);
    beginShape();
    curveVertex(-10, 60);
    curveVertex(-100, 92 + cos(frameCount * 0.03) * 10);
    curveVertex(-140, 71 - sin(frameCount * 0.03) * 10);
    curveVertex(-145, 81 - sin(frameCount * 0.03) * 10);
    curveVertex(-100, 100 + cos(frameCount * 0.03) * 10);
    curveVertex(-25, 78);
    curveVertex(0, 64);
    curveVertex(-110, 118 - sin(frameCount * 0.03) * 10);
    curveVertex(-160, 100 + sin(frameCount * 0.03) * 10);
    curveVertex(-165, 110 + sin(frameCount * 0.03) * 10);
    curveVertex(-110, 128 - sin(frameCount * 0.03) * 10);
    curveVertex(-15, 90);
    curveVertex(-100, 150 + sin(frameCount * 0.03) * 15);
    curveVertex(-160, 140 - cos(frameCount * 0.03) * 15);
    curveVertex(-165, 150 - cos(frameCount * 0.03) * 15);
    curveVertex(-100, 160 + sin(frameCount * 0.03) * 15);
    curveVertex(0, 110);
    curveVertex(80, 158 + sin(frameCount * 0.03) * 10);
    curveVertex(150, 141 - sin(frameCount * 0.03) * 10);
    curveVertex(145, 131 - sin(frameCount * 0.03) * 10);
    curveVertex(80, 148 + sin(frameCount * 0.03) * 10);
    curveVertex(0, 80);
    curveVertex(80, 120 - cos(frameCount * 0.03) * 10);
    curveVertex(170, 106 + sin(frameCount * 0.03) * 10);
    curveVertex(165, 96 + sin(frameCount * 0.03) * 10);
    curveVertex(80, 110 - cos(frameCount * 0.03) * 10);
    curveVertex(0, 70);
    curveVertex(84, 99 + sin(frameCount * 0.03) * 15);
    curveVertex(165, 75 - sin(frameCount * 0.03) * 15);
    curveVertex(160, 65 - sin(frameCount * 0.03) * 15);
    curveVertex(84, 89 + sin(frameCount * 0.03) * 15);
    curveVertex(0, 60);
    endShape(CLOSE);

    pop(); 

    //reference shapes
    this.drawReferenceShapes();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}


/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/