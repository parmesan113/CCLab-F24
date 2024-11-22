let myObstacles = [];
let myFly;
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 10; i++) {
    myObstacles.push(new Obstacle())
  }

  myFly = new Fly();

}

function draw() {
  background(220);
  //

  for (let i = 0; i < myObstacles.length; i++) {
    myObstacles[i].update();
    myObstacles[i].display();

    myFly.update()
    myFly.display()
    //check collision
    for (let i = 0; i < 1; i++) {

    }
  }
}


class Obstacle {
  constructor() {

    // should begin just out of frame to the right
    this.x = random(width, 2 * width);
    this.y = random(0, height);
    // random y location
    // needs a negative speed (moving it to left)
    this.speedX = -1;

    //optional:
    // random size
    // random speed
    this.size = 40;

  }
  update() {
    // move left
    this.x += this.speedX;
    // detect when out of frame
    if (this.x < -this.size) {
      // reset x to right side out of frame and random y
      this.x = width;
      this.y = random(0, height);
    }


  }
  display() {
    // show a box at x y （use push pop and translate ;-)
    push();
    translate(this.x, this.y);
    fill(0);
    rect(0, 0, this.size, this.size)

    pop();
  }


  checkCollision(x, y) {
    //check 
    if (otherX > this.x && otherX < thisX + this.size && otherY > this.y && otherY > this.y + this.size) {
      console.log
    }
  }
}
class Fly {

  constructor() {
    //constantx
    this.x = width / 3
    //y start in the middle
    this.y = height / 2
    // speed y
    this.speedY = 0

    this.r = 3
  }

  update() {
    //gravity should affect speedY
    this.speedY += 0.01
    //key press should affect speed y
    if (keyIsPressed == true && key == "w") {
      this.speedY -= 0.2

    }
    //speed y should be applied to y location
    this.y += this.speedY
    //make sure speed y doesnt fall out frame
    if (this.y >= height - this.r) {
      this.y = height - this.r
    }

  }
  display() {
    push()
    translate(this.x, this.y)
    circle(0, 0, this.r * 2)

    pop()
  }
}