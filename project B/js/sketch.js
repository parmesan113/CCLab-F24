let boxes = [];
let heart;
let gagaImages = [];
let madnessLevel = 0;
let pulseSpeed = 0.01;
let judasSound;
let soundSpeed;
let numTouched = 0

// Preload assets
function preload() {
  // Load heart image
  heartIMG = loadImage("assets/heart.png");

  // Load Gaga images
  gagaImages[0] = loadImage("assets/gaga1.png");
  gagaImages[1] = loadImage("assets/gaga2.png");
  gagaImages[2] = loadImage("assets/gaga3.png");
  gagaImages[3] = loadImage("assets/gaga4.jpg");
  gagaImages[4] = loadImage("assets/gaga5.jpg");
  gagaImages[5] = loadImage("assets/gaga6.jpg");
  gagaImages[6] = loadImage("assets/gaga7.jpg");
  gagaImages[7] = loadImage("assets/gaga8.jpg");
  gagaImages[8] = loadImage("assets/gaga9.jpg");
  gagaImages[9] = loadImage("assets/gaga10.jpg");


  // Load sound
  judasSound = loadSound(
    "sounds/judas.mp3");
}

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // Initialize heart
  heart = new Heart(heartIMG);

  // Create dynamic boxes
  for (let i = 0; i < 30; i++) {
    boxes.push(new Box(random(50, width - 100), random(50, height - 100), random(50, 100), random(50, 100), gagaImages[i % gagaImages.length]));
  }
}

function draw() {
  // Background pulsates with madness level
  let bgcolor1 = color(138, 43, 226, 25);
  let bgcolor2 = color(0, 251, 0, 25);
  background(lerpColor(bgcolor1, bgcolor2, sin(frameCount * pulseSpeed)));


  for (let box of boxes) {
    box.update();
    box.display();
  }

  // Heart follows cursor
  noCursor();
  heart.update();
  heart.display();


  text(numTouched, 20, 20)
}

// Box class
class Box {
  constructor(x, y, w, h, gagaImage) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color(255);
    this.originalSpdX = random(-2, 2);
    this.originalSpdY = random(-2, 2);
    this.speedX = this.originalSpdX;
    this.speedY = this.originalSpdY;
    this.touched = false;
    this.addSpd = false;
    this.showImage = false; // New property to track image display
    this.gagaImage = gagaImage;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce 
    if (this.x < 0 || this.x + this.w > width) this.speedX *= -1;
    if (this.y < 0 || this.y + this.h > height) this.speedY *= -1;

    if (
      mouseX > this.x && mouseX < this.x + this.w &&
      mouseY > this.y && mouseY < this.y + this.h && mouseIsPressed
    ) {
      // If touched for the first time
      if (this.touched == false) {
        numTouched += 1;
      }

      this.touched = true;
      this.color = color(random(255), random(255), random(255));
      madnessLevel += 5;
      this.showImage = true; // Always show image after being touched

      this.speedX = constrain(this.speedX, -5, 5);
      this.speedY = constrain(this.speedY, -5, 5);
    } else if (this.touched && !this.addSpd) {
      this.speedX = this.originalSpdX * 3;
      this.speedY = this.originalSpdY * 3;
      this.addSpd = true;
    }

    // Music 
    if (mouseX > this.x && mouseX < this.x + this.w &&
      mouseY > this.y && mouseY < this.y + this.h && mouseIsPressed) {
      this.music();
    }
  }

  music() {
    soundSpeed = map(numTouched, 1, 30, 1, 3);
    judasSound.rate(soundSpeed);
    judasSound.play();
  }

  display() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);

    // Show Gaga image if touched or permanently set to show
    if (this.showImage) {
      image(this.gagaImage, this.x, this.y, this.w, this.h);
    }
  }
}


// Heart class
class Heart {
  constructor(img) {
    this.x = 0;
    this.y = 0;
    this.img = img;
    this.size = 40;
  }

  update() {
    this.x = mouseX;
    this.y = mouseY;
  }

  display() {
    image(this.img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }
}

// key interactions for chaos
function keyPressed() {
  // if (key === 'M' || key === 'm') {
  //   madnessLevel += 50; // Spike madness level
  // }
  // if (key === 'N' || key === 'n') {
  //   madnessLevel = 0; // Calm things down
  // }
  if (key === 'F' || key === 'f') {
    // Freeze all boxes
    for (let box of boxes) {
      box.speedX = 0;
      box.speedY = 0;
    }
  }
  if (key === 'R' || key === 'r') {
    // Reset box positions and speeds
    for (let box of boxes) {
      box.x = random(width);
      box.y = random(height);
      box.speedX = random(-2, 2);
      box.speedY = random(-2, 2);
    }
    madnessLevel = 0;
  }
}