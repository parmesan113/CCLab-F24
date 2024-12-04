let boxes = [];
let heart;
let gagaImages = [];
let madnessLevel = 0;
let pulseSpeed = 0.01; // 降低脉动速度
let judasSound;

// Preload assets
function preload() {
  // Load heart image
  heartIMG = loadImage("assets/heart.png");

  // Load Gaga images
  gagaImages[0] = loadImage("assets/gaga1.png");
  gagaImages[1] = loadImage("assets/gaga2.png");
  gagaImages[2] = loadImage("assets/gaga3.png");

  // Load sound
  judasSound = loadSound(
    "sounds/judas.mp3",
    () => console.log("Sound loaded successfully!"),
    () => console.error("Failed to load sound.")
  );
}

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // Initialize heart
  heart = new Heart(heartIMG);

  // Create dynamic boxes
  for (let i = 0; i < 30; i++) {
    boxes.push(new Box(random(width), random(height), random(50, 100), random(50, 100)));
  }
}

function draw() {
  // Background pulsates with madness level
  let bgcolor1 = color(138, 43, 226, 25);
  let bgcolor2 = color(0, 251, 0, 25);
  background(lerpColor(bgcolor1, bgcolor2, sin(frameCount * pulseSpeed)));

  // Update and display all boxes
  for (let box of boxes) {
    box.update();
    box.display();
  }

  // Heart follows cursor
  noCursor();
  heart.update();
  heart.display();
}

// Box class
class Box {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color(255);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.touched = false;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges
    if (this.x < 0 || this.x + this.w > width) this.speedX *= -1;
    if (this.y < 0 || this.y + this.h > height) this.speedY *= -1;

    // Check for heart interaction
    if (
      mouseX > this.x && mouseX < this.x + this.w &&
      mouseY > this.y && mouseY < this.y + this.h
    ) {
      this.touched = true;
      this.color = color(random(255), random(255), random(255));
      madnessLevel += 5;
      this.speedX *= -1.1; // Slight speed boost
      this.speedY *= -1.1;
      this.speedX = constrain(this.speedX, -5, 5);
      this.speedY = constrain(this.speedY, -5, 5);
    } else {
      this.touched = false;
    }
  }

  display() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);

    // Show Gaga image if touched
    if (this.touched) {
      let gagaImage = random(gagaImages);
      image(gagaImage, this.x, this.y, this.w * 2, this.h * 2);
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

// Add key interactions for chaos
function keyPressed() {
  if (key === 'M' || key === 'm') {
    madnessLevel += 50; // Spike madness level
  }
  if (key === 'N' || key === 'n') {
    madnessLevel = 0; // Calm things down
  }
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
