let lights = [];
let fireworks = [];
let numLight = 30;
let numFirework = 30;

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  //color mode
  colorMode(HSB, 360, 100, 100);

  for (let i = 0; i < numLight; i++) {
    lights.push(new Light(mouseX, mouseY))
  }
}

function mousePressed() {
  let randomH = random(360);
  let randomS = random(100);
  for (let i = 0; i < numFirework; i++) {
    fireworks.push(new Firework(mouseX, mouseY - 200, randomH, randomS));
  }
}

function draw() {
  text("click the mouse", 20, 20)
  background(0);
  // stroke(30, 80, 50);
  // strokeWeight(4);
  // line(mouseX, mouseY, mouseX - 20, mouseY + 50);

  for (let i = 0; i < lights.length; i++) {
    lights[i].update();
    lights[i].display();
  }

  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
    fireworks[i].display();
  }

  //delete
  for (let i = lights.length - 1; i >= 0; i--) {
    if (!lights[i].onCanvas) {
      lights.splice(i, 1);
    }
  }

  // delete
  for (let i = fireworks.length - 1; i >= 0; i--) {
    if (!fireworks[i].onCanvas) {
      fireworks.splice(i, 1);
    }
  }
}

// handheld sparklers
class Light {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(1, 2);
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);
    this.onCanvas = true;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.1;
    this.speedX *= 0.99;
    if (this.y > height) {
      this.onCanvas = false;
    }
  }

  display() {
    push();
    translate(mouseX, mouseY);
    for (let i = 0; i < 5; i++) {
      fill(60, 60, 100, 0.1 * (100 + 10 * i));
      noStroke();
      circle(0, -3 * i, this.size + i);
    }
    pop();
  }
}


class Firework {
  constructor(startX, startY, h, s) {
    this.x = startX;
    this.y = startY;
    this.size = random(1, 2);
    this.speedFX = random(-5, 5);
    this.speedFY = random(-5, 5);
    this.onCanvas = true;
    this.h = h;
    this.s = s;
  }

  update() {
    this.x += this.speedFX;
    this.y += this.speedFY;
    this.speedFX *= 0.99;
    this.speedFY += 0.05;  // gravity

    if (this.y > height) {
      this.onCanvas = false;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    for (let i = 0; i < 5; i++) {
      fill(this.h, this.s, 100, 0.1 * (100 + 10 * i));
      noStroke();
      circle(0, -3 * i, this.size + i);
    }
    pop();
  }
}
