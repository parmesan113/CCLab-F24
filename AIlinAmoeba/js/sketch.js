console.log("this works")
let x1 = 0,
  y1 = 200;
let x2 = -25,
  y2 = 190;
let x3 = 5,
  y3 = 180;
let x4 = 23,
  y4 = 209;
let x5 = -23,
  y5 = 214;
let x6 = 2,
  y6 = 224;
let d1 = 30;
let celltype1X = [],
  celltype1Y = [];
let acc=0;
let initialNumberOfCellType1 = 40;
let amoebaColor = [255, 255, 255, 150];
let n = 9;
let r = 150;
let randomArray = [];
let transparency = [150];
let amoebaScale = 1.5;
let colors = [];
let chemicalColor = 255;
let circleColor = [0, 255, 0];
let clickCount = 0;

let xPosition = 400;
let yPosition=250;
let amplitude = 20;
let speed = 0.5;
let angleSin = 0;

let Celltype2Scale = 0.3;
let amoebaDirection;
let temperature = 36.5;

let cell2X = 400;
let cell2Y = 250;

function setup() {
  //createCanvas(800, 500);
  let cnv=createCanvas(800,500)
  cnv.parent("p5-canvas-container");
  for (let i = 0; i < initialNumberOfCellType1; i++) {
    celltype1X[i] = random(0, width);
    celltype1Y[i] = random(0, height);
    colors[i] = color(random(255), 0, 0);
  }
  for (let i = 0; i < n; i++) {
    randomArray.push(random(1, 3));
  }

  amoebaDirection = random(TWO_PI);
}

function draw() {
  background(30, 0, 0);
  fill(255);
  textSize(20);
  text("body temperature: " + temperature, 10, 20);
  if ( temperature <= 38) {
    if (frameCount % 60 == 0 ){
    temperature += 0.5;
    }
    cell2X += 0.5;
    cell2Y += 0.5;
  }
  
  
  if (temperature >= 38) {
    if(acc<1){
    acc+=0.1;
  
    }
    
    cell2X = lerp(cell2X, xPosition - sin(frameCount * 0.01) * 100, 0.05+acc);
    cell2Y = lerp(cell2Y, yPosition + sin(frameCount * 0.01) * 100, 0.05+acc);
  }
  if (
    circleColor[0] == 255 &&
    circleColor[1] == 255 &&
    circleColor[2] == 255 &&
    clickCount == 3
  ) {
    yPosition = 320 + amplitude * sin(angleSin);
    angleSin += speed;
  } else {
    yPosition = 320;
  }
  xPosition += cos(amoebaDirection) * 2;
  yPosition += sin(amoebaDirection) * 2;

  if (xPosition < 0 || xPosition > width) {
    amoebaDirection = PI - amoebaDirection;
  }
  if (yPosition <0 || yPosition > height) {
    amoebaDirection = -amoebaDirection;
  }

  drawCelltype1();
  drawMainCell();
  drawAmoeba(amoebaColor, amoebaScale, xPosition, yPosition);
  drawScientist(mouseX, 340);
  drawBottle();
  drawCelltype2(Celltype2Scale)

}
function drawAmoeba(amoebaColor, amoebaScale) {
  push();
  translate(xPosition - sin(frameCount * 0.01) * 100, yPosition + sin(frameCount * 0.01) * 100);
  scale(amoebaScale);
  fill(amoebaColor);
  beginShape();
  for (let i = 0; i < n; i++) {
    curveVertex(
      r * cos(i * ((2 * PI) / n)) * noise(frameCount * 0.01 + randomArray[i]),
      r * sin(i * ((2 * PI) / n)) * noise(frameCount * 0.01 + randomArray[i])
    );
  }
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

function drawCelltype2(Celltype2Scale) {

  for (let i = 0; i <= 4; i++) {
    let x = x2 - i * 10;
    let y = y2 - i * 10;
    let d = d1 - i * 3;

    let xx = x3 + i * 10;
    let yy = y3 - i * 10;
    let dd = d1 - i * 3;

    let xxx = x4 + i * 10;
    let yyy = y4 + i * 6;
    let ddd = d1 - i * 3;

    let xxxx = x5 - i * 13;
    let yyyy = y5 + i * 9;
    let dddd = d1 - i * 3;

    let xxxxx = x6 + i * 2;
    let yyyyy = y6 + i * 13;
    let ddddd = d1 - i * 3;

    push();
    translate(cell2X, cell2Y-50);
    scale(Celltype2Scale);
    noStroke();
    fill(220, 100);
    //circle(x1, y1, 50);
    // circle(x2, y2, 30);
    // circle(x3, y3, 30);
    // circle(x4, y4, 30);
    // circle(x5, y5, 30);
    // circle(x6, y6, 30);
    circle(x, y, d);
    circle(xx, yy, dd);
    circle(xxx, yyy, ddd);
    circle(xxxx, yyyy, dddd);
    circle(xxxxx, yyyyy, ddddd);
    if (cell2X >= 800 || cell2Y >= 500) {
      cell2X -= 0.5;
      cell2Y -= 0.5;
    }
    pop();
  }
}

function drawBottle() {
  fill(255);
  quad(
    mouseX + 140,
    340,
    mouseX + 140,
    300,
    mouseX + 160,
    300,
    mouseX + 160,
    340
  );
  fill(0);
  strokeWeight(4);
  line(mouseX + 140, 343, mouseX + 150, 343);

  noStroke();
  fill(circleColor);
  circle(mouseX + 150, 340, 50);
}

function mousePressed() {
  clickCount++;
  // console.log("Click count:", clickCount);
  if (clickCount == 0) {
    circleColor = [0, 255, 0];
  }
  if (clickCount == 1) {
    circleColor = [255, 255, 255];
    amoebaScale = 2.5;
  }
  if (clickCount == 2) {
    circleColor = [0, 0, 255];
    amoebaScale = 1.5;
    temperature=36.5
  }
  if (clickCount == 3) {
    circleColor = [255, 255, 255];
  }
  if (clickCount == 4) {
    circleColor = [255, 0, 255];
  }
  if (clickCount == 5) {
    circleColor = [255, 255, 255];
    amoebaColor = [random(255), random(255), random(255), 150];
  }
  if (clickCount == 6) {
    circleColor = [0, 255, 0];
    clickCount = 0;
  }
}
