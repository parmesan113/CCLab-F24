console.log("this works")
let x1 = 0, y1 = 200;
let x2 = -25, y2 = 190;
let x3 = 5, y3 = 180;
let x4 = 23, y4 = 209;
let x5 = -23, y5 = 214;
let x6 = 2, y6 = 224;
let d1 = 30;
let celltype1X = [], celltype1Y = [];
let initialNumberOfCellType1 = 40;
let amoebaColor = [255, 255, 255,150]; 
let transparency=[150]
let amoebaScale = 1;
let colors = [];
let chemicalColor = 255;
let circleColor = [0, 255, 0];
let clickCount = 0;

let yPosition;
let amplitude = 20;
let speed = 0.5;
let angleSin = 0;

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container")
  for (let i = 0; i < initialNumberOfCellType1; i++) {
    celltype1X[i] = random(0, width);
    celltype1Y[i] = random(0, height);
    colors[i] = color(random(255), 0, 0);
  }
}

function draw() {
  background(30, 0, 0);

  if (circleColor[0] == 255 && circleColor[1] == 255 && circleColor[2] == 255 && clickCount == 3) {
    yPosition = height / 2 + amplitude * sin(angleSin);
    angleSin += speed;
  } else {
    yPosition = 250;
  }

  drawCelltype1();
  drawMainCell();
  drawAmoeba(amoebaColor, amoebaScale, yPosition); 
  drawScientist(mouseX, 340);
  drawBottle();
  drawCelltype2();
}

function drawAmoeba(amoebaColor, amoebaScale, amoebaY) {
  push();
  translate(400, amoebaY);
  scale(amoebaScale);
  fill(amoebaColor);
  beginShape();
  curveVertex(-10, -92);
  curveVertex(-45, 0);
  curveVertex(-110, 10);
  curveVertex(-50, 60);
  curveVertex(-68, 124);
  curveVertex(-5, 85);
  curveVertex(47, 124);
  curveVertex(35, 59);
  curveVertex(87, 7);
  curveVertex(22, 3);
  endShape(CLOSE);
  pop();
}

function drawMainCell() {
  noStroke();
  fill(120, 0, 0);
  ellipse(400, 550, 2000, 400);
  circle(800, 0, 300);
  circle(0, 200, 200);
}

function drawScientist(scientistX, scientistY) {
  textSize(150);
  fill(255);
  text("👩‍🔬", scientistX, scientistY);
}

function drawCelltype1() {
  for (let i = 0; i < celltype1X.length; i++) {
    let x = celltype1X[i];
    let y = celltype1Y[i];

    let angle = random(0, 45);
    push();
    translate(x, y);
    rotate(radians(angle));
    fill(colors[i]);
    noStroke();
    ellipse(-15, 15, random(20, 50), random(20, 50));
    pop();
  }
}

function drawCelltype2() {
  noStroke();
  fill(220, 100);
  circle(x1, y1, 50);
  circle(x2, y2, 30);
  circle(x3, y3, 30);
  circle(x4, y4, 30);
  circle(x5, y5, 30);
  circle(x6, y6, 30);
  for (let i = 0; i <= 4; i++) {
    let x = x2 - i * 10;
    let y = y2 - i * 10;
    let d = d1 - i * 3;
    circle(x, y, d);

    let xx = x3 + i * 10;
    let yy = y3 - i * 10;
    let dd = d1 - i * 3;
    circle(xx, yy, dd);

    let xxx = x4 + i * 10;
    let yyy = y4 + i * 6;
    let ddd = d1 - i * 3;
    circle(xxx, yyy, ddd);

    let xxxx = x5 - i * 13;
    let yyyy = y5 + i * 9;
    let dddd = d1 - i * 3;
    circle(xxxx, yyyy, dddd);

    let xxxxx = x6 + i * 2;
    let yyyyy = y6 + i * 13;
    let ddddd = d1 - i * 3;
    circle(xxxxx, yyyyy, ddddd);
  }
}



function drawBottle() {
  fill(255)
  quad(mouseX + 140, 340, mouseX + 140, 300, mouseX + 160, 300, mouseX + 160, 340);
  fill(0)
  strokeWeight(4)
  line(mouseX + 140,343,mouseX + 150,343)
  
  noStroke()
  fill(circleColor);
  circle(mouseX + 150, 340, 50);
}

function mousePressed(){
  clickCount++;
  console.log("Click count:", clickCount); 
if(clickCount==0){
    circleColor=[0,255,0]
}
  if(clickCount==1){
    circleColor=[255,255,255]
    amoebaScale = 1.5
    
}
  if(clickCount==2){
    circleColor=[0,0,255]
    amoebaScale=1
}
  if(clickCount==3){
    circleColor=[255,255,255]
    
}
  if(clickCount==4){
    circleColor=[255,0,255]
    
}
  if(clickCount==5){
    circleColor=[255,255,255]
    amoebaColor = [random(255), random(255), random(255),150]

}
  if(clickCount==6){
    circleColor=[0,255,0]
    clickCount=0
    
}
  
}
  
  
//   if (circleColor[0] == 0 && circleColor[1] == 255 && circleColor[2] == 0 && mouseX < 400 && mouseX > 100) {
//     amoebaScale = 1.5;
//   } else {
//     amoebaScale = 1;
//   }

//   if (circleColor[0] == 0 && circleColor[1] == 255 && circleColor[2] == 0 && mouseX < 400 && mouseX > 100) {
//     circleColor = [255, 255, 255];
//   }

//   if (clickCount == 2) {
//     if (circleColor[0] == 255 && circleColor[1] == 255 && circleColor[2] == 255 && mouseX < 400 && mouseX > 100) {
//       circleColor = [0, 0, 255];
//     }
//   }

//   if (clickCount == 3) {
//     if (circleColor[0] == 0 && circleColor[1] == 0 && circleColor[2] == 255 && mouseX < 400 && mouseX > 100) {
//       circleColor = [255, 255, 255];
//     }
//   }

//   if (clickCount == 4) {
//     if (circleColor[0] == 255 && circleColor[1] == 255 && circleColor[2] == 255 && mouseX < 400 && mouseX > 100) {
//       circleColor = [255, 0, 255];
//     }
//   }

//   if (clickCount == 5) {
//     if (circleColor[0] == 255 && circleColor[1] == 0 && circleColor[2] == 255 && mouseX < 400 && mouseX > 100) {
//       circleColor = [255, 255, 255];
//       amoebaColor = [random(255), random(255), random(255),150]; 
//       console.log("Amoeba color changed to:", amoebaColor); 
//       // clickCount = 0; 
//     }
//     clickCount = 0 
//   }

  

